"""
Match scoring handlers: interactive court picker, quick numpad buttons, fast text score parsing,
automatic group rankings update, and automatic trigger for playoff transition.
"""

import re
from aiogram import Router, F
from aiogram.filters import Command
from aiogram.types import Message, CallbackQuery
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from config import is_admin, TOURNAMENT_ID, FRONTEND_URL
from tournament_context import get_active_tournament_id
from db import db
from tournament_logic import (
    COURT_NAMES,
    calculate_group_standings,
    rank_group_winners_and_runners,
    form_playoff_teams,
    generate_playoffs_matches,
    GROUPS
)
from keyboards.inline_keypads import (
    get_courts_keyboard,
    get_matches_on_court_keyboard,
    get_score_numpad_keyboard,
    get_score_confirm_keyboard
)

router = Router()


class MatchScoreStates(StatesGroup):
    waiting_for_text_score = State()


@router.message(Command("matches"))
@router.message(F.text == "🎾 Ввод счета")
async def cmd_matches(message: Message):
    if not is_admin(message.from_user.id):
        await message.answer("⛔ Вводить счет могут только администраторы турнира.")
        return

    t_id = get_active_tournament_id(message.from_user.id)
    t = await db.get_tournament(t_id)
    t_title = t.get('title', t_id) if t else t_id

    await message.answer(
        f"🎾 **Ввод счета матчей Americano**\n"
        f"🏆 Турнир: **{t_title}**\n\n"
        "Выберите корт, на котором завершилась игра:",
        reply_markup=get_courts_keyboard("court"),
        parse_mode="Markdown"
    )


@router.callback_query(F.data == "court_select_again")
async def cb_court_select_again(query: CallbackQuery):
    await query.message.edit_text(
        "🎾 **Выберите корт:**",
        reply_markup=get_courts_keyboard("court")
    )
    await query.answer()


@router.callback_query(F.data.startswith("court:"))
async def cb_court_selected(query: CallbackQuery, state: FSMContext):
    court_id = query.data.split(":")[1]
    court_name = COURT_NAMES.get(court_id, court_id)
    t_id = get_active_tournament_id(query.from_user.id)

    matches = await db.get_group_matches(t_id, court_id=court_id)
    if not matches:
        await query.answer("⚠️ На этом корте нет матчей. Сначала проведите жеребьевку (/draw).", show_alert=True)
        return

    # Find first uncompleted match on this court
    uncompleted = [m for m in matches if not m.get('is_completed')]

    if uncompleted:
        next_m = uncompleted[0]
        p1 = " & ".join(next_m.get('pair1_names', []))
        p2 = " & ".join(next_m.get('pair2_names', []))

        text = (
            f"📍 **{court_name}** · Активный матч:\n\n"
            f"🏷️ **{next_m['group_name']} · Раунд {next_m['round_number']}**\n"
            f"🔴 Пара 1: **{p1}**\n"
            f"🔵 Пара 2: **{p2}**\n\n"
            "👉 Нажмите кнопку счета или отправьте счет сообщением (например: `11 7` или `11-7`):"
        )
        await state.update_data(active_match_id=next_m['id'])
        await state.set_state(MatchScoreStates.waiting_for_text_score)

        await query.message.edit_text(
            text,
            reply_markup=get_score_numpad_keyboard(pair_num=1, match_id=next_m['id']),
            parse_mode="Markdown"
        )
    else:
        # All matches on court completed, show list to allow edit
        text = f"✅ Все матчи на **{court_name}** завершены! Вы можете выбрать любой матч для редактирования счета:"
        await query.message.edit_text(
            text,
            reply_markup=get_matches_on_court_keyboard(matches, court_id),
            parse_mode="Markdown"
        )

    await query.answer()


@router.callback_query(F.data.startswith("match_sel:"))
async def cb_match_selected(query: CallbackQuery, state: FSMContext):
    match_id = query.data.split(":")[1]
    m = await db.get_match_by_id(match_id)
    if not m:
        await query.answer("❌ Матч не найден.", show_alert=True)
        return

    p1 = " & ".join(m.get('pair1_names', []))
    p2 = " & ".join(m.get('pair2_names', []))
    court_name = COURT_NAMES.get(m['court_id'], m['court_id'])

    text = (
        f"📍 **{court_name}**\n"
        f"🏷️ **{m['group_name']} · Раунд {m['round_number']}**\n"
        f"🔴 Пара 1: **{p1}**\n"
        f"🔵 Пара 2: **{p2}**\n\n"
        "Шаг 1: Выберите очки **Пары 1** (кнопкой или текстом `11 7`):"
    )
    await state.update_data(active_match_id=m['id'])
    await state.set_state(MatchScoreStates.waiting_for_text_score)

    await query.message.edit_text(
        text,
        reply_markup=get_score_numpad_keyboard(pair_num=1, match_id=m['id']),
        parse_mode="Markdown"
    )
    await query.answer()


@router.callback_query(F.data.startswith("sc1:"))
async def cb_score1_selected(query: CallbackQuery, state: FSMContext):
    _, match_id, s1_str = query.data.split(":")
    s1 = int(s1_str)

    m = await db.get_match_by_id(match_id)
    if not m:
        await query.answer("❌ Ошибка: матч не найден.", show_alert=True)
        return

    p1 = " & ".join(m.get('pair1_names', []))
    p2 = " & ".join(m.get('pair2_names', []))

    text = (
        f"🏷️ **{m['group_name']} · Раунд {m['round_number']}**\n"
        f"🔴 Пара 1: **{p1}** — **{s1}**\n"
        f"🔵 Пара 2: **{p2}**\n\n"
        f"Шаг 2: Выберите очки **Пары 2** ({p2}):"
    )
    await state.update_data(active_match_id=m['id'], score1=s1)

    await query.message.edit_text(
        text,
        reply_markup=get_score_numpad_keyboard(pair_num=2, match_id=match_id, current_score1=s1),
        parse_mode="Markdown"
    )
    await query.answer()


@router.callback_query(F.data.startswith("sc2:"))
async def cb_score2_selected(query: CallbackQuery, state: FSMContext):
    parts = query.data.split(":")
    match_id = parts[1]
    s1 = int(parts[2])
    s2 = int(parts[3])

    m = await db.get_match_by_id(match_id)
    if not m:
        await query.answer("❌ Ошибка: матч не найден.", show_alert=True)
        return

    p1 = " & ".join(m.get('pair1_names', []))
    p2 = " & ".join(m.get('pair2_names', []))
    winner = p1 if s1 > s2 else (p2 if s2 > s1 else "Ничья")

    text = (
        f"📋 **Подтверждение результата матча:**\n\n"
        f"🏷️ **{m['group_name']} · Раунд {m['round_number']}**\n"
        f"🔴 {p1} — **{s1}**\n"
        f"🔵 {p2} — **{s2}**\n\n"
        f"🏆 Победитель: **{winner}**\n\n"
        "Записать результат в Supabase и обновить сайт?"
    )

    await query.message.edit_text(
        text,
        reply_markup=get_score_confirm_keyboard(match_id, s1, s2),
        parse_mode="Markdown"
    )
    await query.answer()


@router.message(MatchScoreStates.waiting_for_text_score)
async def state_handle_text_score(message: Message, state: FSMContext):
    """Fast text score input handler, e.g. '11 7' or '11-7' or '11:7'"""
    data = await state.get_data()
    match_id = data.get("active_match_id")
    if not match_id:
        await state.clear()
        return

    text = message.text.strip()
    match = re.match(r"^(\d{1,2})[\s\-:–—]+(\d{1,2})$", text)
    if not match:
        await message.answer(
            "⚠️ Неверный формат счета. Введите например: `11 7` или `11-7`, либо нажмите кнопку на клавиатуре выше.",
            parse_mode="Markdown"
        )
        return

    s1 = int(match.group(1))
    s2 = int(match.group(2))
    await state.clear()

    m = await db.get_match_by_id(match_id)
    if not m:
        await message.answer("❌ Матч не найден.")
        return

    p1 = " & ".join(m.get('pair1_names', []))
    p2 = " & ".join(m.get('pair2_names', []))
    winner = p1 if s1 > s2 else (p2 if s2 > s1 else "Ничья")

    confirm_text = (
        f"📋 **Подтверждение результата матча:**\n\n"
        f"🏷️ **{m['group_name']} · Раунд {m['round_number']}**\n"
        f"🔴 {p1} — **{s1}**\n"
        f"🔵 {p2} — **{s2}**\n\n"
        f"🏆 Победитель: **{winner}**\n\n"
        "Записать результат в Supabase?"
    )
    await message.answer(
        confirm_text,
        reply_markup=get_score_confirm_keyboard(match_id, s1, s2),
        parse_mode="Markdown"
    )


@router.callback_query(F.data.startswith("sc_save:"))
async def cb_save_score(query: CallbackQuery, state: FSMContext):
    await state.clear()
    parts = query.data.split(":")
    match_id = parts[1]
    s1 = int(parts[2])
    s2 = int(parts[3])

    # 1. Update match in Supabase
    updated_m = await db.update_match_score(match_id, s1, s2, is_completed=True)
    if not updated_m:
        await query.answer("❌ Ошибка сохранения в Supabase.", show_alert=True)
        return

    group_name = updated_m['group_name']
    court_name = COURT_NAMES.get(updated_m['court_id'], updated_m['court_id'])

    await query.message.edit_text(
        f"✅ **Счет {s1}:{s2} успешно сохранен!**\n"
        f"Сайт мгновенно обновлен через Supabase WebSockets.\n\n"
        f"Корт: **{court_name}** | Группа: **{group_name}**",
        parse_mode="Markdown"
    )
    await query.answer("Сохранено!")

    # 2. Check group completion and playoff transition
    t_id = updated_m.get('tournament_id') or get_active_tournament_id(query.from_user.id)
    await check_group_and_tournament_completion(query.message, group_name, tournament_id=t_id)


async def check_group_and_tournament_completion(message: Message, group_name: str, tournament_id: str):
    """
    Checks if the group is finished, calculates standings, and checks if all 8 groups are finished.
    """
    group_matches = await db.get_group_matches(tournament_id, group_name=group_name)
    group_players = [p for p in await db.get_players(tournament_id) if p.get('group_name') == group_name]

    if len(group_matches) == 6 and all(m.get('is_completed') for m in group_matches):
        standings = calculate_group_standings(group_players, group_matches)
        w = standings[0]
        r = standings[1]

        await message.answer(
            f"🎉 **{group_name} ПОЛНОСТЬЮ ЗАВЕРШЕНА!**\n\n"
            f"🥇 1-е место: **{w['name']}** ({w['wins']}W, {w['diff']:+d} diff)\n"
            f"🥈 2-е место: **{r['name']}** ({r['wins']}W, {r['diff']:+d} diff)\n"
            f"Оба участника выходят в стадию плей-офф!",
            parse_mode="Markdown"
        )

    # Check ALL 48 matches
    all_matches = await db.get_group_matches(tournament_id)
    if len(all_matches) == 48 and all(m.get('is_completed') for m in all_matches):
        await message.answer("⏳ Все 48 матчей группового этапа сыграны! Производится посев в сетку плей-офф...")
        await trigger_playoffs_seeding(message, tournament_id)


async def trigger_playoffs_seeding(message: Message, tournament_id: str):
    """Executes merit pairing W_k + R_(9-k) and creates playoff bracket."""
    all_players = await db.get_players(tournament_id)
    all_matches = await db.get_group_matches(tournament_id)

    all_standings = {}
    for g in GROUPS:
        g_players = [p for p in all_players if p.get('group_name') == g]
        g_matches = [m for m in all_matches if m.get('group_name') == g]
        all_standings[g] = calculate_group_standings(g_players, g_matches)

    winners, runners = rank_group_winners_and_runners(all_standings)
    teams = form_playoff_teams(winners, runners)
    po_matches = generate_playoffs_matches(teams, tournament_id)

    # Save to Supabase
    await db.save_playoff_matches(po_matches, tournament_id)
    await db.update_tournament(tournament_id, {"stage": "playoffs"})

    summary = (
        "🏆 **ГРУППОВОЙ ЭТАП ЗАВЕРШЕН! СЕТКА ПЛЕЙ-ОФФ СФОРМИРОВАНА!**\n\n"
        "Сформированы 8 сбалансированных команд (формула $W_k + R_{9-k}$):\n"
    )
    for t in teams:
        summary += f"• **{t['name']}** ({t['formula']}): {t['duo']}\n"

    summary += (
        "\n⚔️ **Матчи 1/4 финала (Best of 3 to 11):**\n"
        "• QF-1 (Корт 1): Team 1 vs Team 8\n"
        "• QF-2 (Корт 2): Team 4 vs Team 5\n"
        "• QF-3 (Корт 3): Team 2 vs Team 7\n"
        "• QF-4 (Корт 4): Team 3 vs Team 6\n\n"
        f"🌐 [Сетка плей-офф активна на сайте]({FRONTEND_URL})\n\n"
        "Для ввода сетов плей-офф используйте `/playoffs` или кнопку меню **«🏆 Плей-офф»**."
    )

    await message.answer(summary, parse_mode="Markdown", disable_web_page_preview=True)


@router.callback_query(F.data == "match_cancel")
async def cb_match_cancel(query: CallbackQuery, state: FSMContext):
    await state.clear()
    await query.message.edit_text("❌ Ввод счета отменен.")
    await query.answer()

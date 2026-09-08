"""
Playoffs handlers: knockout match selection, BO3 / BO5 sets entry, bracket progression to Semifinals and Grand Final.
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
from tournament_logic import evaluate_playoff_sets, advance_playoff_bracket
from keyboards.inline_keypads import get_playoff_matches_keyboard

router = Router()


class PlayoffScoreStates(StatesGroup):
    waiting_for_sets_input = State()


@router.message(Command("playoffs"))
@router.message(F.text == "🏆 Плей-офф")
async def cmd_playoffs(message: Message):
    if not is_admin(message.from_user.id):
        await message.answer("⛔ Только администраторы могут управлять стадией плей-офф.")
        return

    t_id = get_active_tournament_id(message.from_user.id)
    t = await db.get_tournament(t_id)
    t_title = t.get('title', t_id) if t else t_id

    po_matches = await db.get_playoff_matches(t_id)
    if not po_matches:
        await message.answer(
            f"⚠️ Сетка плей-офф для турнира **{t_title}** еще не создана.\n"
            "Она сформируется автоматически после завершения всех 48 матчей группового этапа.",
            parse_mode="Markdown"
        )
        return

    text = (
        f"🏆 **Управление матчами плей-офф**\n"
        f"🏆 Турнир: **{t_title}**\n\n"
        "Выберите матч для ввода счета сетов:\n"
        "• 1/4 финала (QF-1 .. QF-4): Best of 3 sets to 11\n"
        "• 1/2 финала (SF-1, SF-2): Best of 3 sets to 11\n"
        "• 🥇 Гранд-Финал (F-GOLD): Best of 5 sets to 11\n"
    )

    await message.answer(text, reply_markup=get_playoff_matches_keyboard(po_matches), parse_mode="Markdown")


@router.callback_query(F.data.startswith("po_sel:"))
async def cb_playoff_selected(query: CallbackQuery, state: FSMContext):
    match_id = query.data.split(":")[1]
    m = await db.get_playoff_match_by_id(match_id)
    if not m:
        await query.answer("❌ Матч не найден.", show_alert=True)
        return

    req_wins = 3 if m['round_type'] == 'final' else 2
    fmt_str = f"Best of 5 (до 3 побед)" if m['round_type'] == 'final' else f"Best of 3 (до 2 побед)"

    text = (
        f"🏆 **{m['name']}** ({fmt_str})\n\n"
        f"Команда 1: **{m['team1_name']}**\n"
        f"Команда 2: **{m['team2_name']}**\n"
        f"Текущий счет: `{m.get('score', '—')}`\n\n"
        "👉 **Отправьте счет сетов сообщением.**\n\n"
        "Примеры ввода:\n"
        "• Полный счет сетов: `11-8, 9-11, 11-7`\n"
        "• Либо общий счет по сетам: `2-0` или `2-1`\n"
    )

    await state.update_data(
        active_po_match_id=match_id,
        round_type=m['round_type'],
        tournament_id=m.get('tournament_id')
    )
    await state.set_state(PlayoffScoreStates.waiting_for_sets_input)

    await query.message.edit_text(text, parse_mode="Markdown")
    await query.answer()


@router.message(PlayoffScoreStates.waiting_for_sets_input)
async def state_handle_playoff_sets(message: Message, state: FSMContext):
    data = await state.get_data()
    match_id = data.get("active_po_match_id")
    round_type = data.get("round_type", "quarterfinal")
    t_id = data.get("tournament_id") or get_active_tournament_id(message.from_user.id)
    if not match_id:
        await state.clear()
        return

    raw_text = message.text.strip()

    # Case 1: Simple set score e.g. "2-0" or "2 1"
    simple_match = re.match(r"^(\d)[\s\-:–—]+(\d)$", raw_text)
    sets_list = []

    if simple_match:
        w1 = int(simple_match.group(1))
        w2 = int(simple_match.group(2))
        # Generate dummy sets matching score
        for _ in range(w1):
            sets_list.append({"s1": 11, "s2": 7})
        for _ in range(w2):
            sets_list.append({"s1": 7, "s2": 11})
    else:
        # Case 2: Detailed sets e.g. "11-8, 9-11, 11-7" or "11:8 9:11"
        set_pairs = re.findall(r"(\d{1,2})[\s\-:–—]+(\d{1,2})", raw_text)
        if not set_pairs:
            await message.answer(
                "⚠️ Не удалось распознать счет.\n"
                "Введите например: `11-8, 9-11, 11-7` или общий счет `2-1`:",
                parse_mode="Markdown"
            )
            return

        for p in set_pairs:
            sets_list.append({"s1": int(p[0]), "s2": int(p[1])})

    await state.clear()

    # Evaluate winner
    winner_team, score_str, is_completed = evaluate_playoff_sets(round_type, sets_list)

    # Update in DB
    updates = {
        "sets": sets_list,
        "score": score_str,
        "winner_team": winner_team,
        "is_completed": is_completed
    }
    await db.update_playoff_match(match_id, updates)

    # Advance bracket
    all_po = await db.get_playoff_matches(t_id)
    po_map = {m['id']: m for m in all_po}
    for m in all_po:
        code = m['id'].split('_')[-1].split(':')[-1]
        po_map[code] = m

    if match_id in po_map:
        po_map[match_id].update(updates)

    advance_playoff_bracket(po_map)

    # Save advanced changes back to DB
    for code in ['SF-1', 'SF-2', 'F-GOLD']:
        target_m = po_map.get(code)
        if target_m:
            await db.update_playoff_match(target_m['id'], {
                "team1_name": target_m['team1_name'],
                "team2_name": target_m['team2_name'],
                "team1_players": target_m.get('team1_players', []),
                "team2_players": target_m.get('team2_players', [])
            })

    target_m = po_map.get(match_id, {})
    winner_name = target_m.get('team1_name') if winner_team == 1 else (target_m.get('team2_name') if winner_team == 2 else "В процессе")

    res_text = (
        f"✅ **Результат матча {match_id} сохранен!**\n\n"
        f"Счет по сетам: **{score_str}**\n"
        f"Победитель: **{winner_name}**\n\n"
        "Сетка плей-офф на сайте мгновенно обновлена!"
    )

    # Check Grand Final Completion
    fgold_m = po_map.get('F-GOLD')
    if fgold_m and (fgold_m.get('id') == match_id or match_id == 'F-GOLD') and is_completed:
        champ = fgold_m['team1_name'] if fgold_m['winner_team'] == 1 else fgold_m['team2_name']
        runner = fgold_m['team2_name'] if fgold_m['winner_team'] == 1 else fgold_m['team1_name']

        await db.update_tournament(t_id, {"stage": "completed"})

        res_text += (
            f"\n\n👑 **ГРАНД-ФИНАЛ ЗАВЕРШЕН! ТУРНИР ОКОНЧЕН!**\n\n"
            f"🥇 **ЧЕМПИОНЫ ТУРНИРА:**\n🏆 **{champ}**\n\n"
            f"🥈 **2-Е МЕСТО:**\n**{runner}**\n\n"
            f"🌐 [Смотреть финальные результаты на сайте]({FRONTEND_URL})"
        )

    await message.answer(res_text, parse_mode="Markdown", disable_web_page_preview=True)

"""
Draw handlers: /draw, Fisher-Yates shuffling, confirmation and publishing to Supabase.
"""

from aiogram import Router, F
from aiogram.filters import Command
from aiogram.types import Message, CallbackQuery
from config import is_admin, FRONTEND_URL
from db import db
from tournament_context import get_active_tournament_id
from tournament_logic import generate_draw, generate_group_matches, GROUPS
from keyboards.inline_keypads import get_draw_confirm_keyboard

router = Router()

# In-memory storage for active pending draw per admin user
_pending_draws = {}


def format_draw_preview(groups_map: dict, tournament_title: str) -> str:
    lines = [f"🎲 **РЕЗУЛЬТАТ ЖЕРЕБЬЕВКИ: {tournament_title} (8 ГРУПП):**\n"]
    for group_name in GROUPS:
        p_list = groups_map.get(group_name, [])
        p_names = [f"• {p['name']}" for p in p_list]
        lines.append(f"🏷️ **{group_name}:**")
        lines.extend(p_names)
        lines.append("")

    lines.append("────────────────────────\nПодтвердите публикацию на сайт или перетасуйте заново:")
    return "\n".join(lines)


@router.message(Command("draw"))
@router.message(F.text == "🎲 Жеребьевка")
async def cmd_draw(message: Message):
    user_id = message.from_user.id
    if not is_admin(user_id):
        await message.answer("⛔ Жеребьевку могут проводить только администраторы турнира.")
        return

    t_id = get_active_tournament_id(user_id)
    t_info = await db.get_tournament(t_id)
    t_title = t_info.get("title", t_id) if t_info else t_id

    players = await db.get_players(t_id)
    if not players or len(players) < 32:
        await message.answer(
            f"⚠️ В турнире `{t_id}` найдено только {len(players)} игроков.\n"
            "Для Americano турнира требуется ровно 32 игрока.\n"
            "Используйте `/players` или `/reset_roster` для подготовки слотов.\n"
            "Или смените турнир: `/tournaments`",
            parse_mode="Markdown"
        )
        return

    groups_map = generate_draw(players)
    _pending_draws[user_id] = {"groups_map": groups_map, "tournament_id": t_id}

    text = format_draw_preview(groups_map, t_title)
    await message.answer(text, reply_markup=get_draw_confirm_keyboard(), parse_mode="Markdown")


@router.callback_query(F.data == "draw_reshuffle")
async def cb_draw_reshuffle(query: CallbackQuery):
    user_id = query.from_user.id
    if not is_admin(user_id):
        await query.answer("⛔ Нет прав администратора.", show_alert=True)
        return

    t_id = get_active_tournament_id(user_id)
    t_info = await db.get_tournament(t_id)
    t_title = t_info.get("title", t_id) if t_info else t_id

    players = await db.get_players(t_id)
    groups_map = generate_draw(players)
    _pending_draws[user_id] = {"groups_map": groups_map, "tournament_id": t_id}

    text = format_draw_preview(groups_map, t_title)
    await query.message.edit_text(text, reply_markup=get_draw_confirm_keyboard(), parse_mode="Markdown")
    await query.answer("🎲 Группы перетасованы!")


@router.callback_query(F.data == "draw_cancel")
async def cb_draw_cancel(query: CallbackQuery):
    user_id = query.from_user.id
    _pending_draws.pop(user_id, None)
    await query.message.edit_text("❌ Жеребьевка отменена. Текущее состояние турнира не изменено.")
    await query.answer()


@router.callback_query(F.data == "draw_confirm")
async def cb_draw_confirm(query: CallbackQuery):
    user_id = query.from_user.id
    if not is_admin(user_id):
        await query.answer("⛔ Нет прав администратора.", show_alert=True)
        return

    pending = _pending_draws.get(user_id)
    if not pending:
        await query.answer("⚠️ Сессия жеребьевки истекла. Запустите `/draw` заново.", show_alert=True)
        return

    groups_map = pending["groups_map"]
    t_id = pending.get("tournament_id") or get_active_tournament_id(user_id)

    # Generate 48 group matches
    matches = generate_group_matches(groups_map, t_id)

    # Save to Supabase
    await query.message.edit_text(f"⏳ Запись жеребьевки турнира `{t_id}` в Supabase...")
    success = await db.save_draw(t_id, groups_map, matches)
    _pending_draws.pop(user_id, None)

    if success:
        await query.message.edit_text(
            f"🎉 **ЖЕРЕБЬЕВКА УСПЕШНО ОПУБЛИКОВАНА!**\n\n"
            f"Турнир: `{t_id}`\n"
            "• 8 групп (A–H) распределены\n"
            "• 48 матчей группового этапа созданы в Supabase\n"
            "• Сетка на сайте мгновенно переведена в активный боевой режим!\n\n"
            f"🌐 [Посмотреть табло на сайте]({FRONTEND_URL})\n\n"
            "Начинайте игры! Для ввода результатов на кортах используйте кнопку **«🎾 Ввод счета»** или команду `/matches`.",
            parse_mode="Markdown",
            disable_web_page_preview=True
        )
        await query.answer("✅ Опубликовано на сайт!")
    else:
        await query.message.edit_text("❌ Ошибка при записи данных в Supabase. Проверьте настройки `.env`.")


@router.message(Command("reset_draw"))
async def cmd_reset_draw(message: Message):
    if not is_admin(message.from_user.id):
        await message.answer("⛔ Только администраторы могут сбрасывать жеребьевку.")
        return

    t_id = get_active_tournament_id(message.from_user.id)
    await db.reset_tournament_draw(t_id)
    await message.answer(
        f"🔄 **Жеребьевка и групповые матчи турнира `{t_id}` сброшены.**\n"
        "Игроки возвращены в статус ожидания жеребьевки.\n"
        "Сайт переведен в режим ожидания.",
        parse_mode="Markdown"
    )

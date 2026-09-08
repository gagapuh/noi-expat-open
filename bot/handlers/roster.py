"""
Roster management handlers: /players, /add_player, /del_player, /import_roster, /reset_roster.
"""

from aiogram import Router, F
from aiogram.filters import Command
from aiogram.types import Message
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from config import is_admin
from db import db
from tournament_context import get_active_tournament_id

router = Router()


class RosterStates(StatesGroup):
    waiting_for_bulk_names = State()


@router.message(Command("players"))
@router.message(F.text == "👥 Игроки")
@router.message(F.text == "👥 Список игроков")
async def cmd_players(message: Message):
    t_id = get_active_tournament_id(message.from_user.id)
    players = await db.get_players(t_id)

    if not players:
        # If empty, initialize default
        await db.reset_players_to_default(t_id, 32)
        players = await db.get_players(t_id)

    t_info = await db.get_tournament(t_id)
    t_title = t_info.get("title", t_id) if t_info else t_id

    lines = [f"👥 **Состав участников: {t_title}** (`{t_id}`):\n"]
    for p in players:
        slot = p.get('slot_number') or p.get('id')
        name = p.get('name', f"Player {slot}")
        dupr = f" · DUPR: {p['dupr_id']}" if p.get('dupr_id') else ""
        group = f" `[{p['group_name']}]`" if p.get('group_name') else ""
        lines.append(f"`#{slot:02d}` **{name}**{dupr}{group}")

    lines.append("\n_Для изменения используйте:_\n`/add_player <Имя> [DUPR_ID] [Рейтинг]`\n`/import_roster` — загрузить сразу 32 игрока списком.\n`/tournaments` — сменить активный турнир.")
    await message.answer("\n".join(lines), parse_mode="Markdown")


@router.message(Command("add_player"))
async def cmd_add_player(message: Message):
    if not is_admin(message.from_user.id):
        await message.answer("⛔ Только администраторы могут управлять составом игроков.")
        return

    parts = message.text.split()[1:]
    if not parts:
        await message.answer(
            "ℹ️ Формат команды:\n`/add_player <Имя> [DUPR_ID] [Рейтинг]`\n"
            "Пример: `/add_player Ho DUPR12345 3.12`",
            parse_mode="Markdown"
        )
        return

    name = parts[0]
    dupr_id = parts[1] if len(parts) > 1 else ""
    dupr_rating = None
    if len(parts) > 2:
        try:
            dupr_rating = float(parts[2].replace(',', '.'))
        except ValueError:
            dupr_rating = None

    # Find next available slot or first default "Player X"
    t_id = get_active_tournament_id(message.from_user.id)
    players = await db.get_players(t_id)
    target_p = None
    for p in players:
        if p['name'].startswith("Player ") or not p['name']:
            target_p = p
            break

    if not target_p and players:
        target_p = players[-1] # Replace last slot if completely full

    if target_p:
        await db.update_player(target_p['id'], {
            "name": name,
            "dupr_id": dupr_id,
            "dupr_rating": dupr_rating
        })
        slot = target_p.get('slot_number') or target_p.get('id')
        await message.answer(
            f"✅ Игрок **{name}** успешно добавлен в слот `#{slot:02d}` турнира `{t_id}`!"
            + (f" (DUPR: {dupr_id})" if dupr_id else ""),
            parse_mode="Markdown"
        )
    else:
        await message.answer("❌ Ошибка при поиске свободного слота.")


@router.message(Command("del_player"))
async def cmd_del_player(message: Message):
    if not is_admin(message.from_user.id):
        await message.answer("⛔ Только администраторы могут удалять игроков.")
        return

    parts = message.text.split()[1:]
    if not parts:
        await message.answer(
            "ℹ️ Формат: `/del_player <Номер_слота_или_Имя>`\n"
            "Пример: `/del_player 5` или `/del_player Ho`",
            parse_mode="Markdown"
        )
        return

    query = parts[0]
    t_id = get_active_tournament_id(message.from_user.id)
    players = await db.get_players(t_id)
    target_p = None

    if query.isdigit():
        slot_num = int(query)
        for p in players:
            if p.get('slot_number') == slot_num or p.get('id') == slot_num:
                target_p = p
                break
    else:
        for p in players:
            if p.get('name', '').lower() == query.lower():
                target_p = p
                break

    if target_p:
        slot = target_p.get('slot_number') or target_p.get('id')
        await db.update_player(target_p['id'], {
            "name": f"Player {slot}",
            "dupr_id": "",
            "dupr_rating": None,
            "group_name": None
        })
        await message.answer(f"🗑️ Слот `#{slot:02d}` очищен и сброшен к **Player {slot}**.", parse_mode="Markdown")
    else:
        await message.answer(f"❌ Игрок `{query}` не найден в списке турнира `{t_id}`.", parse_mode="Markdown")


@router.message(Command("import_roster"))
async def cmd_import_roster(message: Message, state: FSMContext):
    if not is_admin(message.from_user.id):
        await message.answer("⛔ Только администраторы могут импортировать список игроков.")
        return

    t_id = get_active_tournament_id(message.from_user.id)
    # If text is provided in the same message:
    lines = message.text.split("\n")[1:]
    if lines and len(lines) >= 2:
        await process_roster_lines(message, lines, t_id)
        return

    await state.set_state(RosterStates.waiting_for_bulk_names)
    await message.answer(
        f"📋 **Массовый импорт состава (32 игрока) в турнир `{t_id}`**\n\n"
        "Отправьте следующим сообщением список имен (каждое имя с новой строки):\n\n"
        "```\n"
        "Ho\n"
        "Eugen\n"
        "Denis\n"
        "Alex\n"
        "...\n"
        "```\n"
        "Имена будут автоматически заполнены в слоты 1–32.",
        parse_mode="Markdown"
    )


@router.message(RosterStates.waiting_for_bulk_names)
async def state_receive_bulk_names(message: Message, state: FSMContext):
    await state.clear()
    raw_lines = message.text.split("\n")
    names = [l.strip() for l in raw_lines if l.strip()]
    if not names:
        await message.answer("❌ Список пуст. Импорт отменен.")
        return

    t_id = get_active_tournament_id(message.from_user.id)
    await process_roster_lines(message, names, t_id)


async def process_roster_lines(message: Message, names: list, tournament_id: str):
    clean_names = [n.strip() for n in names if n.strip()]
    updated = await db.import_roster(clean_names, tournament_id)
    await message.answer(
        f"✅ **Импорт завершен!** Успешно обновлено слотов: **{len(updated)}** из 32 в турнире `{tournament_id}`.\n"
        "Посмотреть текущий состав: `/players`",
        parse_mode="Markdown"
    )


@router.message(Command("reset_roster"))
async def cmd_reset_roster(message: Message):
    if not is_admin(message.from_user.id):
        await message.answer("⛔ Только администраторы могут сбрасывать состав.")
        return

    t_id = get_active_tournament_id(message.from_user.id)
    await db.reset_players_to_default(t_id, 32)
    await message.answer(f"🔄 Состав игроков турнира `{t_id}` сброшен к исходным 32 слотам (`Player 1` .. `Player 32`).", parse_mode="Markdown")

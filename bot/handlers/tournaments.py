"""
Tournament switching and management handlers: /tournaments, /set_tournament, /new_tournament.
Allows switching between multiple tournaments stored in Supabase.
"""

from aiogram import Router, F
from aiogram.filters import Command
from aiogram.types import Message, CallbackQuery, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup

from config import is_admin, FRONTEND_URL
from db import db
from tournament_context import get_active_tournament_id, set_active_tournament_id

router = Router()


class NewTournamentStates(StatesGroup):
    waiting_for_id = State()
    waiting_for_title = State()


def get_tournaments_keyboard(tournaments: list, active_id: str) -> InlineKeyboardMarkup:
    buttons = []
    for t in tournaments:
        t_id = t['id']
        t_title = t.get('title', t_id)
        is_current = (t_id == active_id)
        prefix = "👉 " if is_current else "⚪ "
        suffix = " (Активен)" if is_current else ""
        btn_text = f"{prefix}{t_title}{suffix}"
        buttons.append([InlineKeyboardButton(text=btn_text, callback_data=f"tourn_sel:{t_id}")])

    buttons.append([InlineKeyboardButton(text="➕ Создать новый турнир", callback_data="tourn_create_new")])
    buttons.append([InlineKeyboardButton(text="🔙 В главное меню", callback_data="menu_back")])
    return InlineKeyboardMarkup(inline_keyboard=buttons)


@router.message(Command("tournaments"))
@router.message(F.text.in_(["🏆 Турниры", "🏆 Выбор турнира"]))
async def cmd_tournaments(message: Message):
    user_id = message.from_user.id
    active_id = get_active_tournament_id(user_id)
    tournaments = await db.get_tournaments()

    if not tournaments:
        await message.answer("⚠️ В базе данных пока нет турниров. Используйте `/new_tournament` для создания.")
        return

    text = (
        "🏆 **Выбор активного турнира**\n\n"
        f"Текущий выбранный турнир: `{active_id}`\n\n"
        "Выберите турнир из списка ниже, чтобы управлять его участниками, жеребьевкой и вводом счета:"
    )

    await message.answer(text, reply_markup=get_tournaments_keyboard(tournaments, active_id), parse_mode="Markdown")


@router.callback_query(F.data.startswith("tourn_sel:"))
async def cb_tournament_selected(query: CallbackQuery):
    user_id = query.from_user.id
    t_id = query.data.split(":")[1]

    t = await db.get_tournament(t_id)
    if not t:
        await query.answer("❌ Турнир не найден в базе данных.", show_alert=True)
        return

    set_active_tournament_id(user_id, t_id)

    stage_names = {
        "registration": "📝 Регистрация участников",
        "groups": "🔥 Групповой этап",
        "playoffs": "🏆 Плей-офф",
        "completed": "🥇 Турнир завершен"
    }
    stage_str = stage_names.get(t.get('stage'), t.get('stage', '—'))

    text = (
        f"✅ **Активный турнир успешно переключен!**\n\n"
        f"🏷️ **Название:** {t.get('title')}\n"
        f"🆔 **ID:** `{t_id}`\n"
        f"📊 **Статус:** {stage_str}\n"
        f"🎲 **Жеребьевка:** {'✅ Проведена' if t.get('is_draw_completed') else '⏳ Ожидает'}\n\n"
        "Все команды бота (`/matches`, `/draw`, `/players`, `/status`, `/playoffs`) теперь работают с этим турниром!"
    )

    # Re-render keyboard with updated active checkmark
    tournaments = await db.get_tournaments()
    await query.message.edit_text(text, reply_markup=get_tournaments_keyboard(tournaments, t_id), parse_mode="Markdown")
    await query.answer("Турнир выбран!")


@router.message(Command("set_tournament"))
async def cmd_set_tournament(message: Message):
    parts = message.text.split(maxsplit=1)
    if len(parts) < 2:
        await message.answer("ℹ️ Использование: `/set_tournament <ID_турнира>`\nПример: `/set_tournament picklehead-individual-doubles`", parse_mode="Markdown")
        return

    t_id = parts[1].strip()
    t = await db.get_tournament(t_id)
    if not t:
        await message.answer(f"❌ Турнир с ID `{t_id}` не найден в базе данных. Список: `/tournaments`", parse_mode="Markdown")
        return

    set_active_tournament_id(message.from_user.id, t_id)
    await message.answer(f"✅ Активный турнир переключен на: **{t.get('title')}** (`{t_id}`).", parse_mode="Markdown")


@router.callback_query(F.data == "tourn_create_new")
async def cb_create_new_tournament(query: CallbackQuery, state: FSMContext):
    if not is_admin(query.from_user.id):
        await query.answer("⛔ Только администраторы могут создавать турниры.", show_alert=True)
        return

    await state.set_state(NewTournamentStates.waiting_for_id)
    await query.message.answer(
        "➕ **Создание нового турнира**\n\n"
        "Шаг 1: Отправьте уникальный идентификатор (ID) турнира латиницей без пробелов\n"
        "(например: `prime-individual-doubles` или `mixed-doubles-oct-2026`):",
        parse_mode="Markdown"
    )
    await query.answer()


@router.message(Command("new_tournament"))
async def cmd_new_tournament(message: Message, state: FSMContext):
    if not is_admin(message.from_user.id):
        await message.answer("⛔ Только администраторы могут создавать турниры.")
        return

    parts = message.text.split(maxsplit=2)
    if len(parts) >= 3:
        t_id = parts[1].strip()
        t_title = parts[2].strip()
        await create_and_activate_tournament(message, t_id, t_title)
        return

    await state.set_state(NewTournamentStates.waiting_for_id)
    await message.answer(
        "➕ **Создание нового турнира**\n\n"
        "Шаг 1: Отправьте уникальный идентификатор (ID) турнира латиницей без пробелов\n"
        "(например: `prime-individual-doubles` или `mixed-doubles-52`):",
        parse_mode="Markdown"
    )


@router.message(NewTournamentStates.waiting_for_id)
async def state_receive_tournament_id(message: Message, state: FSMContext):
    t_id = message.text.strip().lower().replace(" ", "-")
    await state.update_data(new_t_id=t_id)
    await state.set_state(NewTournamentStates.waiting_for_title)
    await message.answer(
        f"ID турнира: `{t_id}`\n\n"
        "Шаг 2: Отправьте полное отображаемое название турнира\n"
        "(например: `Prime Division: Individual Doubles (4.0+)`):",
        parse_mode="Markdown"
    )


@router.message(NewTournamentStates.waiting_for_title)
async def state_receive_tournament_title(message: Message, state: FSMContext):
    data = await state.get_data()
    t_id = data.get("new_t_id")
    t_title = message.text.strip()
    await state.clear()

    await create_and_activate_tournament(message, t_id, t_title)


async def create_and_activate_tournament(message: Message, t_id: str, t_title: str):
    await message.answer(f"⏳ Создание турнира `{t_id}` и инициализация 32 слотов в Supabase...")
    t = await db.init_tournament_structure(t_id, t_title)
    if t:
        set_active_tournament_id(message.from_user.id, t_id)
        await message.answer(
            f"🎉 **Турнир успешно создан и активирован!**\n\n"
            f"🏷️ **Название:** {t_title}\n"
            f"🆔 **ID:** `{t_id}`\n"
            "• Создано 32 слота участников\n"
            "• Подготовлена сетка плей-офф\n\n"
            "Вы можете настроить участников через `/players` и провести жеребьевку через `/draw`!",
            parse_mode="Markdown"
        )
    else:
        await message.answer("❌ Ошибка при создании турнира в Supabase.")

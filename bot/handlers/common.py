"""
Common handlers: /start, /help, /status, /my_id, website link.
"""

from aiogram import Router, F
from aiogram.filters import Command, CommandStart
from aiogram.types import Message, CallbackQuery
from config import is_admin, FRONTEND_URL, TOURNAMENT_ID
from db import db
from keyboards.main_menu import get_main_menu_keyboard
from tournament_logic import GROUPS

router = Router()


@router.message(CommandStart())
async def cmd_start(message: Message):
    user_id = message.from_user.id
    admin = is_admin(user_id)

    welcome_text = (
        f"👋 Привет, {message.from_user.first_name}!\n\n"
        f"🏆 **NOI EXPAT OPEN — Pickleball Tournament Bot**\n"
        f"Система оперативного управления турниром и мгновенного скоринга.\n\n"
    )

    if admin:
        welcome_text += (
            "👑 **Вы авторизованы как Администратор турнира.**\n\n"
            "Доступные действия:\n"
            "• 🎾 **Ввод счета** — оперативный ввод результатов игр на кортах 1–4\n"
            "• 🎲 **Жеребьевка** — распределение 32 игроков по группам A–H\n"
            "• 👥 **Игроки** — управление списком участников\n"
            "• 🏆 **Плей-офф** — управление стадией плей-офф\n"
            "• 📊 **Статус** — текущий прогресс турнира\n\n"
            "Используйте кнопки меню внизу экрана или команды."
        )
    else:
        welcome_text += (
            "👀 **Режим зрителя/игрока:**\n"
            "Вы можете просматривать расписание, группы и статус матчей.\n\n"
            f"Ваш Telegram User ID: `{user_id}`\n"
            "(Передайте его главному организатору для получения прав администратора)"
        )

    await message.answer(
        welcome_text,
        reply_markup=get_main_menu_keyboard(admin),
        parse_mode="Markdown"
    )


@router.message(Command("my_id"))
async def cmd_my_id(message: Message):
    user_id = message.from_user.id
    admin = is_admin(user_id)
    role_str = "Администратор 👑" if admin else "Зритель 👀"
    await message.answer(
        f"🆔 Ваш Telegram User ID: `{user_id}`\n"
        f"Ваш статус: **{role_str}**\n\n"
        f"Чтобы добавить вас в администраторы, добавьте `{user_id}` в `ADMIN_TELEGRAM_IDS` в `.env` бота.",
        parse_mode="Markdown"
    )


@router.message(Command("help"))
@router.message(F.text == "❓ Помощь")
async def cmd_help(message: Message):
    admin = is_admin(message.from_user.id)
    if admin:
        help_text = (
            "📖 **Справка по командам организатора:**\n\n"
            "🏆 **Выбор и создание турниров:**\n"
            "• `/tournaments` — список турниров и переключение активного\n"
            "• `/new_tournament <id> <Название>` — создать новый турнир\n"
            "• `/set_tournament <id>` — быстро переключить турнир по ID\n\n"
            "🎾 **Матчи и счет:**\n"
            "• `/matches` — выбор корта и ввод счета активного матча\n"
            "• `/playoffs` — сетка плей-офф и ввод сетов (QF, SF, Grand Final)\n\n"
            "👥 **Участники и Жеребьевка:**\n"
            "• `/players` — список 32 игроков турнира\n"
            "• `/add_player <Имя> [DUPR_ID] [Рейтинг]` — добавить/заменить игрока\n"
            "• `/del_player <Номер_или_Имя>` — очистить слот игрока\n"
            "• `/import_roster` — быстрая загрузка списка из 32 имен\n"
            "• `/draw` — провести случайную жеребьевку по группам A–H\n"
            "• `/reset_draw` — сбросить группы и матчи турнира\n\n"
            "📊 **Статус и Ссылки:**\n"
            "• `/status` — сводка по активному турниру и сыгранным матчам\n"
            "• `/site` — прямая ссылка на live-табло турнира\n"
            "• `/my_id` — узнать свой Telegram ID"
        )
    else:
        help_text = (
            "📖 **Справка для зрителей и игроков:**\n\n"
            "• `/tournaments` — выбор турнира\n"
            "• `/status` — текущий прогресс выбранного турнира\n"
            "• `/players` — список зарегистрированных игроков\n"
            "• `/site` — открыть онлайн-табло на сайте\n"
            "• `/my_id` — узнать свой Telegram ID"
        )
    await message.answer(help_text, parse_mode="Markdown")


@router.message(Command("status"))
@router.message(F.text.in_(["📊 Статус", "📊 Статус турнира"]))
async def cmd_status(message: Message):
    from tournament_context import get_active_tournament_id
    t_id = get_active_tournament_id(message.from_user.id)
    t_info = await db.get_tournament(t_id)
    matches = await db.get_group_matches(t_id)
    players = await db.get_players(t_id)
    playoff = await db.get_playoff_matches(t_id)

    t_title = t_info.get("title", t_id) if t_info else t_id
    stage = t_info.get("stage", "registration") if t_info else "registration"
    is_drawn = t_info.get("is_draw_completed", False) if t_info else False

    stage_names = {
        "registration": "📝 Регистрация участников",
        "groups": "🔥 Групповой этап (Americano)",
        "playoffs": "🏆 Плей-офф (Knockout)",
        "completed": "🥇 Турнир завершен"
    }

    total_group_matches = len(matches)
    completed_group_matches = sum(1 for m in matches if m.get("is_completed"))
    completed_po = sum(1 for p in playoff if p.get("is_completed"))

    text = (
        f"📊 **Текущее состояние турнира:**\n"
        f"🏆 **{t_title}** (`{t_id}`)\n"
        f"────────────────────────\n"
        f"• **Стадия:** {stage_names.get(stage, stage)}\n"
        f"• **Жеребьевка:** {'✅ Проведена (8 групп)' if is_drawn else '⏳ Ожидает'}\n"
        f"• **Игроки:** {len(players)} слотов\n"
        f"• **Матчи групп:** {completed_group_matches} / {total_group_matches} сыграно\n"
    )

    if stage in ["playoffs", "completed"]:
        text += f"• **Матчи плей-офф:** {completed_po} / {len(playoff)} сыграно\n"

    text += (
        f"────────────────────────\n"
        f"🌐 **Онлайн-табло:** [Открыть сайт]({FRONTEND_URL})\n"
        f"_Сменить активный турнир:_ `/tournaments`"
    )

    await message.answer(text, parse_mode="Markdown", disable_web_page_preview=True)


@router.message(Command("site"))
@router.message(F.text.in_(["🌐 Открыть сайт", "🌐 Открыть сайт турнира"]))
async def cmd_site(message: Message):
    await message.answer(
        f"🌐 **Прямая ссылка на сайт турнира:**\n{FRONTEND_URL}\n\n"
        "Сайт обновляется в реальном времени через Supabase WebSockets без перезагрузки страницы!",
        parse_mode="Markdown",
        disable_web_page_preview=False
    )


@router.callback_query(F.data == "menu_back")
async def cb_menu_back(query: CallbackQuery):
    await query.message.delete()
    await query.message.answer(
        "Главное меню:",
        reply_markup=get_main_menu_keyboard(is_admin(query.from_user.id))
    )
    await query.answer()

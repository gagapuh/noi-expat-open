"""
Reply Keyboards for Telegram Bot.
"""

from aiogram.types import ReplyKeyboardMarkup, KeyboardButton


def get_main_menu_keyboard(is_admin_user: bool = True) -> ReplyKeyboardMarkup:
    """Returns persistent main menu reply keyboard."""
    if not is_admin_user:
        keyboard = [
            [KeyboardButton(text="📊 Статус"), KeyboardButton(text="🏆 Турниры")],
            [KeyboardButton(text="👥 Список игроков"), KeyboardButton(text="🌐 Открыть сайт")]
        ]
    else:
        keyboard = [
            [KeyboardButton(text="🎾 Ввод счета"), KeyboardButton(text="🏆 Плей-офф")],
            [KeyboardButton(text="👥 Игроки"), KeyboardButton(text="🎲 Жеребьевка")],
            [KeyboardButton(text="🏆 Турниры"), KeyboardButton(text="📊 Статус")]
        ]

    return ReplyKeyboardMarkup(
        keyboard=keyboard,
        resize_keyboard=True,
        is_persistent=True
    )

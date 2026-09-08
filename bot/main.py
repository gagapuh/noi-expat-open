"""
Main entry point for NOI EXPAT OPEN Telegram Bot.
"""

import asyncio
import logging
import sys
from aiogram import Bot, Dispatcher
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import BotCommand

from config import BOT_TOKEN, SUPABASE_URL, TOURNAMENT_ID
from db import db
from handlers import (
    common_router,
    tournaments_router,
    roster_router,
    draw_router,
    matches_router,
    playoffs_router
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger("tournament_bot")


async def setup_bot_commands(bot: Bot):
    """Sets bot commands in Telegram UI menu."""
    commands = [
        BotCommand(command="tournaments", description="🏆 Выбор активного турнира"),
        BotCommand(command="matches", description="🎾 Ввод счета матча на корте"),
        BotCommand(command="playoffs", description="🏆 Сетка и счет плей-офф"),
        BotCommand(command="players", description="👥 Список участников турнира"),
        BotCommand(command="draw", description="🎲 Провести жеребьевку"),
        BotCommand(command="status", description="📊 Текущий статус турнира"),
        BotCommand(command="site", description="🌐 Ссылка на онлайн-табло"),
        BotCommand(command="help", description="❓ Справка по командам"),
        BotCommand(command="my_id", description="🆔 Узнать свой Telegram ID"),
    ]
    await bot.set_my_commands(commands)


async def main():
    logger.info("=== Starting NOI EXPAT OPEN Tournament Bot ===")
    logger.info(f"Default tournament: {TOURNAMENT_ID}")
    logger.info(f"Supabase endpoint: {SUPABASE_URL}")

    if not BOT_TOKEN or BOT_TOKEN.startswith("YOUR_"):
        logger.error("BOT_TOKEN is not set in .env! Please set your Telegram bot token.")
        print("\n" + "="*70)
        print("❌ ОШИБКА: BOT_TOKEN не задан в .env!")
        print("Откройте файл bot/.env и вставьте токен вашего бота от @BotFather:")
        print("BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz")
        print("="*70 + "\n")
        return

    bot = Bot(token=BOT_TOKEN)
    storage = MemoryStorage()
    dp = Dispatcher(storage=storage)

    # Register all handlers
    dp.include_router(common_router)
    dp.include_router(tournaments_router)
    dp.include_router(roster_router)
    dp.include_router(draw_router)
    dp.include_router(matches_router)
    dp.include_router(playoffs_router)

    await setup_bot_commands(bot)

    # Delete any pending webhook updates
    await bot.delete_webhook(drop_pending_updates=True)

    bot_info = await bot.get_me()
    logger.info(f"Bot connected: @{bot_info.username} (ID: {bot_info.id})")
    print(f"\n🚀 Бот @{bot_info.username} успешно запущен и слушает команды!\n")

    try:
        await dp.start_polling(bot)
    finally:
        await bot.session.close()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.info("Bot stopped.")

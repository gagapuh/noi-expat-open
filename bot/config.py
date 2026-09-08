"""
Configuration manager for NOI EXPAT OPEN Telegram Bot.
"""

import os
from typing import Set
from dotenv import load_dotenv

# Load environment from .env file
load_dotenv()

BOT_TOKEN: str = os.getenv("BOT_TOKEN", "").strip()

# Admin IDs: comma-separated string, e.g. "12345678,87654321"
_admin_raw = os.getenv("ADMIN_TELEGRAM_IDS", "")
ADMIN_TELEGRAM_IDS: Set[int] = set()
for item in _admin_raw.replace(" ", "").split(","):
    if item.isdigit():
        ADMIN_TELEGRAM_IDS.add(int(item))

SUPABASE_URL: str = os.getenv("SUPABASE_URL", "https://dzlogbirnflzygrsekfb.supabase.co").strip().rstrip("/")
SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()
SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "").strip()

TOURNAMENT_ID: str = os.getenv("TOURNAMENT_ID", "picklehead-individual-doubles").strip()
FRONTEND_URL: str = os.getenv("FRONTEND_URL", "https://gagapuh.github.io/noi-expat-open").strip()


def is_admin(user_id: int) -> bool:
    """Check if user_id is in admin whitelist. If whitelist is empty, default to True for local testing."""
    if not ADMIN_TELEGRAM_IDS:
        return True
    return user_id in ADMIN_TELEGRAM_IDS

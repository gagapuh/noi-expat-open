"""
Tournament Context Manager.
Keeps track of which tournament is currently selected/active for each user or admin.
Persists selection in a local JSON file so it survives bot restarts.
"""

import os
import json
import logging
from typing import Dict, Any, Optional
from config import TOURNAMENT_ID
from db import db

logger = logging.getLogger(__name__)

DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "active_tournaments.json")

# In-memory cache
_user_tournaments: Dict[str, str] = {}


def _load_data():
    global _user_tournaments
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                _user_tournaments = json.load(f)
        except Exception as e:
            logger.warning(f"Error reading active_tournaments.json: {e}")
            _user_tournaments = {}


def _save_data():
    try:
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(_user_tournaments, f, ensure_ascii=False, indent=2)
    except Exception as e:
        logger.warning(f"Error saving active_tournaments.json: {e}")


_load_data()


def get_active_tournament_id(user_id: int) -> str:
    """Returns currently selected tournament_id for this user, falling back to default TOURNAMENT_ID."""
    uid_str = str(user_id)
    return _user_tournaments.get(uid_str, _user_tournaments.get("global", TOURNAMENT_ID))


def set_active_tournament_id(user_id: int, tournament_id: str):
    """Sets active tournament for user and updates global default."""
    uid_str = str(user_id)
    _user_tournaments[uid_str] = tournament_id
    _user_tournaments["global"] = tournament_id
    _save_data()


async def get_active_tournament_info(user_id: int) -> Optional[Dict[str, Any]]:
    """Returns active tournament details from database."""
    t_id = get_active_tournament_id(user_id)
    t = await db.get_tournament(t_id)
    if not t:
        # Fallback to default tournament if selected one is deleted
        t_id = TOURNAMENT_ID
        t = await db.get_tournament(t_id)
    return t

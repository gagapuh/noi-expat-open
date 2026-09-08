"""
Keyboards package initialization.
"""
from .main_menu import get_main_menu_keyboard
from .inline_keypads import (
    get_draw_confirm_keyboard,
    get_courts_keyboard,
    get_matches_on_court_keyboard,
    get_score_numpad_keyboard,
    get_score_confirm_keyboard,
    get_playoff_matches_keyboard,
    get_reset_confirm_keyboard
)

__all__ = [
    "get_main_menu_keyboard",
    "get_draw_confirm_keyboard",
    "get_courts_keyboard",
    "get_matches_on_court_keyboard",
    "get_score_numpad_keyboard",
    "get_score_confirm_keyboard",
    "get_playoff_matches_keyboard",
    "get_reset_confirm_keyboard"
]

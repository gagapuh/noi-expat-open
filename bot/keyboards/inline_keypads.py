"""
Inline Keyboards for Interactive Scenarios (Court picker, Match selection, Score numpad).
"""

from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from typing import List, Dict, Any


def get_draw_confirm_keyboard() -> InlineKeyboardMarkup:
    """Confirmation keyboard after /draw generation."""
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="✅ Подтвердить и опубликовать", callback_data="draw_confirm")
            ],
            [
                InlineKeyboardButton(text="🎲 Перемешать заново", callback_data="draw_reshuffle"),
                InlineKeyboardButton(text="❌ Отмена", callback_data="draw_cancel")
            ]
        ]
    )


def get_courts_keyboard(action_prefix: str = "court") -> InlineKeyboardMarkup:
    """Court selector keyboard (Courts 1-4)."""
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="🎾 Корт 1", callback_data=f"{action_prefix}:c1"),
                InlineKeyboardButton(text="🎾 Корт 2", callback_data=f"{action_prefix}:c2")
            ],
            [
                InlineKeyboardButton(text="🎾 Корт 3", callback_data=f"{action_prefix}:c3"),
                InlineKeyboardButton(text="🎾 Корт 4", callback_data=f"{action_prefix}:c4")
            ],
            [
                InlineKeyboardButton(text="🔙 Назад в меню", callback_data="menu_back")
            ]
        ]
    )


def get_matches_on_court_keyboard(matches: List[Dict[str, Any]], court_id: str) -> InlineKeyboardMarkup:
    """List of matches on the selected court."""
    buttons = []
    for m in matches:
        p1 = " & ".join(m.get('pair1_names', []))
        p2 = " & ".join(m.get('pair2_names', []))
        score_text = f"({m['score1']}:{m['score2']})" if m.get('is_completed') else "⏳"
        btn_text = f"R{m.get('round_number')}: {p1} vs {p2} {score_text}"
        buttons.append([InlineKeyboardButton(text=btn_text, callback_data=f"match_sel:{m['id']}")])

    buttons.append([InlineKeyboardButton(text="🔙 Выбрать другой корт", callback_data="court_select_again")])
    return InlineKeyboardMarkup(inline_keyboard=buttons)


def get_score_numpad_keyboard(pair_num: int, match_id: str, current_score1: int = None) -> InlineKeyboardMarkup:
    """
    Keypad for entering score 0..15.
    If pair_num == 1: callback is "sc1:<match_id>:<val>"
    If pair_num == 2: callback is "sc2:<match_id>:<score1>:<val>"
    """
    rows = []
    # Fast 11 preset
    rows.append([InlineKeyboardButton(text="⚡ 11 очков (Победа в сете)", callback_data=f"sc{pair_num}:{match_id}:{11}" if pair_num == 1 else f"sc{pair_num}:{match_id}:{current_score1}:{11}")])

    # 4 rows of 4 buttons (0..15)
    nums = list(range(16))
    for i in range(0, 16, 4):
        row = []
        for n in nums[i : i + 4]:
            cb = f"sc{pair_num}:{match_id}:{n}" if pair_num == 1 else f"sc{pair_num}:{match_id}:{current_score1}:{n}"
            row.append(InlineKeyboardButton(text=f"{n:2d}", callback_data=cb))
        rows.append(row)

    rows.append([InlineKeyboardButton(text="❌ Отмена", callback_data="match_cancel")])
    return InlineKeyboardMarkup(inline_keyboard=rows)


def get_score_confirm_keyboard(match_id: str, s1: int, s2: int) -> InlineKeyboardMarkup:
    """Confirm entered score before saving to Supabase."""
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="💾 Записать результат", callback_data=f"sc_save:{match_id}:{s1}:{s2}")
            ],
            [
                InlineKeyboardButton(text="✏️ Изменить", callback_data=f"match_sel:{match_id}"),
                InlineKeyboardButton(text="❌ Отмена", callback_data="match_cancel")
            ]
        ]
    )


def get_playoff_matches_keyboard(playoff_matches: List[Dict[str, Any]]) -> InlineKeyboardMarkup:
    """Selector for playoff matches (QF-1..QF-4, SF-1..SF-2, F-GOLD)."""
    buttons = []
    for m in playoff_matches:
        status = f"✅ {m['score']}" if m.get('is_completed') else "⏳ Не сыгран"
        btn_text = f"{m['name']}: {m['team1_name']} vs {m['team2_name']} [{status}]"
        buttons.append([InlineKeyboardButton(text=btn_text, callback_data=f"po_sel:{m['id']}")])

    buttons.append([InlineKeyboardButton(text="🔙 В меню", callback_data="menu_back")])
    return InlineKeyboardMarkup(inline_keyboard=buttons)


def get_reset_confirm_keyboard() -> InlineKeyboardMarkup:
    """Safety confirmation before resetting tournament data."""
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="⚠️ ДА, СБРОСИТЬ ВСЕ", callback_data="reset_tournament_confirm")
            ],
            [
                InlineKeyboardButton(text="Отмена", callback_data="reset_tournament_cancel")
            ]
        ]
    )

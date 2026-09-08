"""
Handlers package initialization.
"""
from .common import router as common_router
from .tournaments import router as tournaments_router
from .roster import router as roster_router
from .draw import router as draw_router
from .matches import router as matches_router
from .playoffs import router as playoffs_router

__all__ = ["common_router", "tournaments_router", "roster_router", "draw_router", "matches_router", "playoffs_router"]

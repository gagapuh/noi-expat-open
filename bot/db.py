"""
Database client for Supabase PostgREST async interaction.
Provides high-performance async queries for tournaments, players, matches, and playoffs.
"""

import httpx
import logging
from typing import List, Dict, Any, Optional
from config import SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, TOURNAMENT_ID

logger = logging.getLogger(__name__)


class SupabaseDB:
    def __init__(self, url: str = SUPABASE_URL, service_role_key: str = SUPABASE_SERVICE_ROLE_KEY):
        self.url = url.rstrip('/')
        self.rest_url = f"{self.url}/rest/v1"
        self.key = service_role_key
        self.headers = {
            "apikey": self.key,
            "Authorization": f"Bearer {self.key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }

    def is_configured(self) -> bool:
        return bool(self.url and self.key and not self.key.startswith("YOUR_"))

    async def _request(self, method: str, endpoint: str, params: Optional[Dict[str, Any]] = None, json_data: Optional[Any] = None) -> Any:
        if not self.is_configured():
            logger.warning("Supabase DB credentials are not configured.")
            return None

        url = f"{self.rest_url}/{endpoint}"
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.request(
                method=method,
                url=url,
                params=params,
                json=json_data,
                headers=self.headers
            )
            if resp.status_code >= 400:
                logger.error(f"Supabase request error {resp.status_code} on {method} {url}: {resp.text}")
                resp.raise_for_status()
            if resp.content:
                return resp.json()
            return None

    # ── Tournament ──
    async def get_tournaments(self) -> List[Dict[str, Any]]:
        res = await self._request("GET", "tournaments", params={"select": "*", "order": "created_at.asc"})
        return res or []

    async def get_tournament(self, tournament_id: str = TOURNAMENT_ID) -> Optional[Dict[str, Any]]:
        res = await self._request("GET", "tournaments", params={"id": f"eq.{tournament_id}", "select": "*"})
        if res and len(res) > 0:
            return res[0]
        return None

    async def create_tournament(self, tournament_id: str, title: str, settings: Optional[Dict[str, Any]] = None) -> Optional[Dict[str, Any]]:
        data = {
            "id": tournament_id,
            "title": title,
            "stage": "registration",
            "is_draw_completed": False,
            "settings": settings or {"format": "Americano", "courts": ["c1", "c2", "c3", "c4"], "pointsPerGame": 11}
        }
        res = await self._request("POST", "tournaments", json_data=data)
        if res and len(res) > 0:
            return res[0]
        return None

    async def init_tournament_structure(self, tournament_id: str, title: str) -> Optional[Dict[str, Any]]:
        """Creates tournament entry, initializes 32 default players, and creates playoff placeholders."""
        t = await self.get_tournament(tournament_id)
        if not t:
            t = await self.create_tournament(tournament_id, title)

        # 1. Initialize 32 players
        players = await self.get_players(tournament_id)
        if not players:
            await self.reset_players_to_default(tournament_id, 32)

        # 2. Initialize playoff matches
        po = await self.get_playoff_matches(tournament_id)
        if not po:
            from tournament_logic import generate_playoffs_matches, form_playoff_teams
            # Dummy teams for placeholders
            dummy_winners = [{'name': f'Winner #{i}', 'seed_code': f'W{i}'} for i in range(1, 9)]
            dummy_runners = [{'name': f'Runner-up #{i}', 'seed_code': f'R{i}'} for i in range(1, 9)]
            teams = form_playoff_teams(dummy_winners, dummy_runners)
            po_matches = generate_playoffs_matches(teams, tournament_id)
            await self.save_playoff_matches(po_matches, tournament_id)

        return t

    async def update_tournament(self, tournament_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        res = await self._request("PATCH", "tournaments", params={"id": f"eq.{tournament_id}"}, json_data=updates)
        if res and len(res) > 0:
            return res[0]
        return None

    # ── Players ──
    async def get_players(self, tournament_id: str = TOURNAMENT_ID) -> List[Dict[str, Any]]:
        res = await self._request("GET", "players", params={"tournament_id": f"eq.{tournament_id}", "order": "slot_number.asc"})
        return res or []

    async def update_player(self, player_id: int, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        res = await self._request("PATCH", "players", params={"id": f"eq.{player_id}"}, json_data=updates)
        if res and len(res) > 0:
            return res[0]
        return None

    async def reset_players_to_default(self, tournament_id: str = TOURNAMENT_ID, count: int = 32):
        # Delete existing
        await self._request("DELETE", "players", params={"tournament_id": f"eq.{tournament_id}"})
        new_players = [
            {
                "tournament_id": tournament_id,
                "slot_number": i,
                "name": f"Player {i}",
                "dupr_id": "",
                "dupr_rating": None,
                "group_name": None
            }
            for i in range(1, count + 1)
        ]
        await self._request("POST", "players", json_data=new_players)

    async def import_roster(self, names: List[str], tournament_id: str = TOURNAMENT_ID) -> List[Dict[str, Any]]:
        existing = await self.get_players(tournament_id)
        if len(existing) < 32:
            await self.reset_players_to_default(tournament_id, 32)
            existing = await self.get_players(tournament_id)

        updated = []
        for idx in range(min(32, len(names))):
            p = existing[idx]
            clean_name = names[idx].strip()
            if clean_name:
                res = await self.update_player(p['id'], {"name": clean_name, "group_name": None})
                if res:
                    updated.append(res)
        return updated

    # ── Draw & Group Matches ──
    async def save_draw(self, tournament_id: str, groups_map: Dict[str, List[Dict[str, Any]]], matches: List[Dict[str, Any]]) -> bool:
        # 1. Update each player's group
        for group_name, players in groups_map.items():
            for p in players:
                if 'id' in p:
                    await self.update_player(p['id'], {"group_name": group_name})

        # 2. Clear old group matches
        await self._request("DELETE", "group_matches", params={"tournament_id": f"eq.{tournament_id}"})

        # 3. Insert new 48 matches
        await self._request("POST", "group_matches", json_data=matches)

        # 4. Update tournament status
        await self.update_tournament(tournament_id, {
            "is_draw_completed": True,
            "stage": "groups"
        })
        return True

    async def get_group_matches(self, tournament_id: str = TOURNAMENT_ID, group_name: Optional[str] = None, court_id: Optional[str] = None) -> List[Dict[str, Any]]:
        params = {"tournament_id": f"eq.{tournament_id}", "order": "round_number.asc,court_id.asc"}
        if group_name:
            params["group_name"] = f"eq.{group_name}"
        if court_id:
            params["court_id"] = f"eq.{court_id}"
        res = await self._request("GET", "group_matches", params=params)
        return res or []

    async def get_match_by_id(self, match_id: str) -> Optional[Dict[str, Any]]:
        res = await self._request("GET", "group_matches", params={"id": f"eq.{match_id}", "select": "*"})
        if res and len(res) > 0:
            return res[0]
        return None

    async def update_match_score(self, match_id: str, score1: int, score2: int, is_completed: bool = True) -> Optional[Dict[str, Any]]:
        res = await self._request("PATCH", "group_matches", params={"id": f"eq.{match_id}"}, json_data={
            "score1": score1,
            "score2": score2,
            "is_completed": is_completed
        })
        if res and len(res) > 0:
            return res[0]
        return None

    # ── Playoffs ──
    async def get_playoff_matches(self, tournament_id: str = TOURNAMENT_ID) -> List[Dict[str, Any]]:
        res = await self._request("GET", "playoff_matches", params={"tournament_id": f"eq.{tournament_id}", "order": "created_at.asc"})
        return res or []

    async def get_playoff_match_by_id(self, match_id: str) -> Optional[Dict[str, Any]]:
        res = await self._request("GET", "playoff_matches", params={"id": f"eq.{match_id}", "select": "*"})
        if res and len(res) > 0:
            return res[0]
        return None

    async def save_playoff_matches(self, matches: List[Dict[str, Any]], tournament_id: str = TOURNAMENT_ID):
        for m in matches:
            m_id = m['id']
            # Upsert
            existing = await self.get_playoff_match_by_id(m_id)
            if existing:
                await self._request("PATCH", "playoff_matches", params={"id": f"eq.{m_id}"}, json_data=m)
            else:
                await self._request("POST", "playoff_matches", json_data=m)

    async def update_playoff_match(self, match_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        res = await self._request("PATCH", "playoff_matches", params={"id": f"eq.{match_id}"}, json_data=updates)
        if res and len(res) > 0:
            return res[0]
        return None

    async def reset_tournament_draw(self, tournament_id: str = TOURNAMENT_ID):
        # 1. Reset players groups
        players = await self.get_players(tournament_id)
        for p in players:
            await self.update_player(p['id'], {"group_name": None})

        # 2. Delete matches
        await self._request("DELETE", "group_matches", params={"tournament_id": f"eq.{tournament_id}"})

        # 3. Reset playoffs
        await self._request("DELETE", "playoff_matches", params={"tournament_id": f"eq.{tournament_id}"})

        # 4. Reset tournament status
        await self.update_tournament(tournament_id, {
            "is_draw_completed": False,
            "stage": "registration"
        })


db = SupabaseDB()

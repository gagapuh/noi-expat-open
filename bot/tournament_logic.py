"""
Tournament Logic Engine for NOI EXPAT OPEN: Picklehead Individual Doubles (32 players).
Format:
- 32 players in 8 Americano groups (Groups A to H, 4 players per group).
- Each group plays 6 matches ('each with each' rotating partners x 2 rounds) to 11 points.
- Top 2 from each group advance (8 Winners W1..W8, 8 Runners-Up R1..R8).
- Ranked by: Wins -> Point Diff -> Points Scored -> DUPR -> Seed.
- Balanced Playoff Pairs: W_k + R_(9-k).
- Knockout: Quarterfinals (BO3) -> Semifinals (BO3) -> Grand Final (BO5).
"""

import random
from typing import List, Dict, Any, Tuple, Optional


GROUPS = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F', 'Group G', 'Group H']

GROUP_COURTS = {
    'Group A': 'c1',
    'Group B': 'c2',
    'Group C': 'c3',
    'Group D': 'c4',
    'Group E': 'c1',
    'Group F': 'c2',
    'Group G': 'c3',
    'Group H': 'c4',
}

COURT_NAMES = {
    'c1': 'Court 1',
    'c2': 'Court 2',
    'c3': 'Court 3',
    'c4': 'Court 4'
}

COURT_IDS = {
    'Court 1': 'c1',
    'Court 2': 'c2',
    'Court 3': 'c3',
    'Court 4': 'c4'
}


def generate_draw(players: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
    """
    Shuffles 32 players using Fisher-Yates and distributes into 8 groups (A-H), 4 players each.
    Returns dict mapping group_name to list of 4 players.
    """
    shuffled = list(players)
    random.shuffle(shuffled)

    groups_map: Dict[str, List[Dict[str, Any]]] = {}
    for idx, group_name in enumerate(GROUPS):
        group_players = shuffled[idx * 4 : (idx + 1) * 4]
        for p in group_players:
            p['group_name'] = group_name
        groups_map[group_name] = group_players

    return groups_map


def generate_group_matches(groups_map: Dict[str, List[Dict[str, Any]]], tournament_id: str = 'picklehead-individual-doubles') -> List[Dict[str, Any]]:
    """
    Generates 48 matches (6 matches per group) for Americano format.
    Pairings for 4 players [p1, p2, p3, p4]:
    Round 1: [p1, p2] vs [p3, p4]
    Round 2: [p1, p3] vs [p2, p4]
    Round 3: [p1, p4] vs [p2, p3]
    Round 4: [p1, p2] vs [p3, p4]
    Round 5: [p1, p3] vs [p2, p4]
    Round 6: [p1, p4] vs [p2, p3]
    """
    matches = []

    round_pairs_idx = [
        ((0, 1), (2, 3)), # Round 1
        ((0, 2), (1, 3)), # Round 2
        ((0, 3), (1, 2)), # Round 3
        ((0, 1), (2, 3)), # Round 4
        ((0, 2), (1, 3)), # Round 5
        ((0, 3), (1, 2)), # Round 6
    ]

    for group_name in GROUPS:
        group_players = groups_map.get(group_name, [])
        if len(group_players) < 4:
            continue

        court_id = GROUP_COURTS.get(group_name, 'c1')

        for r_num, (pair1_idx, pair2_idx) in enumerate(round_pairs_idx, start=1):
            pair1_names = [group_players[pair1_idx[0]]['name'], group_players[pair1_idx[1]]['name']]
            pair2_names = [group_players[pair2_idx[0]]['name'], group_players[pair2_idx[1]]['name']]

            matches.append({
                'tournament_id': tournament_id,
                'group_name': group_name,
                'round_number': r_num,
                'court_id': court_id,
                'pair1_names': pair1_names,
                'pair2_names': pair2_names,
                'score1': None,
                'score2': None,
                'is_completed': False,
            })

    return matches


def calculate_group_standings(group_players: List[Dict[str, Any]], group_matches: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Calculates standings for players in a group.
    Returns list of 4 players sorted by rank 1..4:
    Rank criteria:
    1. Wins count DESC
    2. Point difference (Diff) DESC
    3. Total points scored DESC
    4. DUPR rating DESC
    5. slot_number / id ASC
    """
    stats: Dict[str, Dict[str, Any]] = {}
    for p in group_players:
        name = p['name']
        stats[name] = {
            'player_id': p.get('id'),
            'slot_number': p.get('slot_number', 0),
            'name': name,
            'dupr_id': p.get('dupr_id', ''),
            'dupr_rating': float(p.get('dupr_rating') or 0.0),
            'group_name': p.get('group_name'),
            'played': 0,
            'wins': 0,
            'losses': 0,
            'diff': 0,
            'points': 0,
            'qualified': False,
            'advanceTo': 'Eliminated'
        }

    for m in group_matches:
        if not m.get('is_completed') or m.get('score1') is None or m.get('score2') is None:
            continue

        s1 = int(m['score1'])
        s2 = int(m['score2'])
        p1_list = m.get('pair1_names') or []
        p2_list = m.get('pair2_names') or []

        # Pair 1 stats
        for name in p1_list:
            if name in stats:
                stats[name]['played'] += 1
                stats[name]['points'] += s1
                stats[name]['diff'] += (s1 - s2)
                if s1 > s2:
                    stats[name]['wins'] += 1
                elif s1 < s2:
                    stats[name]['losses'] += 1

        # Pair 2 stats
        for name in p2_list:
            if name in stats:
                stats[name]['played'] += 1
                stats[name]['points'] += s2
                stats[name]['diff'] += (s2 - s1)
                if s2 > s1:
                    stats[name]['wins'] += 1
                elif s2 < s1:
                    stats[name]['losses'] += 1

    # Sort players by tiebreak criteria
    standings_list = list(stats.values())
    standings_list.sort(
        key=lambda x: (
            x['wins'],
            x['diff'],
            x['points'],
            x['dupr_rating'],
            -x['slot_number'] if x['slot_number'] else 0
        ),
        reverse=True
    )

    # Assign ranks
    all_completed = (len(group_matches) == 6 and all(m.get('is_completed') for m in group_matches))
    for rank_idx, row in enumerate(standings_list, start=1):
        row['rank'] = rank_idx
        if rank_idx <= 2:
            row['qualified'] = all_completed
            row['advanceTo'] = 'Playoffs' if all_completed else 'TBD'
        else:
            row['qualified'] = False
            row['advanceTo'] = 'Eliminated' if all_completed else 'TBD'

    return standings_list


def rank_group_winners_and_runners(all_group_standings: Dict[str, List[Dict[str, Any]]]) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]:
    """
    Ranks the 8 Group Winners (W1..W8) and 8 Runners-Up (R1..R8) across all 8 groups.
    Criteria:
    1. Wins DESC
    2. Diff DESC
    3. Points DESC
    4. DUPR DESC
    """
    winners = []
    runners = []

    for group_name, standings in all_group_standings.items():
        if len(standings) >= 2:
            w = dict(standings[0])
            w['origin_group'] = group_name
            winners.append(w)

            r = dict(standings[1])
            r['origin_group'] = group_name
            runners.append(r)

    sort_key = lambda x: (
        x.get('wins', 0),
        x.get('diff', 0),
        x.get('points', 0),
        x.get('dupr_rating', 0.0),
        -x.get('slot_number', 0)
    )

    winners.sort(key=sort_key, reverse=True)
    runners.sort(key=sort_key, reverse=True)

    for idx, w in enumerate(winners, start=1):
        w['seed_label'] = f"Winner #{idx}"
        w['seed_code'] = f"W{idx}"
        w['seed_number'] = idx

    for idx, r in enumerate(runners, start=1):
        r['seed_label'] = f"Runner-up #{idx}"
        r['seed_code'] = f"R{idx}"
        r['seed_number'] = idx

    return winners, runners


def form_playoff_teams(ranked_winners: List[Dict[str, Any]], ranked_runners: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Forms 8 balanced teams using merit pairing formula:
    Winner #k + Runner-up #(9 - k).
    Team 1: W1 + R8
    Team 2: W2 + R7
    Team 3: W3 + R6
    Team 4: W4 + R5
    Team 5: W5 + R4
    Team 6: W6 + R3
    Team 7: W7 + R2
    Team 8: W8 + R1
    """
    teams = []
    for k in range(1, 9):
        w = ranked_winners[k - 1]
        r = ranked_runners[8 - k] # 9 - k index (1-based is 8-k in 0-based)

        team_id = f"team-{k}"
        team_name = f"Team {k}"
        duo_str = f"{w['name']} & {r['name']}"
        formula_str = f"W{k} + R{9 - k}"

        teams.append({
            'id': team_id,
            'number': k,
            'name': team_name,
            'duo': duo_str,
            'players': [w['name'], r['name']],
            'winner_seed': f"W{k}",
            'runner_seed': f"R{9 - k}",
            'winner_player': w,
            'runner_player': r,
            'formula': formula_str
        })

    return teams


def generate_playoffs_matches(teams: List[Dict[str, Any]], tournament_id: str = 'picklehead-individual-doubles') -> List[Dict[str, Any]]:
    """
    Generates initial playoff matches:
    Quarterfinals (BO3):
      QF-1 (Court 1): Team 1 vs Team 8
      QF-2 (Court 2): Team 4 vs Team 5
      QF-3 (Court 3): Team 2 vs Team 7
      QF-4 (Court 4): Team 3 vs Team 6
    Semifinals (BO3):
      SF-1 (Court 1): Winner QF1 vs Winner QF2
      SF-2 (Court 2): Winner QF3 vs Winner QF4
    Grand Final (BO5):
      F-GOLD (Court 1): Winner SF1 vs Winner SF2
    """
    team_by_num = {t['number']: t for t in teams}

    t1 = team_by_num.get(1, {})
    t2 = team_by_num.get(2, {})
    t3 = team_by_num.get(3, {})
    t4 = team_by_num.get(4, {})
    t5 = team_by_num.get(5, {})
    t6 = team_by_num.get(6, {})
    t7 = team_by_num.get(7, {})
    t8 = team_by_num.get(8, {})

    def mid(code: str) -> str:
        return code if tournament_id == 'picklehead-individual-doubles' else f"{tournament_id}_{code}"

    matches = [
        # Quarterfinals
        {
            'id': mid('QF-1'),
            'tournament_id': tournament_id,
            'round_type': 'quarterfinal',
            'court_id': 'c1',
            'name': 'Quarterfinal 1',
            'team1_name': f"Team 1 ({t1.get('duo', 'W1 + R8')})",
            'team2_name': f"Team 8 ({t8.get('duo', 'W8 + R1')})",
            'team1_seed': 'W1 + R8',
            'team2_seed': 'W8 + R1',
            'team1_players': t1.get('players', []),
            'team2_players': t8.get('players', []),
            'sets': [],
            'score': '—',
            'winner_team': None,
            'is_completed': False
        },
        {
            'id': mid('QF-2'),
            'tournament_id': tournament_id,
            'round_type': 'quarterfinal',
            'court_id': 'c2',
            'name': 'Quarterfinal 2',
            'team1_name': f"Team 4 ({t4.get('duo', 'W4 + R5')})",
            'team2_name': f"Team 5 ({t5.get('duo', 'W5 + R4')})",
            'team1_seed': 'W4 + R5',
            'team2_seed': 'W5 + R4',
            'team1_players': t4.get('players', []),
            'team2_players': t5.get('players', []),
            'sets': [],
            'score': '—',
            'winner_team': None,
            'is_completed': False
        },
        {
            'id': mid('QF-3'),
            'tournament_id': tournament_id,
            'round_type': 'quarterfinal',
            'court_id': 'c3',
            'name': 'Quarterfinal 3',
            'team1_name': f"Team 2 ({t2.get('duo', 'W2 + R7')})",
            'team2_name': f"Team 7 ({t7.get('duo', 'W7 + R2')})",
            'team1_seed': 'W2 + R7',
            'team2_seed': 'W7 + R2',
            'team1_players': t2.get('players', []),
            'team2_players': t7.get('players', []),
            'sets': [],
            'score': '—',
            'winner_team': None,
            'is_completed': False
        },
        {
            'id': mid('QF-4'),
            'tournament_id': tournament_id,
            'round_type': 'quarterfinal',
            'court_id': 'c4',
            'name': 'Quarterfinal 4',
            'team1_name': f"Team 3 ({t3.get('duo', 'W3 + R6')})",
            'team2_name': f"Team 6 ({t6.get('duo', 'W6 + R3')})",
            'team1_seed': 'W3 + R6',
            'team2_seed': 'W6 + R3',
            'team1_players': t3.get('players', []),
            'team2_players': t6.get('players', []),
            'sets': [],
            'score': '—',
            'winner_team': None,
            'is_completed': False
        },
        # Semifinals
        {
            'id': mid('SF-1'),
            'tournament_id': tournament_id,
            'round_type': 'semifinal',
            'court_id': 'c1',
            'name': 'Championship Semifinal 1',
            'team1_name': 'Winner QF1',
            'team2_name': 'Winner QF2',
            'team1_seed': 'Winner QF1',
            'team2_seed': 'Winner QF2',
            'team1_players': [],
            'team2_players': [],
            'sets': [],
            'score': '—',
            'winner_team': None,
            'is_completed': False
        },
        {
            'id': mid('SF-2'),
            'tournament_id': tournament_id,
            'round_type': 'semifinal',
            'court_id': 'c2',
            'name': 'Championship Semifinal 2',
            'team1_name': 'Winner QF3',
            'team2_name': 'Winner QF4',
            'team1_seed': 'Winner QF3',
            'team2_seed': 'Winner QF4',
            'team1_players': [],
            'team2_players': [],
            'sets': [],
            'score': '—',
            'winner_team': None,
            'is_completed': False
        },
        # Grand Final
        {
            'id': mid('F-GOLD'),
            'tournament_id': tournament_id,
            'round_type': 'final',
            'court_id': 'c1',
            'name': '🥇 Grand Championship Final',
            'team1_name': 'Winner SF1',
            'team2_name': 'Winner SF2',
            'team1_seed': 'Winner SF1',
            'team2_seed': 'Winner SF2',
            'team1_players': [],
            'team2_players': [],
            'sets': [],
            'score': '—',
            'winner_team': None,
            'is_completed': False
        }
    ]

    return matches


def evaluate_playoff_sets(round_type: str, sets: List[Dict[str, int]]) -> Tuple[Optional[int], str, bool]:
    """
    Evaluates sets for a playoff match:
    BO3: First to win 2 sets.
    BO5: First to win 3 sets.
    Returns: (winner_team, score_summary_string, is_completed)
    """
    required_wins = 3 if round_type == 'final' else 2
    w1 = 0
    w2 = 0

    for s in sets:
        s1 = s.get('s1', 0)
        s2 = s.get('s2', 0)
        if s1 > s2:
            w1 += 1
        elif s2 > s1:
            w2 += 1

    score_str = f"{w1} - {w2}" if sets else "—"

    if w1 >= required_wins:
        return 1, score_str, True
    elif w2 >= required_wins:
        return 2, score_str, True

    return None, score_str, False


def advance_playoff_bracket(playoff_matches_map: Dict[str, Dict[str, Any]]) -> Dict[str, Dict[str, Any]]:
    """
    Updates semifinal and final participants based on completed matches.
    """
    def get_m(code: str) -> Dict[str, Any]:
        if code in playoff_matches_map:
            return playoff_matches_map[code]
        for k, v in playoff_matches_map.items():
            if k.endswith(f"_{code}") or k.endswith(f":{code}"):
                return v
        return {}

    qf1 = get_m('QF-1')
    qf2 = get_m('QF-2')
    qf3 = get_m('QF-3')
    qf4 = get_m('QF-4')
    sf1 = get_m('SF-1')
    sf2 = get_m('SF-2')
    fgold = get_m('F-GOLD')

    def get_winner_info(m: Dict[str, Any]) -> Tuple[str, List[str]]:
        if not m.get('is_completed'):
            return f"Winner {m.get('id', '')}", []
        if m.get('winner_team') == 1:
            return m.get('team1_name', ''), m.get('team1_players', [])
        elif m.get('winner_team') == 2:
            return m.get('team2_name', ''), m.get('team2_players', [])
        return f"Winner {m.get('id', '')}", []

    # Update SF1
    if sf1:
        w_name, w_players = get_winner_info(qf1)
        sf1['team1_name'] = w_name
        sf1['team1_players'] = w_players
        w_name2, w_players2 = get_winner_info(qf2)
        sf1['team2_name'] = w_name2
        sf1['team2_players'] = w_players2

    # Update SF2
    if sf2:
        w_name, w_players = get_winner_info(qf3)
        sf2['team1_name'] = w_name
        sf2['team1_players'] = w_players
        w_name2, w_players2 = get_winner_info(qf4)
        sf2['team2_name'] = w_name2
        sf2['team2_players'] = w_players2

    # Update Grand Final
    if fgold:
        w_name, w_players = get_winner_info(sf1)
        fgold['team1_name'] = w_name
        fgold['team1_players'] = w_players
        w_name2, w_players2 = get_winner_info(sf2)
        fgold['team2_name'] = w_name2
        fgold['team2_players'] = w_players2

    return playoff_matches_map

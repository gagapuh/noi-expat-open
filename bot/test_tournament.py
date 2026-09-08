"""
Automated Simulation and Verification Test for Tournament Logic.
Simulates a full 32-player tournament from registration, draw, 48 Americano matches,
playoff seeding (W_k + R_(9-k)), quarterfinals, semifinals, and grand final!
"""

import sys
import os

# Add parent directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from tournament_logic import (
    generate_draw,
    generate_group_matches,
    calculate_group_standings,
    rank_group_winners_and_runners,
    form_playoff_teams,
    generate_playoffs_matches,
    evaluate_playoff_sets,
    advance_playoff_bracket,
    GROUPS
)


def run_full_simulation_test():
    print("=== 1. GENERATING 32 PLAYERS ===")
    players = []
    for i in range(1, 33):
        players.append({
            'id': i,
            'slot_number': i,
            'name': f"Player {i:02d}",
            'dupr_id': f"D{1000 + i}",
            'dupr_rating': 2.5 + (i % 10) * 0.1,
            'group_name': None
        })
    assert len(players) == 32, f"Expected 32 players, got {len(players)}"
    print(f"✓ Created {len(players)} players.")

    print("\n=== 2. EXECUTING DRAW (FISHER-YATES) ===")
    groups_map = generate_draw(players)
    assert len(groups_map) == 8, f"Expected 8 groups, got {len(groups_map)}"
    total_grouped_players = sum(len(p_list) for p_list in groups_map.values())
    assert total_grouped_players == 32, f"Expected 32 grouped players, got {total_grouped_players}"
    for g, p_list in groups_map.items():
        assert len(p_list) == 4, f"{g} must have 4 players, got {len(p_list)}"
        print(f"  {g}: {', '.join(p['name'] for p in p_list)}")
    print("✓ Draw verified!")

    print("\n=== 3. GENERATING 48 AMERICANO MATCHES ===")
    matches = generate_group_matches(groups_map)
    assert len(matches) == 48, f"Expected 48 group matches, got {len(matches)}"
    print(f"✓ Created {len(matches)} group matches (6 per group).")

    print("\n=== 4. SIMULATING MATCH SCORES (11-point games) ===")
    import random
    random.seed(42) # Deterministic simulation

    for m in matches:
        s1 = 11
        s2 = random.randint(3, 9)
        if random.random() > 0.5:
            s1, s2 = s2, s1
        m['score1'] = s1
        m['score2'] = s2
        m['is_completed'] = True

    print("✓ All 48 matches simulated.")

    print("\n=== 5. CALCULATING STANDINGS PER GROUP ===")
    all_standings = {}
    for g in GROUPS:
        g_matches = [m for m in matches if m['group_name'] == g]
        g_players = groups_map[g]
        standings = calculate_group_standings(g_players, g_matches)
        assert len(standings) == 4, f"Expected 4 standings entries for {g}"
        assert standings[0]['rank'] == 1 and standings[0]['qualified'] is True
        assert standings[1]['rank'] == 2 and standings[1]['qualified'] is True
        assert standings[2]['rank'] == 3 and standings[2]['qualified'] is False
        assert standings[3]['rank'] == 4 and standings[3]['qualified'] is False
        all_standings[g] = standings
        print(f"  {g} Winner: {standings[0]['name']} ({standings[0]['wins']}W, {standings[0]['diff']:+d} diff) | Runner-up: {standings[1]['name']} ({standings[1]['wins']}W, {standings[1]['diff']:+d} diff)")
    print("✓ Group standings calculation verified!")

    print("\n=== 6. RANKING 8 WINNERS & 8 RUNNERS-UP ===")
    winners, runners = rank_group_winners_and_runners(all_standings)
    assert len(winners) == 8, f"Expected 8 winners, got {len(winners)}"
    assert len(runners) == 8, f"Expected 8 runners, got {len(runners)}"
    print("  Ranked Winners: " + ", ".join(f"{w['seed_code']}: {w['name']} ({w['wins']}W)" for w in winners))
    print("  Ranked Runners: " + ", ".join(f"{r['seed_code']}: {r['name']} ({r['wins']}W)" for r in runners))
    print("✓ Merit ranking verified!")

    print("\n=== 7. FORMING 8 BALANCED PLAYOFF TEAMS (W_k + R_(9-k)) ===")
    teams = form_playoff_teams(winners, runners)
    assert len(teams) == 8, f"Expected 8 teams, got {len(teams)}"
    for t in teams:
        print(f"  {t['name']} ({t['formula']}): {t['duo']}")
    # Verify pairing formula:
    # Team 1: W1 + R8
    # Team 8: W8 + R1
    assert teams[0]['formula'] == 'W1 + R8'
    assert teams[7]['formula'] == 'W8 + R1'
    print("✓ Balanced team pairing verified!")

    print("\n=== 8. GENERATING PLAYOFF MATCHES ===")
    po_matches = generate_playoffs_matches(teams)
    po_map = {m['id']: m for m in po_matches}
    assert len(po_matches) == 7, f"Expected 7 playoff matches (4 QF, 2 SF, 1 Final), got {len(po_matches)}"
    print("  Quarterfinals:")
    for qf_id in ['QF-1', 'QF-2', 'QF-3', 'QF-4']:
        m = po_map[qf_id]
        print(f"    {m['id']} ({m['court_id']}): {m['team1_name']} VS {m['team2_name']}")
    print("✓ Playoff generation verified!")

    print("\n=== 9. SIMULATING QUARTERFINALS (BO3) ===")
    for qf_id in ['QF-1', 'QF-2', 'QF-3', 'QF-4']:
        m = po_map[qf_id]
        sets = [{'s1': 11, 's2': 7}, {'s1': 11, 's2': 9}] # Team 1 wins 2-0
        winner_team, score_str, is_comp = evaluate_playoff_sets(m['round_type'], sets)
        m['sets'] = sets
        m['score'] = score_str
        m['winner_team'] = winner_team
        m['is_completed'] = is_comp

    advance_playoff_bracket(po_map)
    print("  Updated Semifinals after QF:")
    print(f"    SF-1: {po_map['SF-1']['team1_name']} VS {po_map['SF-1']['team2_name']}")
    print(f"    SF-2: {po_map['SF-2']['team1_name']} VS {po_map['SF-2']['team2_name']}")
    assert "Winner QF" not in po_map['SF-1']['team1_name'], "SF1 Team 1 should be resolved"
    assert "Winner QF" not in po_map['SF-1']['team2_name'], "SF1 Team 2 should be resolved"
    print("✓ Quarterfinals progression verified!")

    print("\n=== 10. SIMULATING SEMIFINALS (BO3) ===")
    for sf_id in ['SF-1', 'SF-2']:
        m = po_map[sf_id]
        sets = [{'s1': 8, 's2': 11}, {'s1': 11, 's2': 5}, {'s1': 11, 's2': 8}] # Team 1 wins 2-1
        winner_team, score_str, is_comp = evaluate_playoff_sets(m['round_type'], sets)
        m['sets'] = sets
        m['score'] = score_str
        m['winner_team'] = winner_team
        m['is_completed'] = is_comp

    advance_playoff_bracket(po_map)
    print("  Updated Grand Final after SF:")
    print(f"    F-GOLD: {po_map['F-GOLD']['team1_name']} VS {po_map['F-GOLD']['team2_name']}")
    assert "Winner SF" not in po_map['F-GOLD']['team1_name'], "Final Team 1 should be resolved"
    assert "Winner SF" not in po_map['F-GOLD']['team2_name'], "Final Team 2 should be resolved"
    print("✓ Semifinals progression verified!")

    print("\n=== 11. SIMULATING GRAND FINAL (BO5) ===")
    gf = po_map['F-GOLD']
    gf_sets = [
        {'s1': 11, 's2': 6},
        {'s1': 9, 's2': 11},
        {'s1': 11, 's2': 8},
        {'s1': 11, 's2': 7}
    ] # Team 1 wins 3-1
    winner_team, score_str, is_comp = evaluate_playoff_sets(gf['round_type'], gf_sets)
    gf['sets'] = gf_sets
    gf['score'] = score_str
    gf['winner_team'] = winner_team
    gf['is_completed'] = is_comp

    assert gf['is_completed'] is True
    assert gf['winner_team'] == 1
    champion = gf['team1_name']
    runner_up = gf['team2_name']
    print(f"  🥇 TOURNAMENT CHAMPIONS: {champion}")
    print(f"  🥈 RUNNERS-UP: {runner_up}")
    print(f"  Score: {gf['score']}")
    print("\n🎉 ALL 11 VERIFICATION STAGES PASSED FLAWLESSLY!")


if __name__ == '__main__':
    run_full_simulation_test()

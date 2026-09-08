-- ==============================================================================
-- NOI EXPAT OPEN — SUPABASE POSTGRESQL SCHEMA
-- Tournament Management & Live Scoring Database
-- ==============================================================================

-- 1. EXTENSIONS
create extension if not exists "pgcrypto";

-- 2. TABLE: tournaments
create table if not exists public.tournaments (
    id text primary key,
    title text not null,
    stage text not null default 'registration' check (stage in ('registration', 'groups', 'playoffs', 'completed')),
    is_draw_completed boolean not null default false,
    settings jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 3. TABLE: players
create table if not exists public.players (
    id serial primary key,
    tournament_id text not null references public.tournaments(id) on delete cascade,
    slot_number int not null default 0,
    name text not null,
    dupr_id text default '',
    dupr_rating numeric(4,2) default null,
    group_name text default null, -- 'Group A' ... 'Group H'
    seed_rank int default null,
    registered_at timestamptz not null default now()
);

-- 4. TABLE: group_matches
create table if not exists public.group_matches (
    id uuid primary key default gen_random_uuid(),
    tournament_id text not null references public.tournaments(id) on delete cascade,
    group_name text not null, -- 'Group A' ... 'Group H'
    round_number int not null check (round_number between 1 and 6),
    court_id text not null, -- 'c1', 'c2', 'c3', 'c4'
    pair1_names text[] not null,
    pair2_names text[] not null,
    score1 int default null,
    score2 int default null,
    is_completed boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 5. TABLE: playoff_matches
create table if not exists public.playoff_matches (
    id text primary key, -- 'QF-1', 'QF-2', 'QF-3', 'QF-4', 'SF-1', 'SF-2', 'F-GOLD'
    tournament_id text not null references public.tournaments(id) on delete cascade,
    round_type text not null check (round_type in ('quarterfinal', 'semifinal', 'final')),
    court_id text not null,
    name text not null,
    team1_name text not null,
    team2_name text not null,
    team1_seed text default '',
    team2_seed text default '',
    team1_players text[] default '{}'::text[],
    team2_players text[] default '{}'::text[],
    sets jsonb not null default '[]'::jsonb,
    score text not null default '—',
    winner_team int default null check (winner_team in (1, 2) or winner_team is null),
    is_completed boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 6. INDEXES
create index if not exists idx_players_tournament on public.players(tournament_id);
create index if not exists idx_players_group on public.players(group_name);
create index if not exists idx_group_matches_tournament on public.group_matches(tournament_id);
create index if not exists idx_group_matches_group on public.group_matches(group_name);
create index if not exists idx_group_matches_court on public.group_matches(court_id);
create index if not exists idx_group_matches_completed on public.group_matches(is_completed);
create index if not exists idx_playoff_matches_tournament on public.playoff_matches(tournament_id);

-- 7. ROW LEVEL SECURITY (RLS)
alter table public.tournaments enable row level security;
alter table public.players enable row level security;
alter table public.group_matches enable row level security;
alter table public.playoff_matches enable row level security;

-- Public read policies (anyone can read tournament data on website)
drop policy if exists "Allow public read tournaments" on public.tournaments;
create policy "Allow public read tournaments" on public.tournaments for select using (true);

drop policy if exists "Allow public read players" on public.players;
create policy "Allow public read players" on public.players for select using (true);

drop policy if exists "Allow public read group_matches" on public.group_matches;
create policy "Allow public read group_matches" on public.group_matches for select using (true);

drop policy if exists "Allow public read playoff_matches" on public.playoff_matches;
create policy "Allow public read playoff_matches" on public.playoff_matches for select using (true);

-- Service role & authenticated write policies (Bot uses service_role key)
drop policy if exists "Allow service role all tournaments" on public.tournaments;
create policy "Allow service role all tournaments" on public.tournaments for all using (true) with check (true);

drop policy if exists "Allow service role all players" on public.players;
create policy "Allow service role all players" on public.players for all using (true) with check (true);

drop policy if exists "Allow service role all group_matches" on public.group_matches;
create policy "Allow service role all group_matches" on public.group_matches for all using (true) with check (true);

drop policy if exists "Allow service role all playoff_matches" on public.playoff_matches;
create policy "Allow service role all playoff_matches" on public.playoff_matches for all using (true) with check (true);

-- 8. REALTIME REPLICATION CONFIGURATION
-- Ensure the tables are published to supabase_realtime
do $$
begin
  begin
    alter publication supabase_realtime add table public.tournaments;
  exception when others then null;
  end;

  begin
    alter publication supabase_realtime add table public.players;
  exception when others then null;
  end;

  begin
    alter publication supabase_realtime add table public.group_matches;
  exception when others then null;
  end;

  begin
    alter publication supabase_realtime add table public.playoff_matches;
  exception when others then null;
  end;
end $$;

-- 9. INITIAL SEED DATA
-- Insert tournament entry if it doesn't already exist
insert into public.tournaments (id, title, stage, is_draw_completed, settings)
values (
    'picklehead-individual-doubles',
    'Picklehead Main Stage: Individual Doubles (2.5–3.0)',
    'registration',
    false,
    '{"format": "Americano", "courts": ["c1", "c2", "c3", "c4"], "pointsPerGame": 11}'::jsonb
)
on conflict (id) do nothing;

-- Insert 32 initial player slots if players table is empty for this tournament
do $$
declare
    i int;
begin
    if not exists (select 1 from public.players where tournament_id = 'picklehead-individual-doubles') then
        for i in 1..32 loop
            insert into public.players (tournament_id, slot_number, name, dupr_id, dupr_rating, group_name)
            values ('picklehead-individual-doubles', i, 'Player ' || i, '', null, null);
        end loop;
    end if;
end $$;

-- Insert initial playoff matches placeholders
insert into public.playoff_matches (id, tournament_id, round_type, court_id, name, team1_name, team2_name, team1_seed, team2_seed, sets, score, winner_team, is_completed)
values
  ('QF-1', 'picklehead-individual-doubles', 'quarterfinal', 'c1', 'Quarterfinal 1', 'Team 1 (W1 + R8)', 'Team 8 (W8 + R1)', 'W1 + R8', 'W8 + R1', '[]'::jsonb, '—', null, false),
  ('QF-2', 'picklehead-individual-doubles', 'quarterfinal', 'c2', 'Quarterfinal 2', 'Team 4 (W4 + R5)', 'Team 5 (W5 + R4)', 'W4 + R5', 'W5 + R4', '[]'::jsonb, '—', null, false),
  ('QF-3', 'picklehead-individual-doubles', 'quarterfinal', 'c3', 'Quarterfinal 3', 'Team 2 (W2 + R7)', 'Team 7 (W7 + R2)', 'W2 + R7', 'W7 + R2', '[]'::jsonb, '—', null, false),
  ('QF-4', 'picklehead-individual-doubles', 'quarterfinal', 'c4', 'Quarterfinal 4', 'Team 3 (W3 + R6)', 'Team 6 (W6 + R3)', 'W3 + R6', 'W6 + R3', '[]'::jsonb, '—', null, false),
  ('SF-1', 'picklehead-individual-doubles', 'semifinal', 'c1', 'Championship Semifinal 1', 'Winner QF1', 'Winner QF2', 'Winner QF1', 'Winner QF2', '[]'::jsonb, '—', null, false),
  ('SF-2', 'picklehead-individual-doubles', 'semifinal', 'c2', 'Championship Semifinal 2', 'Winner QF3', 'Winner QF4', 'Winner QF3', 'Winner QF4', '[]'::jsonb, '—', null, false),
  ('F-GOLD', 'picklehead-individual-doubles', 'final', 'c1', '🥇 Grand Championship Final', 'Winner SF1', 'Winner SF2', 'Winner SF1', 'Winner SF2', '[]'::jsonb, '—', null, false)
on conflict (id) do nothing;

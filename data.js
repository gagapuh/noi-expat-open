/**
 * ==============================================================================
 * NOI EXPAT OPEN — TOURNAMENT SCHEDULE DATA
 * ==============================================================================
 */

const TOURNAMENT_CONFIG = {
  title: "NOI EXPAT OPEN",
  location: "Noi Sports Arena & Pickleball Club",
  timeRange: {
    startHour: 9,   // Timeline start: 09:00 AM (9:00)
    endHour: 22,    // Timeline end: 22:00 (10:00 PM)
    stepMinutes: 30 // 30-minute cell intervals
  },
  categories: {
    tournament: {
      id: "tournament",
      name: "Tournament Play",
      short: "Tournament",
      badge: "bg-blue-100 text-blue-800 border border-blue-200",
      cardBg: "from-blue-100 via-blue-50 to-white",
      cardBorder: "border-blue-200 hover:border-blue-300",
      cardBorderDashed: "border-blue-300/60",
      accent: "#2563eb",
      icon: "trophy"
    },
    round_robin: {
      id: "round_robin",
      name: "Round Robin",
      short: "Round Robin",
      badge: "bg-violet-100 text-violet-800 border border-violet-200",
      cardBg: "from-violet-100 via-violet-50 to-white",
      cardBorder: "border-violet-200 hover:border-violet-300",
      cardBorderDashed: "border-violet-300/60",
      accent: "#7c3aed",
      icon: "rotate-cw"
    },
    social: {
      id: "social",
      name: "Social Play",
      short: "Social",
      badge: "bg-teal-100 text-teal-800 border border-teal-200",
      cardBg: "from-teal-100 via-teal-50 to-white",
      cardBorder: "border-teal-200 hover:border-teal-300",
      cardBorderDashed: "border-teal-300/60",
      accent: "#0d9488",
      icon: "party-popper"
    },
    free: {
      id: "free",
      name: "Free Court",
      short: "Free Court",
      badge: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      cardBg: "from-emerald-100 via-emerald-50 to-white",
      cardBorder: "border-emerald-200 border-dashed hover:border-emerald-300",
      cardBorderDashed: "border-emerald-300/60",
      accent: "#059669",
      icon: "sparkles"
    },
    finals: {
      id: "finals",
      name: "Finals & Medals",
      short: "Finals",
      badge: "bg-amber-100 text-amber-900 border border-amber-300 font-extrabold",
      cardBg: "from-amber-100 via-amber-50 to-white",
      cardBorder: "border-amber-300 hover:border-amber-400",
      cardBorderDashed: "border-amber-300/60",
      accent: "#d97706",
      icon: "award"
    },
    clinic: {
      id: "clinic",
      name: "Clinic / Workshop",
      short: "Clinic",
      badge: "bg-purple-100 text-purple-800 border border-purple-200",
      cardBg: "from-purple-100 via-purple-50 to-white",
      cardBorder: "border-purple-200 hover:border-purple-300",
      cardBorderDashed: "border-purple-300/60",
      accent: "#7c3aed",
      icon: "zap"
    },
    event: {
      id: "event",
      name: "Ceremony / Briefing",
      short: "Ceremony",
      badge: "bg-sky-100 text-sky-800 border border-sky-200",
      cardBg: "from-sky-100 via-sky-50 to-white",
      cardBorder: "border-sky-200 hover:border-sky-300",
      cardBorderDashed: "border-sky-300/60",
      accent: "#0891b2",
      icon: "megaphone"
    },
    break: {
      id: "break",
      name: "Break / Lunch",
      short: "Break",
      badge: "bg-stone-200 text-stone-600 border border-stone-300",
      cardBg: "from-stone-100 via-stone-50 to-white",
      cardBorder: "border-stone-200 hover:border-stone-300",
      cardBorderDashed: "border-stone-200/60",
      accent: "#78716c",
      icon: "coffee"
    }
  },
  courts: [
    { id: "c1", name: "Court 1" },
    { id: "c2", name: "Court 2" },
    { id: "c3", name: "Court 3" },
    { id: "c4", name: "Court 4" }
  ],
  days: [
    {
      id: "day1",
      name: "Day 1",
      title: "Day 1 — Saturday, Oct 3",
      dateFormatted: "Saturday, Oct 3",
      schedule: [
        // 11:30 - 15:30 Mixed Doubles: Max 5.2 Cap (Courts 1, 2, 3, 4)
        {
          id: "d1-c1-mixed-52",
          courtId: "c1",
          start: "11:30",
          end: "15:30",
          title: "Mixed Doubles: Max 5.2 Cap",
          host: "TBA",
          logo: "placeholder.svg",
          reclubUrl: "",
          category: "tournament",
          status: "planned"
        },
        {
          id: "d1-c2-mixed-52",
          courtId: "c2",
          start: "11:30",
          end: "15:30",
          title: "Mixed Doubles: Max 5.2 Cap",
          host: "TBA",
          logo: "placeholder.svg",
          reclubUrl: "",
          category: "tournament",
          status: "planned"
        },
        {
          id: "d1-c3-mixed-52",
          courtId: "c3",
          start: "11:30",
          end: "15:30",
          title: "Mixed Doubles: Max 5.2 Cap",
          host: "TBA",
          logo: "placeholder.svg",
          reclubUrl: "",
          category: "tournament",
          status: "planned"
        },
        {
          id: "d1-c4-mixed-52",
          courtId: "c4",
          start: "11:30",
          end: "15:30",
          title: "Mixed Doubles: Max 5.2 Cap",
          host: "TBA",
          logo: "placeholder.svg",
          reclubUrl: "",
          category: "tournament",
          status: "planned"
        },
        // 19:00 - 22:00 Noi Sunset Social (Courts 1, 2, 3, 4)
        {
          id: "d1-c1-sunset-social",
          courtId: "c1",
          start: "19:00",
          end: "22:00",
          title: "Noi Sunset Social",
          host: "TBA",
          logo: "002.svg",
          reclubUrl: "",
          category: "social",
          status: "occupied"
        },
        {
          id: "d1-c2-sunset-social",
          courtId: "c2",
          start: "19:00",
          end: "22:00",
          title: "Noi Sunset Social",
          host: "TBA",
          logo: "002.svg",
          reclubUrl: "",
          category: "social",
          status: "occupied"
        },
        {
          id: "d1-c3-sunset-social",
          courtId: "c3",
          start: "19:00",
          end: "22:00",
          title: "Noi Sunset Social",
          host: "TBA",
          logo: "placeholder.svg",
          reclubUrl: "",
          category: "social",
          status: "planned"
        },
        {
          id: "d1-c4-sunset-social",
          courtId: "c4",
          start: "19:00",
          end: "22:00",
          title: "Noi Sunset Social",
          host: "TBA",
          logo: "placeholder.svg",
          reclubUrl: "",
          category: "social",
          status: "planned"
        }
      ]
    },
    {
      id: "day2",
      name: "Day 2",
      title: "Day 2 — Sunday, Oct 4",
      dateFormatted: "Sunday, Oct 4",
      schedule: [
        // 11:00 - 16:00 Picklehead Cup (Courts 1, 2, 3, 4)
        {
          id: "d2-c1-picklehead",
          courtId: "c1",
          start: "11:00",
          end: "16:00",
          title: "Picklehead Main Stage: Individual Doubles (2.5–3.0)",
          host: "Ho",
          bracketId: "picklehead-individual-doubles",
          logo: "picklehead.webp",
          reclubUrl: "",
          category: "tournament",
          status: "occupied"
        },
        {
          id: "d2-c2-picklehead",
          courtId: "c2",
          start: "11:00",
          end: "16:00",
          title: "Picklehead Main Stage: Individual Doubles (2.5–3.0)",
          host: "Ho",
          bracketId: "picklehead-individual-doubles",
          logo: "picklehead.webp",
          reclubUrl: "",
          category: "tournament",
          status: "occupied"
        },
        {
          id: "d2-c3-picklehead",
          courtId: "c3",
          start: "11:00",
          end: "16:00",
          title: "Picklehead Main Stage: Individual Doubles (2.5–3.0)",
          host: "Ho",
          bracketId: "picklehead-individual-doubles",
          logo: "picklehead.webp",
          reclubUrl: "",
          category: "tournament",
          status: "occupied"
        },
        {
          id: "d2-c4-picklehead",
          courtId: "c4",
          start: "11:00",
          end: "16:00",
          title: "Picklehead Main Stage: Individual Doubles (2.5–3.0)",
          host: "Ho",
          bracketId: "picklehead-individual-doubles",
          logo: "picklehead.webp",
          reclubUrl: "",
          category: "tournament",
          status: "occupied"
        },

        // 16:00 - 19:00 DUPR 3.5-4.0 (Courts 1, 2)
        {
          id: "d2-c1-dupr",
          courtId: "c1",
          start: "16:00",
          end: "19:00",
          title: "DUPR Prime Division (3.5–4.0)",
          host: "TBA",
          logo: "picklehead.webp",
          reclubUrl: "",
          category: "round_robin",
          status: "occupied"
        },
        {
          id: "d2-c2-dupr",
          courtId: "c2",
          start: "16:00",
          end: "19:00",
          title: "DUPR Prime Division (3.5–4.0)",
          host: "TBA",
          logo: "picklehead.webp",
          reclubUrl: "",
          category: "round_robin",
          status: "occupied"
        },

        // 19:00 - 22:00 The Grand Kitchen Party (Social)
        {
          id: "d2-c1-kitchen",
          courtId: "c1",
          start: "19:00",
          end: "22:00",
          title: "The Grand Kitchen Party",
          host: "TBA",
          logo: "002.svg",
          reclubUrl: "",
          category: "social",
          status: "occupied"
        },
        {
          id: "d2-c2-kitchen",
          courtId: "c2",
          start: "19:00",
          end: "22:00",
          title: "The Grand Kitchen Party",
          host: "TBA",
          logo: "002.svg",
          reclubUrl: "",
          category: "social",
          status: "occupied"
        },
        {
          id: "d2-c4-kitchen",
          courtId: "c4",
          start: "19:00",
          end: "22:00",
          title: "The Grand Kitchen Party",
          host: "TBA",
          logo: "picklehead.webp",
          reclubUrl: "",
          category: "social",
          status: "occupied"
        },
        {
          id: "d2-c3-kitchen",
          courtId: "c3",
          start: "19:00",
          end: "22:00",
          title: "The Grand Kitchen Party",
          host: "TBA",
          logo: "placeholder.svg",
          reclubUrl: "",
          category: "social",
          status: "planned"
        }
      ]
    }
  ]
};

/**
 * ==============================================================================
 * TOURNAMENT BRACKETS & DRAW DATA
 * Americano / Individual Doubles format (32 players · 8 pools · Top 2 advance)
 * ==============================================================================
 */
const TOURNAMENT_BRACKETS = {
  "picklehead-individual-doubles": {
    id: "picklehead-individual-doubles",
    title: "Picklehead Main Stage: Individual Doubles (2.5–3.0)",
    shortTitle: "Picklehead Individual Doubles",
    host: "Ho",
    day: "Day 2 — Sunday, Oct 4",
    time: "11:00 – 16:00",
    courts: "Courts 1, 2, 3, 4",
    format: "Americano Groups → Balanced Duo Playoffs (BO3 / BO5)",
    playersCount: 32,
    groupsCount: 8,
    advanceCount: 2,
    totalTeams: 8,
    description: "32 players start in 8 Americano groups (Groups A to H). The top 2 from each group advance and pair up into 8 balanced playoff teams (Group Winner #1 + Sister Group Runner-up #2). Teams then battle through Best-of-3 Quarterfinals, Semifinals, and an epic Best-of-5 Grand Championship Final!",
    pairingFormula: "Balanced Duo: Group #1 Winner + Sister Group #2 Runner-up",
    teams: [
      { id: "team-1", name: "Team 1", duo: "Player 1 & Player 5", p1: "Player 1", p1Origin: "Group A #1", p2: "Player 5", p2Origin: "Group B #2", desc: "Group A Winner + Group B Runner-up" },
      { id: "team-2", name: "Team 2", duo: "Player 6 & Player 2", p1: "Player 6", p1Origin: "Group B #1", p2: "Player 2", p2Origin: "Group A #2", desc: "Group B Winner + Group A Runner-up" },
      { id: "team-3", name: "Team 3", duo: "Player 9 & Player 14", p1: "Player 9", p1Origin: "Group C #1", p2: "Player 14", p2Origin: "Group D #2", desc: "Group C Winner + Group D Runner-up" },
      { id: "team-4", name: "Team 4", duo: "Player 13 & Player 10", p1: "Player 13", p1Origin: "Group D #1", p2: "Player 10", p2Origin: "Group C #2", desc: "Group D Winner + Group C Runner-up" },
      { id: "team-5", name: "Team 5", duo: "Player 18 & Player 22", p1: "Player 18", p1Origin: "Group E #1", p2: "Player 22", p2Origin: "Group F #2", desc: "Group E Winner + Group F Runner-up" },
      { id: "team-6", name: "Team 6", duo: "Player 21 & Player 17", p1: "Player 21", p1Origin: "Group F #1", p2: "Player 17", p2Origin: "Group E #2", desc: "Group F Winner + Group E Runner-up" },
      { id: "team-7", name: "Team 7", duo: "Player 25 & Player 30", p1: "Player 25", p1Origin: "Group G #1", p2: "Player 30", p2Origin: "Group H #2", desc: "Group G Winner + Group H Runner-up" },
      { id: "team-8", name: "Team 8", duo: "Player 29 & Player 26", p1: "Player 29", p1Origin: "Group H #1", p2: "Player 26", p2Origin: "Group G #2", desc: "Group H Winner + Group G Runner-up" }
    ],
    rules: [
      { title: "Stage 1: Americano Groups (32 Players · 8 Groups)", desc: "Groups A to H (4 players each). Every player plays 3 matches rotating partners ('each with each'). Matches played to 11 points. Top 2 players advance to playoffs." },
      { title: "Balanced Team Formation (#1 + #2)", desc: "To create equally balanced teams, each Group #1 Winner is paired with the #2 Runner-up from a sister group (A#1+B#2, B#1+A#2, etc.). Each team features one leader and one runner-up!" },
      { title: "Quarterfinals: Best of 3 (BO3)", desc: "All 8 teams play simultaneously on Courts 1–4. Matches are Best of 3 sets to 11 (win by 2). Winners advance to Championship Semifinals; losers to 5th–8th Semifinals." },
      { title: "Semifinals: Best of 3 (BO3)", desc: "Courts 1 & 2 host Championship SF1 & SF2. Courts 3 & 4 host 5th–8th Place Semifinals so every team continues competing." },
      { title: "Grand Final: Best of 5 (BO5) 🥇", desc: "The ultimate championship decider on Court 1! First to win 3 sets to 11 is crowned NOI EXPAT OPEN Champion." },
      { title: "Placement & Medal Matches (BO3)", desc: "Bronze Medal Match 🥉 on Court 2, 5th Place Final on Court 3, and 7th Place Final on Court 4 (all Best-of-3)." }
    ],
    groups: [
      {
        id: "group-a",
        name: "Group A",
        court: "Court 1",
        players: ["Player 1", "Player 2", "Player 3", "Player 4"],
        matches: [
          { round: "Round 1", pair1: "Player 1 & Player 2", pair2: "Player 3 & Player 4", score: "11 — 7", winner: 1 },
          { round: "Round 2", pair1: "Player 1 & Player 3", pair2: "Player 2 & Player 4", score: "11 — 9", winner: 1 },
          { round: "Round 3", pair1: "Player 1 & Player 4", pair2: "Player 2 & Player 3", score: "11 — 8", winner: 1 }
        ],
        standings: [
          { rank: 1, name: "Player 1", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Team 1 (with Group B #2)" },
          { rank: 2, name: "Player 2", played: 3, wins: 2, losses: 1, diff: "+3", points: 27, qualified: true, advanceTo: "Team 2 (with Group B #1)" },
          { rank: 3, name: "Player 3", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, qualified: false, advanceTo: "Consolation" },
          { rank: 4, name: "Player 4", played: 3, wins: 0, losses: 3, diff: "-8", points: 20, qualified: false, advanceTo: "Consolation" }
        ]
      },
      {
        id: "group-b",
        name: "Group B",
        court: "Court 2",
        players: ["Player 5", "Player 6", "Player 7", "Player 8"],
        matches: [
          { round: "Round 1", pair1: "Player 5 & Player 6", pair2: "Player 7 & Player 8", score: "11 — 8", winner: 1 },
          { round: "Round 2", pair1: "Player 5 & Player 7", pair2: "Player 6 & Player 8", score: "11 — 10", winner: 1 },
          { round: "Round 3", pair1: "Player 5 & Player 8", pair2: "Player 6 & Player 7", score: "8 — 11", winner: 2 }
        ],
        standings: [
          { rank: 1, name: "Player 6", played: 3, wins: 2, losses: 1, diff: "+5", points: 29, qualified: true, advanceTo: "Team 2 (with Group A #2)" },
          { rank: 2, name: "Player 5", played: 3, wins: 2, losses: 1, diff: "+2", points: 28, qualified: true, advanceTo: "Team 1 (with Group A #1)" },
          { rank: 3, name: "Player 7", played: 3, wins: 1, losses: 2, diff: "-2", points: 26, qualified: false, advanceTo: "Consolation" },
          { rank: 4, name: "Player 8", played: 3, wins: 1, losses: 2, diff: "-5", points: 23, qualified: false, advanceTo: "Consolation" }
        ]
      },
      {
        id: "group-c",
        name: "Group C",
        court: "Court 3",
        players: ["Player 9", "Player 10", "Player 11", "Player 12"],
        matches: [
          { round: "Round 1", pair1: "Player 9 & Player 10", pair2: "Player 11 & Player 12", score: "11 — 6", winner: 1 },
          { round: "Round 2", pair1: "Player 9 & Player 11", pair2: "Player 10 & Player 12", score: "11 — 7", winner: 1 },
          { round: "Round 3", pair1: "Player 9 & Player 12", pair2: "Player 10 & Player 11", score: "11 — 9", winner: 1 }
        ],
        standings: [
          { rank: 1, name: "Player 9", played: 3, wins: 3, losses: 0, diff: "+11", points: 33, qualified: true, advanceTo: "Team 3 (with Group D #2)" },
          { rank: 2, name: "Player 10", played: 3, wins: 2, losses: 1, diff: "+3", points: 29, qualified: true, advanceTo: "Team 4 (with Group D #1)" },
          { rank: 3, name: "Player 11", played: 3, wins: 1, losses: 2, diff: "-6", points: 22, qualified: false, advanceTo: "Consolation" },
          { rank: 4, name: "Player 12", played: 3, wins: 0, losses: 3, diff: "-8", points: 22, qualified: false, advanceTo: "Consolation" }
        ]
      },
      {
        id: "group-d",
        name: "Group D",
        court: "Court 4",
        players: ["Player 13", "Player 14", "Player 15", "Player 16"],
        matches: [
          { round: "Round 1", pair1: "Player 13 & Player 14", pair2: "Player 15 & Player 16", score: "11 — 9", winner: 1 },
          { round: "Round 2", pair1: "Player 13 & Player 15", pair2: "Player 14 & Player 16", score: "11 — 8", winner: 1 },
          { round: "Round 3", pair1: "Player 13 & Player 16", pair2: "Player 14 & Player 15", score: "11 — 7", winner: 1 }
        ],
        standings: [
          { rank: 1, name: "Player 13", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Team 4 (with Group C #2)" },
          { rank: 2, name: "Player 14", played: 3, wins: 2, losses: 1, diff: "+2", points: 27, qualified: true, advanceTo: "Team 3 (with Group C #1)" },
          { rank: 3, name: "Player 15", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, qualified: false, advanceTo: "Consolation" },
          { rank: 4, name: "Player 16", played: 3, wins: 0, losses: 3, diff: "-7", points: 24, qualified: false, advanceTo: "Consolation" }
        ]
      },
      {
        id: "group-e",
        name: "Group E",
        court: "Court 1",
        players: ["Player 17", "Player 18", "Player 19", "Player 20"],
        matches: [
          { round: "Round 1", pair1: "Player 17 & Player 18", pair2: "Player 19 & Player 20", score: "11 — 5", winner: 1 },
          { round: "Round 2", pair1: "Player 17 & Player 19", pair2: "Player 18 & Player 20", score: "11 — 8", winner: 1 },
          { round: "Round 3", pair1: "Player 17 & Player 20", pair2: "Player 18 & Player 19", score: "8 — 11", winner: 2 }
        ],
        standings: [
          { rank: 1, name: "Player 18", played: 3, wins: 2, losses: 1, diff: "+6", points: 30, qualified: true, advanceTo: "Team 5 (with Group F #2)" },
          { rank: 2, name: "Player 17", played: 3, wins: 2, losses: 1, diff: "+6", points: 30, qualified: true, advanceTo: "Team 6 (with Group F #1)" },
          { rank: 3, name: "Player 19", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, qualified: false, advanceTo: "Consolation" },
          { rank: 4, name: "Player 20", played: 3, wins: 1, losses: 2, diff: "-8", points: 21, qualified: false, advanceTo: "Consolation" }
        ]
      },
      {
        id: "group-f",
        name: "Group F",
        court: "Court 2",
        players: ["Player 21", "Player 22", "Player 23", "Player 24"],
        matches: [
          { round: "Round 1", pair1: "Player 21 & Player 22", pair2: "Player 23 & Player 24", score: "11 — 7", winner: 1 },
          { round: "Round 2", pair1: "Player 21 & Player 23", pair2: "Player 22 & Player 24", score: "11 — 9", winner: 1 },
          { round: "Round 3", pair1: "Player 21 & Player 24", pair2: "Player 22 & Player 23", score: "11 — 8", winner: 1 }
        ],
        standings: [
          { rank: 1, name: "Player 21", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Team 6 (with Group E #2)" },
          { rank: 2, name: "Player 22", played: 3, wins: 2, losses: 1, diff: "+3", points: 28, qualified: true, advanceTo: "Team 5 (with Group E #1)" },
          { rank: 3, name: "Player 23", played: 3, wins: 1, losses: 2, diff: "-5", points: 24, qualified: false, advanceTo: "Consolation" },
          { rank: 4, name: "Player 24", played: 3, wins: 0, losses: 3, diff: "-7", points: 24, qualified: false, advanceTo: "Consolation" }
        ]
      },
      {
        id: "group-g",
        name: "Group G",
        court: "Court 3",
        players: ["Player 25", "Player 26", "Player 27", "Player 28"],
        matches: [
          { round: "Round 1", pair1: "Player 25 & Player 26", pair2: "Player 27 & Player 28", score: "11 — 6", winner: 1 },
          { round: "Round 2", pair1: "Player 25 & Player 27", pair2: "Player 26 & Player 28", score: "11 — 8", winner: 1 },
          { round: "Round 3", pair1: "Player 25 & Player 28", pair2: "Player 26 & Player 27", score: "11 — 10", winner: 1 }
        ],
        standings: [
          { rank: 1, name: "Player 25", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Team 7 (with Group H #2)" },
          { rank: 2, name: "Player 26", played: 3, wins: 2, losses: 1, diff: "+4", points: 28, qualified: true, advanceTo: "Team 8 (with Group H #1)" },
          { rank: 3, name: "Player 27", played: 3, wins: 1, losses: 2, diff: "-5", points: 24, qualified: false, advanceTo: "Consolation" },
          { rank: 4, name: "Player 28", played: 3, wins: 0, losses: 3, diff: "-8", points: 24, qualified: false, advanceTo: "Consolation" }
        ]
      },
      {
        id: "group-h",
        name: "Group H",
        court: "Court 4",
        players: ["Player 29", "Player 30", "Player 31", "Player 32"],
        matches: [
          { round: "Round 1", pair1: "Player 29 & Player 30", pair2: "Player 31 & Player 32", score: "11 — 7", winner: 1 },
          { round: "Round 2", pair1: "Player 29 & Player 31", pair2: "Player 30 & Player 32", score: "11 — 9", winner: 1 },
          { round: "Round 3", pair1: "Player 29 & Player 32", pair2: "Player 30 & Player 31", score: "11 — 8", winner: 1 }
        ],
        standings: [
          { rank: 1, name: "Player 29", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Team 8 (with Group G #2)" },
          { rank: 2, name: "Player 30", played: 3, wins: 2, losses: 1, diff: "+3", points: 27, qualified: true, advanceTo: "Team 7 (with Group G #1)" },
          { rank: 3, name: "Player 31", played: 3, wins: 1, losses: 2, diff: "-5", points: 24, qualified: false, advanceTo: "Consolation" },
          { rank: 4, name: "Player 32", played: 3, wins: 0, losses: 3, diff: "-7", points: 24, qualified: false, advanceTo: "Consolation" }
        ]
      }
    ],
    playoffs: {
      title: "Championship Playoff Bracket (BO3 / BO5)",
      description: "Top 2 players from Groups A–H unite into 8 balanced playoff teams (#1 Winner + #2 Runner-up of sister group). Teams compete in Best-of-3 Quarterfinals and Semifinals, culminating in an epic Best-of-5 Grand Final on Court 1!",
      quarterfinals: [
        {
          id: "QF-1",
          name: "Quarterfinal 1",
          court: "Court 1",
          time: "13:00 – 13:50",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 1", duo: "Player 1 & Player 5", seed: "Group A #1 + Group B #2" },
          team2: { name: "Team 3", duo: "Player 9 & Player 14", seed: "Group C #1 + Group D #2" },
          score: "2 — 1",
          games: ["11–8", "9–11", "11–7"],
          winner: 1,
          nextMatch: "SF-1",
          consolationMatch: "CSF-1"
        },
        {
          id: "QF-2",
          name: "Quarterfinal 2",
          court: "Court 2",
          time: "13:00 – 13:50",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 2", duo: "Player 6 & Player 2", seed: "Group B #1 + Group A #2" },
          team2: { name: "Team 4", duo: "Player 13 & Player 10", seed: "Group D #1 + Group C #2" },
          score: "0 — 2",
          games: ["9–11", "8–11"],
          winner: 2,
          nextMatch: "SF-1",
          consolationMatch: "CSF-1"
        },
        {
          id: "QF-3",
          name: "Quarterfinal 3",
          court: "Court 3",
          time: "13:00 – 13:50",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 5", duo: "Player 18 & Player 22", seed: "Group E #1 + Group F #2" },
          team2: { name: "Team 7", duo: "Player 25 & Player 30", seed: "Group G #1 + Group H #2" },
          score: "2 — 1",
          games: ["11–7", "8–11", "11–9"],
          winner: 1,
          nextMatch: "SF-2",
          consolationMatch: "CSF-2"
        },
        {
          id: "QF-4",
          name: "Quarterfinal 4",
          court: "Court 4",
          time: "13:00 – 13:50",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 6", duo: "Player 21 & Player 17", seed: "Group F #1 + Group E #2" },
          team2: { name: "Team 8", duo: "Player 29 & Player 26", seed: "Group H #1 + Group G #2" },
          score: "2 — 0",
          games: ["11–8", "11–9"],
          winner: 1,
          nextMatch: "SF-2",
          consolationMatch: "CSF-2"
        }
      ],
      semifinals: [
        {
          id: "SF-1",
          name: "Championship Semifinal 1",
          court: "Court 1",
          time: "13:50 – 14:40",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 1", duo: "Player 1 & Player 5", seed: "Winner QF1" },
          team2: { name: "Team 4", duo: "Player 13 & Player 10", seed: "Winner QF2" },
          score: "2 — 1",
          games: ["11–9", "8–11", "11–7"],
          winner: 1,
          nextMatch: "F-GOLD",
          bronzeMatch: "F-BRONZE"
        },
        {
          id: "SF-2",
          name: "Championship Semifinal 2",
          court: "Court 2",
          time: "13:50 – 14:40",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 5", duo: "Player 18 & Player 22", seed: "Winner QF3" },
          team2: { name: "Team 6", duo: "Player 21 & Player 17", seed: "Winner QF4" },
          score: "1 — 2",
          games: ["11–9", "8–11", "9–11"],
          winner: 2,
          nextMatch: "F-GOLD",
          bronzeMatch: "F-BRONZE"
        }
      ],
      consolationSemifinals: [
        {
          id: "CSF-1",
          name: "5th–8th Place Semifinal 1",
          court: "Court 3",
          time: "13:50 – 14:40",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 3", duo: "Player 9 & Player 14", seed: "Loser QF1" },
          team2: { name: "Team 2", duo: "Player 6 & Player 2", seed: "Loser QF2" },
          score: "0 — 2",
          games: ["8–11", "9–11"],
          winner: 2,
          nextMatch: "F-5TH",
          consolationMatch: "F-7TH"
        },
        {
          id: "CSF-2",
          name: "5th–8th Place Semifinal 2",
          court: "Court 4",
          time: "13:50 – 14:40",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 7", duo: "Player 25 & Player 30", seed: "Loser QF3" },
          team2: { name: "Team 8", duo: "Player 29 & Player 26", seed: "Loser QF4" },
          score: "1 — 2",
          games: ["11–9", "7–11", "8–11"],
          winner: 2,
          nextMatch: "F-5TH",
          consolationMatch: "F-7TH"
        }
      ],
      finals: [
        {
          id: "F-GOLD",
          title: "🥇 Grand Championship Final",
          badge: "Gold & Silver Medals",
          badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
          court: "Court 1",
          time: "14:40 – 16:00",
          format: "Best of 5 (BO5) · First to 3 sets",
          team1: { name: "Team 1", duo: "Player 1 & Player 5", seed: "Winner SF1", rank: "🥇 Champions" },
          team2: { name: "Team 6", duo: "Player 21 & Player 17", seed: "Winner SF2", rank: "🥈 2nd Place" },
          score: "3 — 1",
          games: ["11–7", "8–11", "11–9", "11–8"],
          winner: 1,
          champion: true
        },
        {
          id: "F-BRONZE",
          title: "🥉 Bronze Medal Match",
          badge: "Bronze Medal",
          badgeColor: "bg-orange-100 text-orange-900 border-orange-300",
          court: "Court 2",
          time: "14:40 – 15:40",
          format: "Best of 3 (BO3) · First to 2 sets",
          team1: { name: "Team 4", duo: "Player 13 & Player 10", seed: "Loser SF1", rank: "🥉 Bronze Medalists" },
          team2: { name: "Team 5", duo: "Player 18 & Player 22", seed: "Loser SF2", rank: "4th Place" },
          score: "2 — 1",
          games: ["11–9", "9–11", "11–8"],
          winner: 1
        },
        {
          id: "F-5TH",
          title: "5th Place Final Match",
          badge: "5th & 6th Place",
          badgeColor: "bg-blue-100 text-blue-900 border-blue-200",
          court: "Court 3",
          time: "14:40 – 15:35",
          format: "Best of 3 (BO3) · First to 2 sets",
          team1: { name: "Team 2", duo: "Player 6 & Player 2", seed: "Winner CSF1", rank: "5th Place" },
          team2: { name: "Team 8", duo: "Player 29 & Player 26", seed: "Winner CSF2", rank: "6th Place" },
          score: "2 — 0",
          games: ["11–8", "11–7"],
          winner: 1
        },
        {
          id: "F-7TH",
          title: "7th Place Final Match",
          badge: "7th & 8th Place",
          badgeColor: "bg-stone-100 text-stone-700 border-stone-300",
          court: "Court 4",
          time: "14:40 – 15:35",
          format: "Best of 3 (BO3) · First to 2 sets",
          team1: { name: "Team 3", duo: "Player 9 & Player 14", seed: "Loser CSF1", rank: "8th Place" },
          team2: { name: "Team 7", duo: "Player 25 & Player 30", seed: "Loser CSF2", rank: "7th Place" },
          score: "1 — 2",
          games: ["11–9", "8–11", "9–11"],
          winner: 2
        }
      ],
      podium: [
        { place: 1, medal: "🥇 Gold Champions", team: "Team 1", players: "Player 1 & Player 5", seeds: "Group A #1 + Group B #2" },
        { place: 2, medal: "🥈 Silver Medalists", team: "Team 6", players: "Player 21 & Player 17", seeds: "Group F #1 + Group E #2" },
        { place: 3, medal: "🥉 Bronze Medalists", team: "Team 4", players: "Player 13 & Player 10", seeds: "Group D #1 + Group C #2" },
        { place: 4, medal: "4th Place", team: "Team 5", players: "Player 18 & Player 22", seeds: "Group E #1 + Group F #2" },
        { place: 5, medal: "5th Place", team: "Team 2", players: "Player 6 & Player 2", seeds: "Group B #1 + Group A #2" },
        { place: 6, medal: "6th Place", team: "Team 8", players: "Player 29 & Player 26", seeds: "Group H #1 + Group G #2" },
        { place: 7, medal: "7th Place", team: "Team 7", players: "Player 25 & Player 30", seeds: "Group G #1 + Group H #2" },
        { place: 8, medal: "8th Place", team: "Team 3", players: "Player 9 & Player 14", seeds: "Group C #1 + Group D #2" }
      ],
      scheduleTimeline: [
        { time: "11:00 – 13:00", title: "Stage 1: Americano Groups (Groups A–H)", desc: "24 matches across 4 courts (6 rounds of 20 min). Every player plays 3 matches rotating partners.", courts: "Courts 1–4 Active" },
        { time: "13:00 – 13:50", title: "Stage 2: Quarterfinals (Best of 3)", desc: "All 8 balanced teams play simultaneously on Courts 1–4. First to 2 sets to 11 advances to Semifinals.", courts: "Court 1: QF1 · Court 2: QF2 · Court 3: QF3 · Court 4: QF4" },
        { time: "13:50 – 14:40", title: "Stage 3: Semifinals (Best of 3)", desc: "Courts 1 & 2: Championship Semifinals (SF1, SF2). Courts 3 & 4: 5th–8th Place Semifinals.", courts: "Court 1: SF1 · Court 2: SF2 · Court 3: CSF1 · Court 4: CSF2" },
        { time: "14:40 – 16:00", title: "Stage 4: Medal Finals & Placement (BO5 / BO3)", desc: "Court 1: 🥇 Grand Championship Final (BO5). Court 2: 🥉 Bronze Match (BO3). Courts 3 & 4: 5th & 7th Place Finals (BO3).", courts: "Court 1: Grand Final (BO5) · Court 2: Bronze (BO3) · Courts 3–4: Placements" }
      ]
    }
  }
};

TOURNAMENT_CONFIG.brackets = TOURNAMENT_BRACKETS;

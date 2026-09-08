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
    format: "Americano Groups → Merit-Seeded Duo Playoffs (BO3 / BO5)",
    playersCount: 32,
    groupsCount: 8,
    advanceCount: 2,
    totalTeams: 8,
    description: "32 players start in 8 Americano groups (Groups A to H). The 8 group winners and 8 runners-up are ranked by points and paired using a balanced merit seed (#1 Winner + #8 Runner-up, #2 Winner + #7 Runner-up, etc.). Teams then clash in single-elimination Best-of-3 Quarterfinals, Semifinals, and a Best-of-5 Grand Championship Final!",
    pairingFormula: "Merit-Based Seed: Winner Rank #k + Runner-up Rank #(9 - k) (1st with 8th, 2nd with 7th...)",
    winnersRanking: [
      { rank: 1, player: "Player 9", group: "Group C #1", pts: 33, diff: "+11", record: "3-0" },
      { rank: 2, player: "Player 1", group: "Group A #1", pts: 33, diff: "+9", record: "3-0" },
      { rank: 3, player: "Player 13", group: "Group D #1", pts: 33, diff: "+9", record: "3-0" },
      { rank: 4, player: "Player 21", group: "Group F #1", pts: 33, diff: "+9", record: "3-0" },
      { rank: 5, player: "Player 25", group: "Group G #1", pts: 33, diff: "+9", record: "3-0" },
      { rank: 6, player: "Player 29", group: "Group H #1", pts: 33, diff: "+9", record: "3-0" },
      { rank: 7, player: "Player 18", group: "Group E #1", pts: 30, diff: "+6", record: "2-1" },
      { rank: 8, player: "Player 6", group: "Group B #1", pts: 29, diff: "+5", record: "2-1" }
    ],
    runnersUpRanking: [
      { rank: 1, player: "Player 17", group: "Group E #2", pts: 30, diff: "+6", record: "2-1" },
      { rank: 2, player: "Player 10", group: "Group C #2", pts: 29, diff: "+3", record: "2-1" },
      { rank: 3, player: "Player 26", group: "Group G #2", pts: 28, diff: "+4", record: "2-1" },
      { rank: 4, player: "Player 22", group: "Group F #2", pts: 28, diff: "+3", record: "2-1" },
      { rank: 5, player: "Player 5", group: "Group B #2", pts: 28, diff: "+2", record: "2-1" },
      { rank: 6, player: "Player 2", group: "Group A #2", pts: 27, diff: "+3", record: "2-1" },
      { rank: 7, player: "Player 30", group: "Group H #2", pts: 27, diff: "+3", record: "2-1" },
      { rank: 8, player: "Player 14", group: "Group D #2", pts: 27, diff: "+2", record: "2-1" }
    ],
    teams: [
      { id: "team-1", name: "Team 1", duo: "Player 9 & Player 14", p1: "Player 9", p1Seed: "Winner #1 (Group C)", p2: "Player 14", p2Seed: "Runner-up #8 (Group D)", formula: "W1 + R8" },
      { id: "team-2", name: "Team 2", duo: "Player 1 & Player 30", p1: "Player 1", p1Seed: "Winner #2 (Group A)", p2: "Player 30", p2Seed: "Runner-up #7 (Group H)", formula: "W2 + R7" },
      { id: "team-3", name: "Team 3", duo: "Player 13 & Player 2", p1: "Player 13", p1Seed: "Winner #3 (Group D)", p2: "Player 2", p2Seed: "Runner-up #6 (Group A)", formula: "W3 + R6" },
      { id: "team-4", name: "Team 4", duo: "Player 21 & Player 5", p1: "Player 21", p1Seed: "Winner #4 (Group F)", p2: "Player 5", p2Seed: "Runner-up #5 (Group B)", formula: "W4 + R5" },
      { id: "team-5", name: "Team 5", duo: "Player 25 & Player 22", p1: "Player 25", p1Seed: "Winner #5 (Group G)", p2: "Player 22", p2Seed: "Runner-up #4 (Group F)", formula: "W5 + R4" },
      { id: "team-6", name: "Team 6", duo: "Player 29 & Player 26", p1: "Player 29", p1Seed: "Winner #6 (Group H)", p2: "Player 26", p2Seed: "Runner-up #3 (Group G)", formula: "W6 + R3" },
      { id: "team-7", name: "Team 7", duo: "Player 18 & Player 10", p1: "Player 18", p1Seed: "Winner #7 (Group E)", p2: "Player 10", p2Seed: "Runner-up #2 (Group C)", formula: "W7 + R2" },
      { id: "team-8", name: "Team 8", duo: "Player 6 & Player 17", p1: "Player 6", p1Seed: "Winner #8 (Group B)", p2: "Player 17", p2Seed: "Runner-up #1 (Group E)", formula: "W8 + R1" }
    ],
    rules: [
      { title: "Stage 1: Americano Groups (32 Players · 8 Groups)", desc: "Groups A to H (4 players each). Every player plays 3 matches rotating partners ('each with each'). Matches played to 11 points. Top 2 players advance to playoffs." },
      { title: "Merit-Based Seed Pairing (Option 3: 1st with 8th)", desc: "All 8 group winners are ranked 1 to 8 by points, and all 8 runners-up are ranked 1 to 8. Winner #1 is paired with Runner-up #8, Winner #2 with Runner-up #7, etc., achieving perfect competitive balance." },
      { title: "Quarterfinals: Best of 3 (BO3)", desc: "All 8 teams compete on Courts 1–4. First to win 2 games to 11 (win by 2) advances to the Semifinals." },
      { title: "Semifinals: Best of 3 (BO3)", desc: "Courts 1 & 2 host the Semifinals (BO3). Winners advance straight to the Grand Championship Final." },
      { title: "Grand Championship Final: Best of 5 (BO5) 🥇", desc: "The ultimate climax on Court 1! First to win 3 games to 11 is crowned NOI EXPAT OPEN Champion." },
      { title: "Pure Knockout (No Consolation Bracket)", desc: "Pure high-stakes single elimination: only winners advance toward the title, eliminating secondary placement matches." }
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
          { rank: 1, name: "Player 1", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Team 2 (Winner #2 + Runner-up #7)" },
          { rank: 2, name: "Player 2", played: 3, wins: 2, losses: 1, diff: "+3", points: 27, qualified: true, advanceTo: "Team 3 (Winner #3 + Runner-up #6)" },
          { rank: 3, name: "Player 3", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, qualified: false, advanceTo: "Eliminated" },
          { rank: 4, name: "Player 4", played: 3, wins: 0, losses: 3, diff: "-8", points: 20, qualified: false, advanceTo: "Eliminated" }
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
          { rank: 1, name: "Player 6", played: 3, wins: 2, losses: 1, diff: "+5", points: 29, qualified: true, advanceTo: "Team 8 (Winner #8 + Runner-up #1)" },
          { rank: 2, name: "Player 5", played: 3, wins: 2, losses: 1, diff: "+2", points: 28, qualified: true, advanceTo: "Team 4 (Winner #4 + Runner-up #5)" },
          { rank: 3, name: "Player 7", played: 3, wins: 1, losses: 2, diff: "-2", points: 26, qualified: false, advanceTo: "Eliminated" },
          { rank: 4, name: "Player 8", played: 3, wins: 1, losses: 2, diff: "-5", points: 23, qualified: false, advanceTo: "Eliminated" }
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
          { rank: 1, name: "Player 9", played: 3, wins: 3, losses: 0, diff: "+11", points: 33, qualified: true, advanceTo: "Team 1 (Winner #1 + Runner-up #8)" },
          { rank: 2, name: "Player 10", played: 3, wins: 2, losses: 1, diff: "+3", points: 29, qualified: true, advanceTo: "Team 7 (Winner #7 + Runner-up #2)" },
          { rank: 3, name: "Player 11", played: 3, wins: 1, losses: 2, diff: "-6", points: 22, qualified: false, advanceTo: "Eliminated" },
          { rank: 4, name: "Player 12", played: 3, wins: 0, losses: 3, diff: "-8", points: 22, qualified: false, advanceTo: "Eliminated" }
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
          { rank: 1, name: "Player 13", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Team 3 (Winner #3 + Runner-up #6)" },
          { rank: 2, name: "Player 14", played: 3, wins: 2, losses: 1, diff: "+2", points: 27, qualified: true, advanceTo: "Team 1 (Winner #1 + Runner-up #8)" },
          { rank: 3, name: "Player 15", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, qualified: false, advanceTo: "Eliminated" },
          { rank: 4, name: "Player 16", played: 3, wins: 0, losses: 3, diff: "-7", points: 24, qualified: false, advanceTo: "Eliminated" }
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
          { rank: 1, name: "Player 18", played: 3, wins: 2, losses: 1, diff: "+6", points: 30, qualified: true, advanceTo: "Team 7 (Winner #7 + Runner-up #2)" },
          { rank: 2, name: "Player 17", played: 3, wins: 2, losses: 1, diff: "+6", points: 30, qualified: true, advanceTo: "Team 8 (Winner #8 + Runner-up #1)" },
          { rank: 3, name: "Player 19", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, qualified: false, advanceTo: "Eliminated" },
          { rank: 4, name: "Player 20", played: 3, wins: 1, losses: 2, diff: "-8", points: 21, qualified: false, advanceTo: "Eliminated" }
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
          { rank: 1, name: "Player 21", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Team 4 (Winner #4 + Runner-up #5)" },
          { rank: 2, name: "Player 22", played: 3, wins: 2, losses: 1, diff: "+3", points: 28, qualified: true, advanceTo: "Team 5 (Winner #5 + Runner-up #4)" },
          { rank: 3, name: "Player 23", played: 3, wins: 1, losses: 2, diff: "-5", points: 24, qualified: false, advanceTo: "Eliminated" },
          { rank: 4, name: "Player 24", played: 3, wins: 0, losses: 3, diff: "-7", points: 24, qualified: false, advanceTo: "Eliminated" }
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
          { rank: 1, name: "Player 25", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Team 5 (Winner #5 + Runner-up #4)" },
          { rank: 2, name: "Player 26", played: 3, wins: 2, losses: 1, diff: "+4", points: 28, qualified: true, advanceTo: "Team 6 (Winner #6 + Runner-up #3)" },
          { rank: 3, name: "Player 27", played: 3, wins: 1, losses: 2, diff: "-5", points: 24, qualified: false, advanceTo: "Eliminated" },
          { rank: 4, name: "Player 28", played: 3, wins: 0, losses: 3, diff: "-8", points: 24, qualified: false, advanceTo: "Eliminated" }
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
          { rank: 1, name: "Player 29", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Team 6 (Winner #6 + Runner-up #3)" },
          { rank: 2, name: "Player 30", played: 3, wins: 2, losses: 1, diff: "+3", points: 27, qualified: true, advanceTo: "Team 2 (Winner #2 + Runner-up #7)" },
          { rank: 3, name: "Player 31", played: 3, wins: 1, losses: 2, diff: "-5", points: 24, qualified: false, advanceTo: "Eliminated" },
          { rank: 4, name: "Player 32", played: 3, wins: 0, losses: 3, diff: "-7", points: 24, qualified: false, advanceTo: "Eliminated" }
        ]
      }
    ],
    playoffs: {
      title: "Championship Playoffs (BO3 / BO5)",
      description: "8 balanced teams (formed via merit ranking: 1st with 8th, 2nd with 7th...) contest the championship bracket in Best-of-3 Quarterfinals and Semifinals, leading into the Best-of-5 Grand Championship Final.",
      quarterfinals: [
        {
          id: "QF-1",
          name: "Quarterfinal 1",
          court: "Court 1",
          time: "13:00 – 14:00",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 1", duo: "Player 9 & Player 14", seed: "W1 + R8" },
          team2: { name: "Team 8", duo: "Player 6 & Player 17", seed: "W8 + R1" },
          score: "2 — 1",
          games: ["11–8", "9–11", "11–7"],
          winner: 1,
          nextMatch: "SF-1"
        },
        {
          id: "QF-2",
          name: "Quarterfinal 2",
          court: "Court 2",
          time: "13:00 – 14:00",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 4", duo: "Player 21 & Player 5", seed: "W4 + R5" },
          team2: { name: "Team 5", duo: "Player 25 & Player 22", seed: "W5 + R4" },
          score: "2 — 0",
          games: ["11–9", "11–8"],
          winner: 1,
          nextMatch: "SF-1"
        },
        {
          id: "QF-3",
          name: "Quarterfinal 3",
          court: "Court 3",
          time: "13:00 – 14:00",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 2", duo: "Player 1 & Player 30", seed: "W2 + R7" },
          team2: { name: "Team 7", duo: "Player 18 & Player 10", seed: "W7 + R2" },
          score: "2 — 1",
          games: ["11–7", "8–11", "11–9"],
          winner: 1,
          nextMatch: "SF-2"
        },
        {
          id: "QF-4",
          name: "Quarterfinal 4",
          court: "Court 4",
          time: "13:00 – 14:00",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 3", duo: "Player 13 & Player 2", seed: "W3 + R6" },
          team2: { name: "Team 6", duo: "Player 29 & Player 26", seed: "W6 + R3" },
          score: "2 — 0",
          games: ["11–8", "11–9"],
          winner: 1,
          nextMatch: "SF-2"
        }
      ],
      semifinals: [
        {
          id: "SF-1",
          name: "Championship Semifinal 1",
          court: "Court 1",
          time: "14:00 – 15:00",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 1", duo: "Player 9 & Player 14", seed: "Winner QF1" },
          team2: { name: "Team 4", duo: "Player 21 & Player 5", seed: "Winner QF2" },
          score: "1 — 2",
          games: ["11–9", "8–11", "9–11"],
          winner: 2,
          nextMatch: "F-GOLD"
        },
        {
          id: "SF-2",
          name: "Championship Semifinal 2",
          court: "Court 2",
          time: "14:00 – 15:00",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 2", duo: "Player 1 & Player 30", seed: "Winner QF3" },
          team2: { name: "Team 3", duo: "Player 13 & Player 2", seed: "Winner QF4" },
          score: "2 — 1",
          games: ["11–9", "7–11", "11–8"],
          winner: 1,
          nextMatch: "F-GOLD"
        }
      ],
      grandFinal: {
        id: "F-GOLD",
        title: "🥇 Grand Championship Final",
        badge: "Championship Trophy & Gold Medal",
        badgeColor: "bg-amber-100 text-amber-950 border-amber-300",
        court: "Court 1 (Main Stage)",
        time: "15:00 – 16:00",
        format: "Best of 5 (BO5) · First to 3 sets to 11",
        team1: { name: "Team 2", duo: "Player 1 & Player 30", seed: "Winner SF2", rank: "🥇 CHAMPIONS" },
        team2: { name: "Team 4", duo: "Player 21 & Player 5", seed: "Winner SF1", rank: "🥈 RUNNERS-UP" },
        score: "3 — 1",
        games: ["11–8", "9–11", "11–7", "11–9"],
        winner: 1,
        champion: true
      },
      podium: [
        { place: 1, medal: "🥇 Champions", team: "Team 2", players: "Player 1 & Player 30", seeds: "Winner #2 (A) + Runner-up #7 (H)" },
        { place: 2, medal: "🥈 Runners-up", team: "Team 4", players: "Player 21 & Player 5", seeds: "Winner #4 (F) + Runner-up #5 (B)" },
        { place: 3, medal: "Semifinalist", team: "Team 1", players: "Player 9 & Player 14", seeds: "Winner #1 (C) + Runner-up #8 (D)" },
        { place: 4, medal: "Semifinalist", team: "Team 3", players: "Player 13 & Player 2", seeds: "Winner #3 (D) + Runner-up #6 (A)" }
      ],
      scheduleTimeline: [
        { time: "11:00 – 13:00", title: "Stage 1: Americano Groups (Groups A–H)", desc: "24 matches across 4 courts (6 rounds of 20 min). 32 players play 3 matches rotating partners.", courts: "Courts 1–4 Active" },
        { time: "13:00 – 14:00", title: "Stage 2: Quarterfinals (Best of 3)", desc: "All 8 merit-seeded teams play on Courts 1–4. First to 2 sets to 11 advances to Semifinals.", courts: "Court 1: QF1 · Court 2: QF2 · Court 3: QF3 · Court 4: QF4" },
        { time: "14:00 – 15:00", title: "Stage 3: Championship Semifinals (Best of 3)", desc: "The top 4 teams clash for a place in the Grand Final. First to 2 sets to 11.", courts: "Court 1: SF1 · Court 2: SF2" },
        { time: "15:00 – 16:00", title: "Stage 4: Grand Championship Final (Best of 5)", desc: "The ultimate showdown on Court 1! First to 3 sets to 11 is crowned Champion.", courts: "Court 1 (Picklehead Main Stage)" }
      ]
    }
  }
};

TOURNAMENT_CONFIG.brackets = TOURNAMENT_BRACKETS;

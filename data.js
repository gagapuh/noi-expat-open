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
    format: "Individual Doubles (Americano)",
    playersCount: 32,
    poolsCount: 8,
    advanceCount: 2,
    totalAdvancing: 16,
    description: "32 players seeded into 8 pools (4 players each). Every player plays 3 matches, partnering with each other pool member once. Individual points are accumulated; the top 2 players from each pool advance to the 16-player single elimination playoffs.",
    rules: [
      { title: "32 Participants · 8 Pools", desc: "Players 1 to 32 are divided into 8 baskets/pools of 4 players." },
      { title: "Americano Individual Doubles", desc: "In each pool, every player plays 3 matches, rotating partners so they play with every pool member once." },
      { title: "Scoring & Points Accumulation", desc: "Each match is played to 11 points. The points your pair scores in each game are added to your individual total." },
      { title: "Top 2 Advance (16 Players)", desc: "The top 2 players with the highest points tally in each pool advance to the Round of 16 Championship Playoff Bracket." }
    ],
    pools: [
      {
        id: "pool-1",
        name: "Pool 1 (Group A)",
        court: "Court 1",
        players: ["Player 1", "Player 2", "Player 3", "Player 4"],
        matches: [
          { round: "Round 1", pair1: "Player 1 & Player 2", pair2: "Player 3 & Player 4", score: "11 — 7", winner: 1 },
          { round: "Round 2", pair1: "Player 1 & Player 3", pair2: "Player 2 & Player 4", score: "11 — 9", winner: 1 },
          { round: "Round 3", pair1: "Player 1 & Player 4", pair2: "Player 2 & Player 3", score: "11 — 8", winner: 1 }
        ],
        standings: [
          { rank: 1, name: "Player 1", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true },
          { rank: 2, name: "Player 2", played: 3, wins: 2, losses: 1, diff: "+3", points: 27, qualified: true },
          { rank: 3, name: "Player 3", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, qualified: false },
          { rank: 4, name: "Player 4", played: 3, wins: 0, losses: 3, diff: "-8", points: 20, qualified: false }
        ]
      },
      {
        id: "pool-2",
        name: "Pool 2 (Group B)",
        court: "Court 2",
        players: ["Player 5", "Player 6", "Player 7", "Player 8"],
        matches: [
          { round: "Round 1", pair1: "Player 5 & Player 6", pair2: "Player 7 & Player 8", score: "11 — 8", winner: 1 },
          { round: "Round 2", pair1: "Player 5 & Player 7", pair2: "Player 6 & Player 8", score: "11 — 10", winner: 1 },
          { round: "Round 3", pair1: "Player 5 & Player 8", pair2: "Player 6 & Player 7", score: "8 — 11", winner: 2 }
        ],
        standings: [
          { rank: 1, name: "Player 6", played: 3, wins: 2, losses: 1, diff: "+5", points: 29, qualified: true },
          { rank: 2, name: "Player 5", played: 3, wins: 2, losses: 1, diff: "+2", points: 28, qualified: true },
          { rank: 3, name: "Player 7", played: 3, wins: 1, losses: 2, diff: "-2", points: 26, qualified: false },
          { rank: 4, name: "Player 8", played: 3, wins: 1, losses: 2, diff: "-5", points: 23, qualified: false }
        ]
      },
      {
        id: "pool-3",
        name: "Pool 3 (Group C)",
        court: "Court 3",
        players: ["Player 9", "Player 10", "Player 11", "Player 12"],
        matches: [
          { round: "Round 1", pair1: "Player 9 & Player 10", pair2: "Player 11 & Player 12", score: "11 — 6", winner: 1 },
          { round: "Round 2", pair1: "Player 9 & Player 11", pair2: "Player 10 & Player 12", score: "11 — 7", winner: 1 },
          { round: "Round 3", pair1: "Player 9 & Player 12", pair2: "Player 10 & Player 11", score: "11 — 9", winner: 1 }
        ],
        standings: [
          { rank: 1, name: "Player 9", played: 3, wins: 3, losses: 0, diff: "+11", points: 33, qualified: true },
          { rank: 2, name: "Player 10", played: 3, wins: 2, losses: 1, diff: "+3", points: 29, qualified: true },
          { rank: 3, name: "Player 11", played: 3, wins: 1, losses: 2, diff: "-6", points: 22, qualified: false },
          { rank: 4, name: "Player 12", played: 3, wins: 0, losses: 3, diff: "-8", points: 22, qualified: false }
        ]
      },
      {
        id: "pool-4",
        name: "Pool 4 (Group D)",
        court: "Court 4",
        players: ["Player 13", "Player 14", "Player 15", "Player 16"],
        matches: [
          { round: "Round 1", pair1: "Player 13 & Player 14", pair2: "Player 15 & Player 16", score: "11 — 9", winner: 1 },
          { round: "Round 2", pair1: "Player 13 & Player 15", pair2: "Player 14 & Player 16", score: "11 — 8", winner: 1 },
          { round: "Round 3", pair1: "Player 13 & Player 16", pair2: "Player 14 & Player 15", score: "11 — 7", winner: 1 }
        ],
        standings: [
          { rank: 1, name: "Player 13", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true },
          { rank: 2, name: "Player 14", played: 3, wins: 2, losses: 1, diff: "+2", points: 27, qualified: true },
          { rank: 3, name: "Player 15", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, qualified: false },
          { rank: 4, name: "Player 16", played: 3, wins: 0, losses: 3, diff: "-7", points: 24, qualified: false }
        ]
      },
      {
        id: "pool-5",
        name: "Pool 5 (Group E)",
        court: "Court 1",
        players: ["Player 17", "Player 18", "Player 19", "Player 20"],
        matches: [
          { round: "Round 1", pair1: "Player 17 & Player 18", pair2: "Player 19 & Player 20", score: "11 — 5", winner: 1 },
          { round: "Round 2", pair1: "Player 17 & Player 19", pair2: "Player 18 & Player 20", score: "11 — 8", winner: 1 },
          { round: "Round 3", pair1: "Player 17 & Player 20", pair2: "Player 18 & Player 19", score: "8 — 11", winner: 2 }
        ],
        standings: [
          { rank: 1, name: "Player 18", played: 3, wins: 2, losses: 1, diff: "+6", points: 30, qualified: true },
          { rank: 2, name: "Player 17", played: 3, wins: 2, losses: 1, diff: "+6", points: 30, qualified: true },
          { rank: 3, name: "Player 19", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, qualified: false },
          { rank: 4, name: "Player 20", played: 3, wins: 1, losses: 2, diff: "-8", points: 21, qualified: false }
        ]
      },
      {
        id: "pool-6",
        name: "Pool 6 (Group F)",
        court: "Court 2",
        players: ["Player 21", "Player 22", "Player 23", "Player 24"],
        matches: [
          { round: "Round 1", pair1: "Player 21 & Player 22", pair2: "Player 23 & Player 24", score: "11 — 7", winner: 1 },
          { round: "Round 2", pair1: "Player 21 & Player 23", pair2: "Player 22 & Player 24", score: "11 — 9", winner: 1 },
          { round: "Round 3", pair1: "Player 21 & Player 24", pair2: "Player 22 & Player 23", score: "11 — 8", winner: 1 }
        ],
        standings: [
          { rank: 1, name: "Player 21", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true },
          { rank: 2, name: "Player 22", played: 3, wins: 2, losses: 1, diff: "+3", points: 28, qualified: true },
          { rank: 3, name: "Player 23", played: 3, wins: 1, losses: 2, diff: "-5", points: 24, qualified: false },
          { rank: 4, name: "Player 24", played: 3, wins: 0, losses: 3, diff: "-7", points: 24, qualified: false }
        ]
      },
      {
        id: "pool-7",
        name: "Pool 7 (Group G)",
        court: "Court 3",
        players: ["Player 25", "Player 26", "Player 27", "Player 28"],
        matches: [
          { round: "Round 1", pair1: "Player 25 & Player 26", pair2: "Player 27 & Player 28", score: "11 — 6", winner: 1 },
          { round: "Round 2", pair1: "Player 25 & Player 27", pair2: "Player 26 & Player 28", score: "11 — 8", winner: 1 },
          { round: "Round 3", pair1: "Player 25 & Player 28", pair2: "Player 26 & Player 27", score: "11 — 10", winner: 1 }
        ],
        standings: [
          { rank: 1, name: "Player 25", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true },
          { rank: 2, name: "Player 26", played: 3, wins: 2, losses: 1, diff: "+4", points: 28, qualified: true },
          { rank: 3, name: "Player 27", played: 3, wins: 1, losses: 2, diff: "-5", points: 24, qualified: false },
          { rank: 4, name: "Player 28", played: 3, wins: 0, losses: 3, diff: "-8", points: 24, qualified: false }
        ]
      },
      {
        id: "pool-8",
        name: "Pool 8 (Group H)",
        court: "Court 4",
        players: ["Player 29", "Player 30", "Player 31", "Player 32"],
        matches: [
          { round: "Round 1", pair1: "Player 29 & Player 30", pair2: "Player 31 & Player 32", score: "11 — 7", winner: 1 },
          { round: "Round 2", pair1: "Player 29 & Player 31", pair2: "Player 30 & Player 32", score: "11 — 9", winner: 1 },
          { round: "Round 3", pair1: "Player 29 & Player 32", pair2: "Player 30 & Player 31", score: "11 — 8", winner: 1 }
        ],
        standings: [
          { rank: 1, name: "Player 29", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true },
          { rank: 2, name: "Player 30", played: 3, wins: 2, losses: 1, diff: "+3", points: 27, qualified: true },
          { rank: 3, name: "Player 31", played: 3, wins: 1, losses: 2, diff: "-5", points: 24, qualified: false },
          { rank: 4, name: "Player 32", played: 3, wins: 0, losses: 3, diff: "-7", points: 24, qualified: false }
        ]
      }
    ],
    playoffs: {
      title: "Playoffs — 16 Advancing Players",
      description: "Top 2 players from each of the 8 pools advance into the single-elimination doubles championship bracket.",
      rounds: [
        {
          name: "Round of 16",
          badge: "16 Players · 4 Matches",
          matches: [
            { id: "R16-1", court: "Court 1", pair1: "Pool 1 #1 (Player 1) & Pool 2 #2 (Player 5)", pair2: "Pool 3 #1 (Player 9) & Pool 4 #2 (Player 14)", score: "11 — 7", winner: 1 },
            { id: "R16-2", court: "Court 2", pair1: "Pool 2 #1 (Player 6) & Pool 1 #2 (Player 2)", pair2: "Pool 4 #1 (Player 13) & Pool 3 #2 (Player 10)", score: "8 — 11", winner: 2 },
            { id: "R16-3", court: "Court 3", pair1: "Pool 5 #1 (Player 18) & Pool 6 #2 (Player 22)", pair2: "Pool 7 #1 (Player 25) & Pool 8 #2 (Player 30)", score: "11 — 9", winner: 1 },
            { id: "R16-4", court: "Court 4", pair1: "Pool 6 #1 (Player 21) & Pool 5 #2 (Player 17)", pair2: "Pool 8 #1 (Player 29) & Pool 7 #2 (Player 26)", score: "11 — 8", winner: 1 }
          ]
        },
        {
          name: "Semifinals",
          badge: "8 Players · 2 Matches",
          matches: [
            { id: "SF-1", court: "Court 1", pair1: "Player 1 & Player 5", pair2: "Player 13 & Player 10", score: "11 — 9", winner: 1 },
            { id: "SF-2", court: "Court 2", pair1: "Player 18 & Player 22", pair2: "Player 21 & Player 17", score: "9 — 11", winner: 2 }
          ]
        },
        {
          name: "Medal Finals",
          badge: "Gold & Bronze Matches",
          matches: [
            { id: "F-GOLD", title: "Gold Medal Championship 🥇", court: "Court 1", pair1: "Player 1 & Player 5", pair2: "Player 21 & Player 17", score: "11 — 8", winner: 1 },
            { id: "F-BRONZE", title: "Bronze Medal Match 🥉", court: "Court 2", pair1: "Player 13 & Player 10", pair2: "Player 18 & Player 22", score: "11 — 9", winner: 1 }
          ]
        }
      ]
    }
  }
};

TOURNAMENT_CONFIG.brackets = TOURNAMENT_BRACKETS;

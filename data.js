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
    groupsCount: 8,
    advanceCount: 2,
    totalMatches: 60,
    roundsCount: 15,
    matchDuration: "20 min",
    description: "Full 60-Match Americano Tournament across 15 rounds on 4 courts (11:00 – 16:00). In every stage, players compete in 4-player groups with rotating partners ('each with each'). All 32 players play in Stage 1 & Stage 2; top finishers battle for podium medals in Stage 3.",
    rules: [
      { title: "60 Matches Total · 15 Rounds · 4 Courts", desc: "5-hour timeslot (11:00 – 16:00 = 300 minutes). 15 rounds of 20 min each across 4 courts = exactly 60 matches." },
      { title: "Americano 'Each with Each' Format", desc: "In every 4-player group, each player plays 3 matches partnering with each group member once (Round 1: A&B vs C&D; Round 2: A&C vs B&D; Round 3: A&D vs B&C)." },
      { title: "Stage 1: Prelim Groups (24 Matches)", desc: "32 players in 8 Groups of 4 (Groups A–H). Top 2 from each group advance to Gold Division; 3rd & 4th advance to Silver Division." },
      { title: "Stage 2: Semifinal Groups (24 Matches)", desc: "16 players in Gold Division (4 groups) and 16 players in Silver Division (4 groups). Americano continues with 3 matches per group." },
      { title: "Stage 3: Finals & Medal Groups (12 Matches)", desc: "The 4 Gold group winners battle in the Gold Championship Final Group for Gold 🥇, Silver 🥈, Bronze 🥉. Concurrently, 5th–8th, Silver Cup 🏆, and 21st–24th groups compete." },
      { title: "Player Experience: 6 to 9 Matches", desc: "Every single player is guaranteed at least 6 Americano matches (Stage 1 & 2), while finalists play 9 matches!" }
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
          { rank: 1, name: "Player 1", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Gold Division" },
          { rank: 2, name: "Player 2", played: 3, wins: 2, losses: 1, diff: "+3", points: 27, qualified: true, advanceTo: "Gold Division" },
          { rank: 3, name: "Player 3", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, qualified: false, advanceTo: "Silver Division" },
          { rank: 4, name: "Player 4", played: 3, wins: 0, losses: 3, diff: "-8", points: 20, qualified: false, advanceTo: "Silver Division" }
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
          { rank: 1, name: "Player 6", played: 3, wins: 2, losses: 1, diff: "+5", points: 29, qualified: true, advanceTo: "Gold Division" },
          { rank: 2, name: "Player 5", played: 3, wins: 2, losses: 1, diff: "+2", points: 28, qualified: true, advanceTo: "Gold Division" },
          { rank: 3, name: "Player 7", played: 3, wins: 1, losses: 2, diff: "-2", points: 26, qualified: false, advanceTo: "Silver Division" },
          { rank: 4, name: "Player 8", played: 3, wins: 1, losses: 2, diff: "-5", points: 23, qualified: false, advanceTo: "Silver Division" }
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
          { rank: 1, name: "Player 9", played: 3, wins: 3, losses: 0, diff: "+11", points: 33, qualified: true, advanceTo: "Gold Division" },
          { rank: 2, name: "Player 10", played: 3, wins: 2, losses: 1, diff: "+3", points: 29, qualified: true, advanceTo: "Gold Division" },
          { rank: 3, name: "Player 11", played: 3, wins: 1, losses: 2, diff: "-6", points: 22, qualified: false, advanceTo: "Silver Division" },
          { rank: 4, name: "Player 12", played: 3, wins: 0, losses: 3, diff: "-8", points: 22, qualified: false, advanceTo: "Silver Division" }
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
          { rank: 1, name: "Player 13", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Gold Division" },
          { rank: 2, name: "Player 14", played: 3, wins: 2, losses: 1, diff: "+2", points: 27, qualified: true, advanceTo: "Gold Division" },
          { rank: 3, name: "Player 15", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, qualified: false, advanceTo: "Silver Division" },
          { rank: 4, name: "Player 16", played: 3, wins: 0, losses: 3, diff: "-7", points: 24, qualified: false, advanceTo: "Silver Division" }
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
          { rank: 1, name: "Player 18", played: 3, wins: 2, losses: 1, diff: "+6", points: 30, qualified: true, advanceTo: "Gold Division" },
          { rank: 2, name: "Player 17", played: 3, wins: 2, losses: 1, diff: "+6", points: 30, qualified: true, advanceTo: "Gold Division" },
          { rank: 3, name: "Player 19", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, qualified: false, advanceTo: "Silver Division" },
          { rank: 4, name: "Player 20", played: 3, wins: 1, losses: 2, diff: "-8", points: 21, qualified: false, advanceTo: "Silver Division" }
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
          { rank: 1, name: "Player 21", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Gold Division" },
          { rank: 2, name: "Player 22", played: 3, wins: 2, losses: 1, diff: "+3", points: 28, qualified: true, advanceTo: "Gold Division" },
          { rank: 3, name: "Player 23", played: 3, wins: 1, losses: 2, diff: "-5", points: 24, qualified: false, advanceTo: "Silver Division" },
          { rank: 4, name: "Player 24", played: 3, wins: 0, losses: 3, diff: "-7", points: 24, qualified: false, advanceTo: "Silver Division" }
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
          { rank: 1, name: "Player 25", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Gold Division" },
          { rank: 2, name: "Player 26", played: 3, wins: 2, losses: 1, diff: "+4", points: 28, qualified: true, advanceTo: "Gold Division" },
          { rank: 3, name: "Player 27", played: 3, wins: 1, losses: 2, diff: "-5", points: 24, qualified: false, advanceTo: "Silver Division" },
          { rank: 4, name: "Player 28", played: 3, wins: 0, losses: 3, diff: "-8", points: 24, qualified: false, advanceTo: "Silver Division" }
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
          { rank: 1, name: "Player 29", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, qualified: true, advanceTo: "Gold Division" },
          { rank: 2, name: "Player 30", played: 3, wins: 2, losses: 1, diff: "+3", points: 27, qualified: true, advanceTo: "Gold Division" },
          { rank: 3, name: "Player 31", played: 3, wins: 1, losses: 2, diff: "-5", points: 24, qualified: false, advanceTo: "Silver Division" },
          { rank: 4, name: "Player 32", played: 3, wins: 0, losses: 3, diff: "-7", points: 24, qualified: false, advanceTo: "Silver Division" }
        ]
      }
    ],
    stage2: {
      title: "Stage 2 — Semifinal Groups (24 Matches)",
      badge: "24 Matches · 8 Groups of 4 · 6 Rounds (13:00 – 15:00)",
      description: "Players carry over into two 16-player divisions. Each 4-player group plays 3 Americano matches rotating partners ('each with each').",
      goldDivision: [
        {
          id: "gold-1",
          name: "Gold Group 1",
          badge: "Gold Division",
          seedInfo: "Group A #1 · Group B #2 · Group C #1 · Group D #2",
          court: "Court 1",
          players: ["Player 1", "Player 5", "Player 9", "Player 14"],
          matches: [
            { round: "Round 7 (13:00)", pair1: "Player 1 & Player 5", pair2: "Player 9 & Player 14", score: "11 — 8", winner: 1 },
            { round: "Round 8 (13:20)", pair1: "Player 1 & Player 9", pair2: "Player 5 & Player 14", score: "11 — 9", winner: 1 },
            { round: "Round 9 (13:40)", pair1: "Player 1 & Player 14", pair2: "Player 5 & Player 9", score: "11 — 7", winner: 1 }
          ],
          standings: [
            { rank: 1, name: "Player 1", origin: "Group A #1", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, nextStage: "Gold Championship Final 🥇", qualified: true },
            { rank: 2, name: "Player 5", origin: "Group B #2", played: 3, wins: 2, losses: 1, diff: "+3", points: 27, nextStage: "Gold 5th–8th Place Final", qualified: false },
            { rank: 3, name: "Player 9", origin: "Group C #1", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, nextStage: "9th–12th Overall", qualified: false },
            { rank: 4, name: "Player 14", origin: "Group D #2", played: 3, wins: 0, losses: 3, diff: "-8", points: 20, nextStage: "13th–16th Overall", qualified: false }
          ]
        },
        {
          id: "gold-2",
          name: "Gold Group 2",
          badge: "Gold Division",
          seedInfo: "Group B #1 · Group A #2 · Group D #1 · Group C #2",
          court: "Court 2",
          players: ["Player 6", "Player 2", "Player 13", "Player 10"],
          matches: [
            { round: "Round 7 (13:00)", pair1: "Player 6 & Player 2", pair2: "Player 13 & Player 10", score: "8 — 11", winner: 2 },
            { round: "Round 8 (13:20)", pair1: "Player 6 & Player 13", pair2: "Player 2 & Player 10", score: "11 — 8", winner: 1 },
            { round: "Round 9 (13:40)", pair1: "Player 6 & Player 10", pair2: "Player 2 & Player 13", score: "9 — 11", winner: 2 }
          ],
          standings: [
            { rank: 1, name: "Player 13", origin: "Group D #1", played: 3, wins: 3, losses: 0, diff: "+7", points: 33, nextStage: "Gold Championship Final 🥇", qualified: true },
            { rank: 2, name: "Player 6", origin: "Group B #1", played: 3, wins: 2, losses: 1, diff: "+2", points: 28, nextStage: "Gold 5th–8th Place Final", qualified: false },
            { rank: 3, name: "Player 10", origin: "Group C #2", played: 3, wins: 1, losses: 2, diff: "-3", points: 27, nextStage: "9th–12th Overall", qualified: false },
            { rank: 4, name: "Player 2", origin: "Group A #2", played: 3, wins: 0, losses: 3, diff: "-6", points: 22, nextStage: "13th–16th Overall", qualified: false }
          ]
        },
        {
          id: "gold-3",
          name: "Gold Group 3",
          badge: "Gold Division",
          seedInfo: "Group E #1 · Group F #2 · Group G #1 · Group H #2",
          court: "Court 3",
          players: ["Player 18", "Player 22", "Player 25", "Player 30"],
          matches: [
            { round: "Round 7 (13:00)", pair1: "Player 18 & Player 22", pair2: "Player 25 & Player 30", score: "11 — 7", winner: 1 },
            { round: "Round 8 (13:20)", pair1: "Player 18 & Player 25", pair2: "Player 22 & Player 30", score: "11 — 9", winner: 1 },
            { round: "Round 9 (13:40)", pair1: "Player 18 & Player 30", pair2: "Player 22 & Player 25", score: "8 — 11", winner: 2 }
          ],
          standings: [
            { rank: 1, name: "Player 25", origin: "Group G #1", played: 3, wins: 2, losses: 1, diff: "+5", points: 29, nextStage: "Gold Championship Final 🥇", qualified: true },
            { rank: 2, name: "Player 18", origin: "Group E #1", played: 3, wins: 2, losses: 1, diff: "+3", points: 30, nextStage: "Gold 5th–8th Place Final", qualified: false },
            { rank: 3, name: "Player 22", origin: "Group F #2", played: 3, wins: 1, losses: 2, diff: "-2", points: 25, nextStage: "9th–12th Overall", qualified: false },
            { rank: 4, name: "Player 30", origin: "Group H #2", played: 3, wins: 1, losses: 2, diff: "-6", points: 23, nextStage: "13th–16th Overall", qualified: false }
          ]
        },
        {
          id: "gold-4",
          name: "Gold Group 4",
          badge: "Gold Division",
          seedInfo: "Group F #1 · Group E #2 · Group H #1 · Group G #2",
          court: "Court 4",
          players: ["Player 21", "Player 17", "Player 29", "Player 26"],
          matches: [
            { round: "Round 7 (13:00)", pair1: "Player 21 & Player 17", pair2: "Player 29 & Player 26", score: "11 — 8", winner: 1 },
            { round: "Round 8 (13:20)", pair1: "Player 21 & Player 29", pair2: "Player 17 & Player 26", score: "11 — 7", winner: 1 },
            { round: "Round 9 (13:40)", pair1: "Player 21 & Player 26", pair2: "Player 17 & Player 29", score: "11 — 9", winner: 1 }
          ],
          standings: [
            { rank: 1, name: "Player 21", origin: "Group F #1", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, nextStage: "Gold Championship Final 🥇", qualified: true },
            { rank: 2, name: "Player 17", origin: "Group E #2", played: 3, wins: 2, losses: 1, diff: "+3", points: 27, nextStage: "Gold 5th–8th Place Final", qualified: false },
            { rank: 3, name: "Player 29", origin: "Group H #1", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, nextStage: "9th–12th Overall", qualified: false },
            { rank: 4, name: "Player 26", origin: "Group G #2", played: 3, wins: 0, losses: 3, diff: "-8", points: 24, nextStage: "13th–16th Overall", qualified: false }
          ]
        }
      ],
      silverDivision: [
        {
          id: "silver-1",
          name: "Silver Group 1",
          badge: "Silver Division",
          seedInfo: "Group A #3 · Group B #4 · Group C #3 · Group D #4",
          court: "Court 1",
          players: ["Player 3", "Player 8", "Player 11", "Player 16"],
          matches: [
            { round: "Round 10 (14:00)", pair1: "Player 3 & Player 8", pair2: "Player 11 & Player 16", score: "11 — 7", winner: 1 },
            { round: "Round 11 (14:20)", pair1: "Player 3 & Player 11", pair2: "Player 8 & Player 16", score: "11 — 9", winner: 1 },
            { round: "Round 12 (14:40)", pair1: "Player 3 & Player 16", pair2: "Player 8 & Player 11", score: "11 — 8", winner: 1 }
          ],
          standings: [
            { rank: 1, name: "Player 3", origin: "Group A #3", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, nextStage: "Silver Cup Final 🏆", qualified: true },
            { rank: 2, name: "Player 8", origin: "Group B #4", played: 3, wins: 2, losses: 1, diff: "+2", points: 26, nextStage: "Silver 21st–24th Final", qualified: false },
            { rank: 3, name: "Player 11", origin: "Group C #3", played: 3, wins: 1, losses: 2, diff: "-3", points: 25, nextStage: "25th–28th Overall", qualified: false },
            { rank: 4, name: "Player 16", origin: "Group D #4", played: 3, wins: 0, losses: 3, diff: "-8", points: 22, nextStage: "29th–32nd Overall", qualified: false }
          ]
        },
        {
          id: "silver-2",
          name: "Silver Group 2",
          badge: "Silver Division",
          seedInfo: "Group B #3 · Group A #4 · Group D #3 · Group C #4",
          court: "Court 2",
          players: ["Player 7", "Player 4", "Player 15", "Player 12"],
          matches: [
            { round: "Round 10 (14:00)", pair1: "Player 7 & Player 4", pair2: "Player 15 & Player 12", score: "11 — 8", winner: 1 },
            { round: "Round 11 (14:20)", pair1: "Player 7 & Player 15", pair2: "Player 4 & Player 12", score: "11 — 6", winner: 1 },
            { round: "Round 12 (14:40)", pair1: "Player 7 & Player 12", pair2: "Player 4 & Player 15", score: "11 — 9", winner: 1 }
          ],
          standings: [
            { rank: 1, name: "Player 7", origin: "Group B #3", played: 3, wins: 3, losses: 0, diff: "+10", points: 33, nextStage: "Silver Cup Final 🏆", qualified: true },
            { rank: 2, name: "Player 15", origin: "Group D #3", played: 3, wins: 2, losses: 1, diff: "+3", points: 28, nextStage: "Silver 21st–24th Final", qualified: false },
            { rank: 3, name: "Player 4", origin: "Group A #4", played: 3, wins: 1, losses: 2, diff: "-5", points: 23, nextStage: "25th–28th Overall", qualified: false },
            { rank: 4, name: "Player 12", origin: "Group C #4", played: 3, wins: 0, losses: 3, diff: "-8", points: 20, nextStage: "29th–32nd Overall", qualified: false }
          ]
        },
        {
          id: "silver-3",
          name: "Silver Group 3",
          badge: "Silver Division",
          seedInfo: "Group E #3 · Group F #4 · Group G #3 · Group H #4",
          court: "Court 3",
          players: ["Player 19", "Player 24", "Player 27", "Player 32"],
          matches: [
            { round: "Round 10 (14:00)", pair1: "Player 19 & Player 24", pair2: "Player 27 & Player 32", score: "11 — 8", winner: 1 },
            { round: "Round 11 (14:20)", pair1: "Player 19 & Player 27", pair2: "Player 24 & Player 32", score: "11 — 7", winner: 1 },
            { round: "Round 12 (14:40)", pair1: "Player 19 & Player 32", pair2: "Player 24 & Player 27", score: "11 — 9", winner: 1 }
          ],
          standings: [
            { rank: 1, name: "Player 19", origin: "Group E #3", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, nextStage: "Silver Cup Final 🏆", qualified: true },
            { rank: 2, name: "Player 27", origin: "Group G #3", played: 3, wins: 2, losses: 1, diff: "+2", points: 27, nextStage: "Silver 21st–24th Final", qualified: false },
            { rank: 3, name: "Player 24", origin: "Group F #4", played: 3, wins: 1, losses: 2, diff: "-4", points: 24, nextStage: "25th–28th Overall", qualified: false },
            { rank: 4, name: "Player 32", origin: "Group H #4", played: 3, wins: 0, losses: 3, diff: "-7", points: 21, nextStage: "29th–32nd Overall", qualified: false }
          ]
        },
        {
          id: "silver-4",
          name: "Silver Group 4",
          badge: "Silver Division",
          seedInfo: "Group F #3 · Group E #4 · Group H #3 · Group G #4",
          court: "Court 4",
          players: ["Player 23", "Player 20", "Player 31", "Player 28"],
          matches: [
            { round: "Round 10 (14:00)", pair1: "Player 23 & Player 20", pair2: "Player 31 & Player 28", score: "11 — 9", winner: 1 },
            { round: "Round 11 (14:20)", pair1: "Player 23 & Player 31", pair2: "Player 20 & Player 28", score: "11 — 6", winner: 1 },
            { round: "Round 12 (14:40)", pair1: "Player 23 & Player 28", pair2: "Player 20 & Player 31", score: "9 — 11", winner: 2 }
          ],
          standings: [
            { rank: 1, name: "Player 31", origin: "Group H #3", played: 3, wins: 2, losses: 1, diff: "+4", points: 31, nextStage: "Silver Cup Final 🏆", qualified: true },
            { rank: 2, name: "Player 23", origin: "Group F #3", played: 3, wins: 2, losses: 1, diff: "+5", points: 29, nextStage: "Silver 21st–24th Final", qualified: false },
            { rank: 3, name: "Player 20", origin: "Group E #4", played: 3, wins: 1, losses: 2, diff: "-3", points: 24, nextStage: "25th–28th Overall", qualified: false },
            { rank: 4, name: "Player 28", origin: "Group G #4", played: 3, wins: 1, losses: 2, diff: "-6", points: 20, nextStage: "29th–32nd Overall", qualified: false }
          ]
        }
      ]
    },
    stage3: {
      title: "Stage 3 — Finals & Medal Groups (12 Matches)",
      badge: "12 Matches · 4 Final Groups · 3 Rounds (15:00 – 16:00)",
      description: "The championship conclusion! The 4 Gold Group winners battle in an Americano final group for the Gold 🥇, Silver 🥈, and Bronze 🥉 medals. Simultaneously, groups for 5th–8th place, Silver Cup 🏆, and 21st–24th place compete across all 4 courts.",
      finalGroups: [
        {
          id: "gold-champ",
          name: "Gold Championship Final Group 🥇🥈🥉",
          subName: "1st – 4th Place (Winners of Gold Groups 1–4)",
          court: "Court 1",
          badge: "Podium Decider",
          badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
          cardBg: "from-amber-50/50 to-white",
          players: ["Player 1", "Player 13", "Player 25", "Player 21"],
          matches: [
            { round: "Round 13 (15:00)", pair1: "Player 1 & Player 13", pair2: "Player 25 & Player 21", score: "11 — 8", winner: 1 },
            { round: "Round 14 (15:20)", pair1: "Player 1 & Player 25", pair2: "Player 13 & Player 21", score: "11 — 9", winner: 1 },
            { round: "Round 15 (15:40)", pair1: "Player 1 & Player 21", pair2: "Player 13 & Player 25", score: "11 — 7", winner: 1 }
          ],
          standings: [
            { rank: 1, medal: "🥇 Gold Champion", name: "Player 1", origin: "Gold Group 1 #1", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, trophy: true },
            { rank: 2, medal: "🥈 Silver Medal", name: "Player 21", origin: "Gold Group 4 #1", played: 3, wins: 2, losses: 1, diff: "+3", points: 28, podium: true },
            { rank: 3, medal: "🥉 Bronze Medal", name: "Player 13", origin: "Gold Group 2 #1", played: 3, wins: 1, losses: 2, diff: "-4", points: 26, podium: true },
            { rank: 4, medal: "4th Place", name: "Player 25", origin: "Gold Group 3 #1", played: 3, wins: 0, losses: 3, diff: "-8", points: 24 }
          ]
        },
        {
          id: "gold-5-8",
          name: "Gold Division: 5th – 8th Place Final",
          subName: "Runners-up of Gold Groups 1–4",
          court: "Court 2",
          badge: "5th – 8th Place",
          badgeColor: "bg-blue-100 text-blue-900 border-blue-200",
          cardBg: "from-blue-50/30 to-white",
          players: ["Player 5", "Player 6", "Player 18", "Player 17"],
          matches: [
            { round: "Round 13 (15:00)", pair1: "Player 5 & Player 6", pair2: "Player 18 & Player 17", score: "11 — 9", winner: 1 },
            { round: "Round 14 (15:20)", pair1: "Player 5 & Player 18", pair2: "Player 6 & Player 17", score: "11 — 8", winner: 1 },
            { round: "Round 15 (15:40)", pair1: "Player 5 & Player 17", pair2: "Player 6 & Player 18", score: "11 — 10", winner: 1 }
          ],
          standings: [
            { rank: 1, medal: "5th Place", name: "Player 5", origin: "Gold Group 1 #2", played: 3, wins: 3, losses: 0, diff: "+5", points: 33 },
            { rank: 2, medal: "6th Place", name: "Player 6", origin: "Gold Group 2 #2", played: 3, wins: 2, losses: 1, diff: "+2", points: 28 },
            { rank: 3, medal: "7th Place", name: "Player 18", origin: "Gold Group 3 #2", played: 3, wins: 1, losses: 2, diff: "-2", points: 27 },
            { rank: 4, medal: "8th Place", name: "Player 17", origin: "Gold Group 4 #2", played: 3, wins: 0, losses: 3, diff: "-5", points: 25 }
          ]
        },
        {
          id: "silver-cup",
          name: "Silver Cup Championship Final 🏆",
          subName: "17th – 20th Place (Winners of Silver Groups 1–4)",
          court: "Court 3",
          badge: "Silver Cup Trophy",
          badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
          cardBg: "from-slate-50/50 to-white",
          players: ["Player 3", "Player 7", "Player 19", "Player 31"],
          matches: [
            { round: "Round 13 (15:00)", pair1: "Player 3 & Player 7", pair2: "Player 19 & Player 31", score: "11 — 8", winner: 1 },
            { round: "Round 14 (15:20)", pair1: "Player 3 & Player 19", pair2: "Player 7 & Player 31", score: "11 — 9", winner: 1 },
            { round: "Round 15 (15:40)", pair1: "Player 3 & Player 31", pair2: "Player 7 & Player 19", score: "11 — 7", winner: 1 }
          ],
          standings: [
            { rank: 1, medal: "🏆 Silver Cup Champion", name: "Player 3", origin: "Silver Group 1 #1", played: 3, wins: 3, losses: 0, diff: "+9", points: 33, trophy: true },
            { rank: 2, medal: "18th Place", name: "Player 7", origin: "Silver Group 2 #1", played: 3, wins: 2, losses: 1, diff: "+3", points: 28 },
            { rank: 3, medal: "19th Place", name: "Player 31", origin: "Silver Group 4 #1", played: 3, wins: 1, losses: 2, diff: "-4", points: 26 },
            { rank: 4, medal: "20th Place", name: "Player 19", origin: "Silver Group 3 #1", played: 3, wins: 0, losses: 3, diff: "-8", points: 24 }
          ]
        },
        {
          id: "silver-21-24",
          name: "Silver Division: 21st – 24th Place Final",
          subName: "Runners-up of Silver Groups 1–4",
          court: "Court 4",
          badge: "21st – 24th Place",
          badgeColor: "bg-stone-100 text-stone-700 border-stone-300",
          cardBg: "from-stone-50/30 to-white",
          players: ["Player 8", "Player 15", "Player 27", "Player 23"],
          matches: [
            { round: "Round 13 (15:00)", pair1: "Player 8 & Player 15", pair2: "Player 27 & Player 23", score: "11 — 9", winner: 1 },
            { round: "Round 14 (15:20)", pair1: "Player 8 & Player 27", pair2: "Player 15 & Player 23", score: "11 — 8", winner: 1 },
            { round: "Round 15 (15:40)", pair1: "Player 8 & Player 23", pair2: "Player 15 & Player 27", score: "9 — 11", winner: 2 }
          ],
          standings: [
            { rank: 1, medal: "21st Place", name: "Player 15", origin: "Silver Group 2 #2", played: 3, wins: 2, losses: 1, diff: "+3", points: 31 },
            { rank: 2, medal: "22nd Place", name: "Player 8", origin: "Silver Group 1 #2", played: 3, wins: 2, losses: 1, diff: "+2", points: 29 },
            { rank: 3, medal: "23rd Place", name: "Player 27", origin: "Silver Group 3 #2", played: 3, wins: 1, losses: 2, diff: "-2", points: 26 },
            { rank: 4, medal: "24th Place", name: "Player 23", origin: "Silver Group 4 #2", played: 3, wins: 1, losses: 2, diff: "-3", points: 25 }
          ]
        }
      ]
    },
    schedule15Rounds: [
      { roundNum: 1, time: "11:00 – 11:20", stage: "Stage 1", label: "Prelim Groups A–D (Round 1)", c1: "Group A: P1&P2 vs P3&P4", c2: "Group B: P5&P6 vs P7&P8", c3: "Group C: P9&P10 vs P11&P12", c4: "Group D: P13&P14 vs P15&P16" },
      { roundNum: 2, time: "11:20 – 11:40", stage: "Stage 1", label: "Prelim Groups A–D (Round 2)", c1: "Group A: P1&P3 vs P2&P4", c2: "Group B: P5&P7 vs P6&P8", c3: "Group C: P9&P11 vs P10&P12", c4: "Group D: P13&P15 vs P14&P16" },
      { roundNum: 3, time: "11:40 – 12:00", stage: "Stage 1", label: "Prelim Groups A–D (Round 3)", c1: "Group A: P1&P4 vs P2&P3", c2: "Group B: P5&P8 vs P6&P7", c3: "Group C: P9&P12 vs P10&P11", c4: "Group D: P13&P16 vs P14&P15" },
      { roundNum: 4, time: "12:00 – 12:20", stage: "Stage 1", label: "Prelim Groups E–H (Round 1)", c1: "Group E: P17&P18 vs P19&P20", c2: "Group F: P21&P22 vs P23&P24", c3: "Group G: P25&P26 vs P27&P28", c4: "Group H: P29&P30 vs P31&P32" },
      { roundNum: 5, time: "12:20 – 12:40", stage: "Stage 1", label: "Prelim Groups E–H (Round 2)", c1: "Group E: P17&P19 vs P18&P20", c2: "Group F: P21&P23 vs P22&P24", c3: "Group G: P25&P27 vs P26&P28", c4: "Group H: P29&P31 vs P30&P32" },
      { roundNum: 6, time: "12:40 – 13:00", stage: "Stage 1", label: "Prelim Groups E–H (Round 3)", c1: "Group E: P17&P20 vs P18&P19", c2: "Group F: P21&P24 vs P22&P23", c3: "Group G: P25&P28 vs P26&P27", c4: "Group H: P29&P32 vs P30&P31" },
      { roundNum: 7, time: "13:00 – 13:20", stage: "Stage 2", label: "Gold Groups 1–4 (Round 1)", c1: "Gold 1: P1&P5 vs P9&P14", c2: "Gold 2: P6&P2 vs P13&P10", c3: "Gold 3: P18&P22 vs P25&P30", c4: "Gold 4: P21&P17 vs P29&P26" },
      { roundNum: 8, time: "13:20 – 13:40", stage: "Stage 2", label: "Gold Groups 1–4 (Round 2)", c1: "Gold 1: P1&P9 vs P5&P14", c2: "Gold 2: P6&P13 vs P2&P10", c3: "Gold 3: P18&P25 vs P22&P30", c4: "Gold 4: P21&P29 vs P17&P26" },
      { roundNum: 9, time: "13:40 – 14:00", stage: "Stage 2", label: "Gold Groups 1–4 (Round 3)", c1: "Gold 1: P1&P14 vs P5&P9", c2: "Gold 2: P6&P10 vs P2&P13", c3: "Gold 3: P18&P30 vs P22&P25", c4: "Gold 4: P21&P26 vs P17&P29" },
      { roundNum: 10, time: "14:00 – 14:20", stage: "Stage 2", label: "Silver Groups 1–4 (Round 1)", c1: "Silver 1: P3&P8 vs P11&P16", c2: "Silver 2: P7&P4 vs P15&P12", c3: "Silver 3: P19&P24 vs P27&P32", c4: "Silver 4: P23&P20 vs P31&P28" },
      { roundNum: 11, time: "14:20 – 14:40", stage: "Stage 2", label: "Silver Groups 1–4 (Round 2)", c1: "Silver 1: P3&P11 vs P8&P16", c2: "Silver 2: P7&P15 vs P4&P12", c3: "Silver 3: P19&P27 vs P24&P32", c4: "Silver 4: P23&P31 vs P20&P28" },
      { roundNum: 12, time: "14:40 – 15:00", stage: "Stage 2", label: "Silver Groups 1–4 (Round 3)", c1: "Silver 1: P3&P16 vs P8&P11", c2: "Silver 2: P7&P12 vs P4&P15", c3: "Silver 3: P19&P32 vs P24&P27", c4: "Silver 4: P23&P28 vs P20&P31" },
      { roundNum: 13, time: "15:00 – 15:20", stage: "Stage 3", label: "Finals & Medals (Round 1)", c1: "Gold Final: P1&P13 vs P25&P21", c2: "Gold 5–8: P5&P6 vs P18&P17", c3: "Silver Cup: P3&P7 vs P19&P31", c4: "Silver 21–24: P8&P15 vs P27&P23" },
      { roundNum: 14, time: "15:20 – 15:40", stage: "Stage 3", label: "Finals & Medals (Round 2)", c1: "Gold Final: P1&P25 vs P13&P21", c2: "Gold 5–8: P5&P18 vs P6&P17", c3: "Silver Cup: P3&P19 vs P7&P31", c4: "Silver 21–24: P8&P27 vs P15&P23" },
      { roundNum: 15, time: "15:40 – 16:00", stage: "Stage 3", label: "Finals & Medals (Round 3 - Deciders)", c1: "Gold Final: P1&P21 vs P13&P25", c2: "Gold 5–8: P5&P17 vs P6&P18", c3: "Silver Cup: P3&P31 vs P7&P19", c4: "Silver 21–24: P8&P23 vs P15&P27" }
    ]
  }
};

TOURNAMENT_CONFIG.brackets = TOURNAMENT_BRACKETS;

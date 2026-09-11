/**
 * ==============================================================================
 * NOI EXPAT OPEN — TOURNAMENT SCHEDULE DATA
 * ==============================================================================
 */

const TOURNAMENT_CONFIG = {
  title: "NOI EXPAT OPEN",
  date: "October 4, 2026",
  location: "91Club Pickleball",
  venue: {
    name: "91Club Pickleball",
    address: "91Club Pickleball & Coffee",
    image: "91club.png",
    googleMapsUrl: "https://maps.app.goo.gl/8dorv6RPoKmyqaCt9",
    appleMapsUrl: "https://maps.apple/p/3dUGmPID3WGoQ1"
  },
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
      badge: "bg-blue-600 text-white font-black tracking-wider shadow-2xs",
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
      badge: "bg-violet-700 text-white font-black tracking-wider shadow-2xs",
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
      badge: "bg-teal-700 text-white font-black tracking-wider shadow-2xs",
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
      badge: "bg-emerald-600 text-white font-black tracking-wider shadow-2xs",
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
      badge: "bg-amber-500 text-stone-900 font-black tracking-wider shadow-2xs",
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
      badge: "bg-purple-700 text-white font-black tracking-wider shadow-2xs",
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
      badge: "bg-sky-700 text-white font-black tracking-wider shadow-2xs",
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
      badge: "bg-stone-700 text-white font-black tracking-wider shadow-2xs",
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
      id: "day2",
      name: "Sunday",
      title: "Sunday · Oct 4",
      dateFormatted: "Sunday, Oct 4",
      schedule: [
        // 11:00–17:00 Picklehead Main Stage (Courts 1–4, staggered finish)
        {
          id: "d2-c1c4-picklehead",
          courtId: "c1",
          courtIds: ["c1", "c2", "c3", "c4"],
          courtSpan: 4,
          courtLabel: "Courts 1–4",
          start: "11:00",
          end: "17:00",
          title: "Picklehead Main Stage",
          subtitle: "Individual Doubles (2.5–3.0)",
          host: "Ho",
          playersCount: "0/32",
          isDupr: true,
          duprStatus: "To Be Confirmed",
          bracketId: "picklehead-individual-doubles",
          logo: "picklehead.webp",
          reclubUrl: "https://reclub.co/m/SGYX9E",
          category: "tournament",
          status: "occupied",
          staggeredCourts: [
            { courtId: "c1", courtName: "Court 1", start: "11:00", end: "17:00" },
            { courtId: "c2", courtName: "Court 2", start: "11:00", end: "16:00" },
            { courtId: "c3", courtName: "Court 3", start: "11:00", end: "15:00" },
            { courtId: "c4", courtName: "Court 4", start: "11:00", end: "15:00" }
          ]
        },

        // 15:30 - 19:00 Prime Division (Courts 3 & 4 combined)
        {
          id: "d2-c3c4-prime",
          courtId: "c3",
          courtIds: ["c3", "c4"],
          courtSpan: 2,
          start: "15:30",
          end: "19:00",
          title: "Prime Division",
          subtitle: "Individual Doubles (4.0+)",
          host: "Ho",
          playersCount: "0/12",
          isDupr: true,
          duprStatus: "To Be Confirmed",
          logo: "picklehead.webp",
          reclubUrl: "",
          category: "round_robin",
          status: "occupied"
        },

        // 19:00 - 22:00 Team Games (Courts 1–4 combined)
        {
          id: "d2-c1c4-team-games",
          courtId: "c1",
          courtIds: ["c1", "c2", "c3", "c4"],
          courtSpan: 4,
          courtLabel: "Courts 1–4",
          start: "19:00",
          end: "22:00",
          title: "Team Games",
          subtitle: "8 Teams · 2 Groups · MLP Format (2M + 2W)",
          host: "Ho & Eugen",
          playersCount: "8 Teams (32)",
          isDupr: true,
          duprStatus: "To Be Confirmed",
          bracketId: "team-games",
          logo: "picklehead.webp",
          reclubUrl: "",
          category: "tournament",
          status: "occupied",
          staggeredCourts: [
            { courtId: "c1", courtName: "Court 1", start: "19:00", end: "22:00" },
            { courtId: "c2", courtName: "Court 2", start: "19:00", end: "22:00" },
            { courtId: "c3", courtName: "Court 3", start: "19:00", end: "22:00" },
            { courtId: "c4", courtName: "Court 4", start: "19:00", end: "22:00" }
          ]
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
    day: "Sunday, Oct 4",
    time: "11:00 – 17:00",
    courts: "Courts 1, 2, 3, 4",
    format: "Americano Groups → Merit-Seeded Duo Playoffs (BO3 / BO5)",
    playersCount: 32,
    groupsCount: 8,
    advanceCount: 2,
    totalTeams: 8,
    isDrawCompleted: false,
    description: "32 players start as an open roster. Once drawn into 8 Americano groups (Groups A to H), each player plays 6 matches rotating partners ('each with each' × 2 rounds). Top 2 from each group advance and pair up using merit ranking (1st with 8th, 2nd with 7th...) into 8 balanced playoff teams competing in Best-of-3 Quarterfinals, Semifinals, and a Best-of-5 Grand Final!",
    pairingFormula: "Merit-Based Seed: Winner Rank #k + Runner-up Rank #(9 - k) (1st with 8th, 2nd with 7th...)",
    pots: {
      drawPots: [
        { id: "pot-1", name: "Pot 1: Seeds 1–8 (Top Players)", badge: "bg-amber-100 text-amber-900 border-amber-300", players: ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8"] },
        { id: "pot-2", name: "Pot 2: Seeds 9–16", badge: "bg-blue-100 text-blue-900 border-blue-300", players: ["Player 9", "Player 10", "Player 11", "Player 12", "Player 13", "Player 14", "Player 15", "Player 16"] },
        { id: "pot-3", name: "Pot 3: Seeds 17–24", badge: "bg-emerald-100 text-emerald-900 border-emerald-300", players: ["Player 17", "Player 18", "Player 19", "Player 20", "Player 21", "Player 22", "Player 23", "Player 24"] },
        { id: "pot-4", name: "Pot 4: Seeds 25–32", badge: "bg-purple-100 text-purple-900 border-purple-300", players: ["Player 25", "Player 26", "Player 27", "Player 28", "Player 29", "Player 30", "Player 31", "Player 32"] }
      ],
      meritPots: [
        { id: "pot-w", name: "Pot W: 8 Group Winners (W1 to W8)", badge: "bg-amber-100 text-amber-900 border-amber-300" },
        { id: "pot-r", name: "Pot R: 8 Group Runners-Up (R1 to R8)", badge: "bg-blue-100 text-blue-900 border-blue-300" }
      ]
    },
    players: [
      {
            "id": 1,
            "name": "Player 1",
            "duprId": "",
            "group": null
      },
      {
            "id": 2,
            "name": "Player 2",
            "duprId": "",
            "group": null
      },
      {
            "id": 3,
            "name": "Player 3",
            "duprId": "",
            "group": null
      },
      {
            "id": 4,
            "name": "Player 4",
            "duprId": "",
            "group": null
      },
      {
            "id": 5,
            "name": "Player 5",
            "duprId": "",
            "group": null
      },
      {
            "id": 6,
            "name": "Player 6",
            "duprId": "",
            "group": null
      },
      {
            "id": 7,
            "name": "Player 7",
            "duprId": "",
            "group": null
      },
      {
            "id": 8,
            "name": "Player 8",
            "duprId": "",
            "group": null
      },
      {
            "id": 9,
            "name": "Player 9",
            "duprId": "",
            "group": null
      },
      {
            "id": 10,
            "name": "Player 10",
            "duprId": "",
            "group": null
      },
      {
            "id": 11,
            "name": "Player 11",
            "duprId": "",
            "group": null
      },
      {
            "id": 12,
            "name": "Player 12",
            "duprId": "",
            "group": null
      },
      {
            "id": 13,
            "name": "Player 13",
            "duprId": "",
            "group": null
      },
      {
            "id": 14,
            "name": "Player 14",
            "duprId": "",
            "group": null
      },
      {
            "id": 15,
            "name": "Player 15",
            "duprId": "",
            "group": null
      },
      {
            "id": 16,
            "name": "Player 16",
            "duprId": "",
            "group": null
      },
      {
            "id": 17,
            "name": "Player 17",
            "duprId": "",
            "group": null
      },
      {
            "id": 18,
            "name": "Player 18",
            "duprId": "",
            "group": null
      },
      {
            "id": 19,
            "name": "Player 19",
            "duprId": "",
            "group": null
      },
      {
            "id": 20,
            "name": "Player 20",
            "duprId": "",
            "group": null
      },
      {
            "id": 21,
            "name": "Player 21",
            "duprId": "",
            "group": null
      },
      {
            "id": 22,
            "name": "Player 22",
            "duprId": "",
            "group": null
      },
      {
            "id": 23,
            "name": "Player 23",
            "duprId": "",
            "group": null
      },
      {
            "id": 24,
            "name": "Player 24",
            "duprId": "",
            "group": null
      },
      {
            "id": 25,
            "name": "Player 25",
            "duprId": "",
            "group": null
      },
      {
            "id": 26,
            "name": "Player 26",
            "duprId": "",
            "group": null
      },
      {
            "id": 27,
            "name": "Player 27",
            "duprId": "",
            "group": null
      },
      {
            "id": 28,
            "name": "Player 28",
            "duprId": "",
            "group": null
      },
      {
            "id": 29,
            "name": "Player 29",
            "duprId": "",
            "group": null
      },
      {
            "id": 30,
            "name": "Player 30",
            "duprId": "",
            "group": null
      },
      {
            "id": 31,
            "name": "Player 31",
            "duprId": "",
            "group": null
      },
      {
            "id": 32,
            "name": "Player 32",
            "duprId": "",
            "group": null
      }
],
    teams: [
      { id: "team-1", name: "Team 1", duo: "Winner #1 + Runner-up #8", p1Seed: "Winner #1", p2Seed: "Runner-up #8", formula: "W1 + R8" },
      { id: "team-2", name: "Team 2", duo: "Winner #2 + Runner-up #7", p1Seed: "Winner #2", p2Seed: "Runner-up #7", formula: "W2 + R7" },
      { id: "team-3", name: "Team 3", duo: "Winner #3 + Runner-up #6", p1Seed: "Winner #3", p2Seed: "Runner-up #6", formula: "W3 + R6" },
      { id: "team-4", name: "Team 4", duo: "Winner #4 + Runner-up #5", p1Seed: "Winner #4", p2Seed: "Runner-up #5", formula: "W4 + R5" },
      { id: "team-5", name: "Team 5", duo: "Winner #5 + Runner-up #4", p1Seed: "Winner #5", p2Seed: "Runner-up #4", formula: "W5 + R4" },
      { id: "team-6", name: "Team 6", duo: "Winner #6 + Runner-up #3", p1Seed: "Winner #6", p2Seed: "Runner-up #3", formula: "W6 + R3" },
      { id: "team-7", name: "Team 7", duo: "Winner #7 + Runner-up #2", p1Seed: "Winner #7", p2Seed: "Runner-up #2", formula: "W7 + R2" },
      { id: "team-8", name: "Team 8", duo: "Winner #8 + Runner-up #1", p1Seed: "Winner #8", p2Seed: "Runner-up #1", formula: "W8 + R1" }
    ],
    groups: [
      {
            "id": "group-a",
            "name": "Group A",
            "court": "Court 1",
            "players": [
                  "Slot 1",
                  "Slot 2",
                  "Slot 3",
                  "Slot 4"
            ],
            "matches": [
                  {
                        "round": "Round 1",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 2",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 3",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 4",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 5",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 6",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  }
            ],
            "standings": [
                  {
                        "rank": 1,
                        "name": "Slot 1",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 2,
                        "name": "Slot 2",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 3,
                        "name": "Slot 3",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 4,
                        "name": "Slot 4",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  }
            ]
      },
      {
            "id": "group-b",
            "name": "Group B",
            "court": "Court 2",
            "players": [
                  "Slot 1",
                  "Slot 2",
                  "Slot 3",
                  "Slot 4"
            ],
            "matches": [
                  {
                        "round": "Round 1",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 2",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 3",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 4",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 5",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 6",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  }
            ],
            "standings": [
                  {
                        "rank": 1,
                        "name": "Slot 1",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 2,
                        "name": "Slot 2",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 3,
                        "name": "Slot 3",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 4,
                        "name": "Slot 4",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  }
            ]
      },
      {
            "id": "group-c",
            "name": "Group C",
            "court": "Court 3",
            "players": [
                  "Slot 1",
                  "Slot 2",
                  "Slot 3",
                  "Slot 4"
            ],
            "matches": [
                  {
                        "round": "Round 1",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 2",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 3",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 4",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 5",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 6",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  }
            ],
            "standings": [
                  {
                        "rank": 1,
                        "name": "Slot 1",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 2,
                        "name": "Slot 2",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 3,
                        "name": "Slot 3",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 4,
                        "name": "Slot 4",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  }
            ]
      },
      {
            "id": "group-d",
            "name": "Group D",
            "court": "Court 4",
            "players": [
                  "Slot 1",
                  "Slot 2",
                  "Slot 3",
                  "Slot 4"
            ],
            "matches": [
                  {
                        "round": "Round 1",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 2",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 3",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 4",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 5",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 6",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  }
            ],
            "standings": [
                  {
                        "rank": 1,
                        "name": "Slot 1",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 2,
                        "name": "Slot 2",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 3,
                        "name": "Slot 3",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 4,
                        "name": "Slot 4",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  }
            ]
      },
      {
            "id": "group-e",
            "name": "Group E",
            "court": "Court 1",
            "players": [
                  "Slot 1",
                  "Slot 2",
                  "Slot 3",
                  "Slot 4"
            ],
            "matches": [
                  {
                        "round": "Round 1",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 2",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 3",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 4",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 5",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 6",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  }
            ],
            "standings": [
                  {
                        "rank": 1,
                        "name": "Slot 1",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 2,
                        "name": "Slot 2",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 3,
                        "name": "Slot 3",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 4,
                        "name": "Slot 4",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  }
            ]
      },
      {
            "id": "group-f",
            "name": "Group F",
            "court": "Court 2",
            "players": [
                  "Slot 1",
                  "Slot 2",
                  "Slot 3",
                  "Slot 4"
            ],
            "matches": [
                  {
                        "round": "Round 1",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 2",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 3",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 4",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 5",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 6",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  }
            ],
            "standings": [
                  {
                        "rank": 1,
                        "name": "Slot 1",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 2,
                        "name": "Slot 2",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 3,
                        "name": "Slot 3",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 4,
                        "name": "Slot 4",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  }
            ]
      },
      {
            "id": "group-g",
            "name": "Group G",
            "court": "Court 3",
            "players": [
                  "Slot 1",
                  "Slot 2",
                  "Slot 3",
                  "Slot 4"
            ],
            "matches": [
                  {
                        "round": "Round 1",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 2",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 3",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 4",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 5",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 6",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  }
            ],
            "standings": [
                  {
                        "rank": 1,
                        "name": "Slot 1",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 2,
                        "name": "Slot 2",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 3,
                        "name": "Slot 3",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 4,
                        "name": "Slot 4",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  }
            ]
      },
      {
            "id": "group-h",
            "name": "Group H",
            "court": "Court 4",
            "players": [
                  "Slot 1",
                  "Slot 2",
                  "Slot 3",
                  "Slot 4"
            ],
            "matches": [
                  {
                        "round": "Round 1",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 2",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 3",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 4",
                        "pair1": "Slot 1 & Slot 2",
                        "pair2": "Slot 3 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 5",
                        "pair1": "Slot 1 & Slot 3",
                        "pair2": "Slot 2 & Slot 4",
                        "score": "—",
                        "winner": null,
                        "played": false
                  },
                  {
                        "round": "Round 6",
                        "pair1": "Slot 1 & Slot 4",
                        "pair2": "Slot 2 & Slot 3",
                        "score": "—",
                        "winner": null,
                        "played": false
                  }
            ],
            "standings": [
                  {
                        "rank": 1,
                        "name": "Slot 1",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 2,
                        "name": "Slot 2",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 3,
                        "name": "Slot 3",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  },
                  {
                        "rank": 4,
                        "name": "Slot 4",
                        "played": 0,
                        "wins": 0,
                        "losses": 0,
                        "diff": 0,
                        "points": 0,
                        "qualified": false,
                        "advanceTo": "TBD"
                  }
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
          time: "14:00 – 15:00",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 1", duo: "Winner #1 + Runner-up #8", seed: "W1 + R8" },
          team2: { name: "Team 8", duo: "Winner #8 + Runner-up #1", seed: "W8 + R1" },
          score: "—",
          games: [],
          winner: null,
          status: "upcoming"
        },
        {
          id: "QF-2",
          name: "Quarterfinal 2",
          court: "Court 2",
          time: "14:00 – 15:00",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 4", duo: "Winner #4 + Runner-up #5", seed: "W4 + R5" },
          team2: { name: "Team 5", duo: "Winner #5 + Runner-up #4", seed: "W5 + R4" },
          score: "—",
          games: [],
          winner: null,
          status: "upcoming"
        },
        {
          id: "QF-3",
          name: "Quarterfinal 3",
          court: "Court 3",
          time: "14:00 – 15:00",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 2", duo: "Winner #2 + Runner-up #7", seed: "W2 + R7" },
          team2: { name: "Team 7", duo: "Winner #7 + Runner-up #2", seed: "W7 + R2" },
          score: "—",
          games: [],
          winner: null,
          status: "upcoming"
        },
        {
          id: "QF-4",
          name: "Quarterfinal 4",
          court: "Court 4",
          time: "14:00 – 15:00",
          format: "Best of 3 (BO3)",
          team1: { name: "Team 3", duo: "Winner #3 + Runner-up #6", seed: "W3 + R6" },
          team2: { name: "Team 6", duo: "Winner #6 + Runner-up #3", seed: "W6 + R3" },
          score: "—",
          games: [],
          winner: null,
          status: "upcoming"
        }
      ],
      semifinals: [
        {
          id: "SF-1",
          name: "Championship Semifinal 1",
          court: "Court 1",
          time: "15:00 – 16:00",
          format: "Best of 3 (BO3)",
          team1: { name: "Winner QF1", duo: "TBD", seed: "Winner QF1" },
          team2: { name: "Winner QF2", duo: "TBD", seed: "Winner QF2" },
          score: "—",
          games: [],
          winner: null,
          status: "upcoming"
        },
        {
          id: "SF-2",
          name: "Championship Semifinal 2",
          court: "Court 2",
          time: "15:00 – 16:00",
          format: "Best of 3 (BO3)",
          team1: { name: "Winner QF3", duo: "TBD", seed: "Winner QF3" },
          team2: { name: "Winner QF4", duo: "TBD", seed: "Winner QF4" },
          score: "—",
          games: [],
          winner: null,
          status: "upcoming"
        }
      ],
      grandFinal: {
        id: "F-GOLD",
        title: "🥇 Grand Championship Final",
        badge: "Championship Trophy & Gold Medal",
        badgeColor: "bg-amber-100 text-amber-950 border-amber-300",
        court: "Court 1 (Main Stage)",
        time: "16:00 – 17:00",
        format: "Best of 5 (BO5) · First to 3 sets to 11",
        team1: { name: "Winner SF1", duo: "TBD", seed: "Winner SF1" },
        team2: { name: "Winner SF2", duo: "TBD", seed: "Winner SF2" },
        score: "—",
        games: [],
        winner: null,
        status: "upcoming"
      },
      podium: [
        { place: 1, medal: "🥇 Champions", team: "TBD", players: "To be determined" },
        { place: 2, medal: "🥈 Runners-up", team: "TBD", players: "To be determined" },
        { place: 3, medal: "Semifinalists", team: "TBD", players: "To be determined" }
      ]
    }
  },

  "team-games": {
    id: "team-games",
    title: "Team Games: 8 Teams (2 Men + 2 Women)",
    shortTitle: "Team Games",
    host: "Ho & Eugen",
    day: "Sunday, Oct 4",
    time: "19:00 – 22:00",
    courts: "Courts 1, 2, 3, 4",
    format: "MLP Format: 2 Groups (Round-Robin) → Semifinals → Grand Final",
    playersCount: 32,
    teamsCount: 8,
    groupsCount: 2,
    advanceCount: 2,
    isDrawCompleted: false,
    description: "8 фиксированных команд: участники заявляются готовыми командами по 4 человека (2 парня и 2 девушки). 2 группы по 4 команды. Корзины посева команд (Pots 1–4) используются исключительно для равномерной жеребьевки команд по Группам A и B (из каждой корзины 1 команда в Группу A, 1 в Группу B). Каждая команда проводит состязание со всеми соперниками в своей группе. Каждое состязание состоит из 4 обязательных матчей: 1) Мужская пара (парни играют между собой), 2) Женская пара (девушки играют между собой), 3) 1-й микс, 4) 2-й микс. Топ-2 команды из каждой группы выходят в Полуфинал (SF1 и SF2). Полуфинал и Финал — также по 1 состязанию (4 матча).",
    pots: {
      teamPots: [
        {
          id: "pot-1",
          name: "Корзина 1: Сеяные лидеры (Top Seeds)",
          badge: "bg-amber-100 text-amber-900 border-amber-300",
          description: "1 команда жеребится в Группу A, 1 команда в Группу B",
          teams: [
            { id: "team-1", name: "Team 1", seed: 1, label: "Top Seed #1" },
            { id: "team-2", name: "Team 2", seed: 2, label: "Top Seed #2" }
          ]
        },
        {
          id: "pot-2",
          name: "Корзина 2: Претенденты (Contenders)",
          badge: "bg-blue-100 text-blue-900 border-blue-300",
          description: "1 команда жеребится в Группу A, 1 команда в Группу B",
          teams: [
            { id: "team-3", name: "Team 3", seed: 3, label: "Seed #3" },
            { id: "team-4", name: "Team 4", seed: 4, label: "Seed #4" }
          ]
        },
        {
          id: "pot-3",
          name: "Корзина 3: Квалификация (Challengers)",
          badge: "bg-emerald-100 text-emerald-900 border-emerald-300",
          description: "1 команда жеребится в Группу A, 1 команда в Группу B",
          teams: [
            { id: "team-5", name: "Team 5", seed: 5, label: "Seed #5" },
            { id: "team-6", name: "Team 6", seed: 6, label: "Seed #6" }
          ]
        },
        {
          id: "pot-4",
          name: "Корзина 4: Андердоги (Dark Horses)",
          badge: "bg-purple-100 text-purple-900 border-purple-300",
          description: "1 команда жеребится в Группу A, 1 команда в Группу B",
          teams: [
            { id: "team-7", name: "Team 7", seed: 7, label: "Seed #7" },
            { id: "team-8", name: "Team 8", seed: 8, label: "Seed #8" }
          ]
        }
      ]
    },
    teams: [
      {
        id: "team-1",
        name: "Team 1",
        pot: "Pot 1",
        group: "Group A",
        seed: 1,
        men: ["Man 1", "Man 9"],
        women: ["Woman 1", "Woman 9"],
        mix1: "Man 1 & Woman 1",
        mix2: "Man 9 & Woman 9"
      },
      {
        id: "team-2",
        name: "Team 2",
        pot: "Pot 1",
        group: "Group B",
        seed: 2,
        men: ["Man 2", "Man 10"],
        women: ["Woman 2", "Woman 10"],
        mix1: "Man 2 & Woman 2",
        mix2: "Man 10 & Woman 10"
      },
      {
        id: "team-3",
        name: "Team 3",
        pot: "Pot 2",
        group: "Group A",
        seed: 3,
        men: ["Man 3", "Man 11"],
        women: ["Woman 3", "Woman 11"],
        mix1: "Man 3 & Woman 3",
        mix2: "Man 11 & Woman 11"
      },
      {
        id: "team-4",
        name: "Team 4",
        pot: "Pot 2",
        group: "Group B",
        seed: 4,
        men: ["Man 4", "Man 12"],
        women: ["Woman 4", "Woman 12"],
        mix1: "Man 4 & Woman 4",
        mix2: "Man 12 & Woman 12"
      },
      {
        id: "team-5",
        name: "Team 5",
        pot: "Pot 3",
        group: "Group A",
        seed: 5,
        men: ["Man 5", "Man 13"],
        women: ["Woman 5", "Woman 13"],
        mix1: "Man 5 & Woman 5",
        mix2: "Man 13 & Woman 13"
      },
      {
        id: "team-6",
        name: "Team 6",
        pot: "Pot 3",
        group: "Group B",
        seed: 6,
        men: ["Man 6", "Man 14"],
        women: ["Woman 6", "Woman 14"],
        mix1: "Man 6 & Woman 6",
        mix2: "Man 14 & Woman 14"
      },
      {
        id: "team-7",
        name: "Team 7",
        pot: "Pot 4",
        group: "Group A",
        seed: 7,
        men: ["Man 7", "Man 15"],
        women: ["Woman 7", "Woman 15"],
        mix1: "Man 7 & Woman 7",
        mix2: "Man 15 & Woman 15"
      },
      {
        id: "team-8",
        name: "Team 8",
        pot: "Pot 4",
        group: "Group B",
        seed: 8,
        men: ["Man 8", "Man 16"],
        women: ["Woman 8", "Woman 16"],
        mix1: "Man 8 & Woman 8",
        mix2: "Man 16 & Woman 16"
      }
    ],
    groups: [
      {
        id: "group-a",
        name: "Group A",
        courts: "Courts 1 & 2",
        court: "Courts 1 & 2",
        teams: ["Team 1", "Team 3", "Team 5", "Team 7"],
        standings: [
          { rank: 1, name: "Team 1", played: 0, tiesWon: 0, tiesLost: 0, gamesWon: 0, gamesLost: 0, diff: 0, points: 0, advanceTo: "Semifinal 1 (A1)", qualified: true },
          { rank: 2, name: "Team 3", played: 0, tiesWon: 0, tiesLost: 0, gamesWon: 0, gamesLost: 0, diff: 0, points: 0, advanceTo: "Semifinal 2 (A2)", qualified: true },
          { rank: 3, name: "Team 5", played: 0, tiesWon: 0, tiesLost: 0, gamesWon: 0, gamesLost: 0, diff: 0, points: 0, advanceTo: "Group Stage", qualified: false },
          { rank: 4, name: "Team 7", played: 0, tiesWon: 0, tiesLost: 0, gamesWon: 0, gamesLost: 0, diff: 0, points: 0, advanceTo: "Group Stage", qualified: false }
        ],
        encounters: [
          // Round 1 (19:00 - 19:40)
          {
            id: "GA-R1-E1",
            round: "Round 1",
            time: "19:00 – 19:40",
            court: "Court 1",
            team1: "Team 1",
            team2: "Team 3",
            tieScore: "—",
            winner: null,
            games: [
              { id: "GA-R1-E1-G1", type: "MD", label: "1. Парни (Men's Doubles)", pair1: "Team 1 Men", pair2: "Team 3 Men", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R1-E1-G2", type: "WD", label: "2. Девушки (Women's Doubles)", pair1: "Team 1 Women", pair2: "Team 3 Women", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R1-E1-G3", type: "MXD1", label: "3. 1-й Микс (Mix 1)", pair1: "Team 1 Mix 1", pair2: "Team 3 Mix 1", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R1-E1-G4", type: "MXD2", label: "4. 2-й Микс (Mix 2)", pair1: "Team 1 Mix 2", pair2: "Team 3 Mix 2", format: "1 Set to 11", score: "—", winner: null }
            ]
          },
          {
            id: "GA-R1-E2",
            round: "Round 1",
            time: "19:00 – 19:40",
            court: "Court 2",
            team1: "Team 5",
            team2: "Team 7",
            tieScore: "—",
            winner: null,
            games: [
              { id: "GA-R1-E2-G1", type: "MD", label: "1. Парни (Men's Doubles)", pair1: "Team 5 Men", pair2: "Team 7 Men", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R1-E2-G2", type: "WD", label: "2. Девушки (Women's Doubles)", pair1: "Team 5 Women", pair2: "Team 7 Women", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R1-E2-G3", type: "MXD1", label: "3. 1-й Микс (Mix 1)", pair1: "Team 5 Mix 1", pair2: "Team 7 Mix 1", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R1-E2-G4", type: "MXD2", label: "4. 2-й Микс (Mix 2)", pair1: "Team 5 Mix 2", pair2: "Team 7 Mix 2", format: "1 Set to 11", score: "—", winner: null }
            ]
          },
          // Round 2 (19:40 - 20:20)
          {
            id: "GA-R2-E3",
            round: "Round 2",
            time: "19:40 – 20:20",
            court: "Court 1",
            team1: "Team 1",
            team2: "Team 5",
            tieScore: "—",
            winner: null,
            games: [
              { id: "GA-R2-E3-G1", type: "MD", label: "1. Парни (Men's Doubles)", pair1: "Team 1 Men", pair2: "Team 5 Men", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R2-E3-G2", type: "WD", label: "2. Девушки (Women's Doubles)", pair1: "Team 1 Women", pair2: "Team 5 Women", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R2-E3-G3", type: "MXD1", label: "3. 1-й Микс (Mix 1)", pair1: "Team 1 Mix 1", pair2: "Team 5 Mix 1", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R2-E3-G4", type: "MXD2", label: "4. 2-й Микс (Mix 2)", pair1: "Team 1 Mix 2", pair2: "Team 5 Mix 2", format: "1 Set to 11", score: "—", winner: null }
            ]
          },
          {
            id: "GA-R2-E4",
            round: "Round 2",
            time: "19:40 – 20:20",
            court: "Court 2",
            team1: "Team 3",
            team2: "Team 7",
            tieScore: "—",
            winner: null,
            games: [
              { id: "GA-R2-E4-G1", type: "MD", label: "1. Парни (Men's Doubles)", pair1: "Team 3 Men", pair2: "Team 7 Men", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R2-E4-G2", type: "WD", label: "2. Девушки (Women's Doubles)", pair1: "Team 3 Women", pair2: "Team 7 Women", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R2-E4-G3", type: "MXD1", label: "3. 1-й Микс (Mix 1)", pair1: "Team 3 Mix 1", pair2: "Team 7 Mix 1", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R2-E4-G4", type: "MXD2", label: "4. 2-й Микс (Mix 2)", pair1: "Team 3 Mix 2", pair2: "Team 7 Mix 2", format: "1 Set to 11", score: "—", winner: null }
            ]
          },
          // Round 3 (20:20 - 21:00)
          {
            id: "GA-R3-E5",
            round: "Round 3",
            time: "20:20 – 21:00",
            court: "Court 1",
            team1: "Team 1",
            team2: "Team 7",
            tieScore: "—",
            winner: null,
            games: [
              { id: "GA-R3-E5-G1", type: "MD", label: "1. Парни (Men's Doubles)", pair1: "Team 1 Men", pair2: "Team 7 Men", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R3-E5-G2", type: "WD", label: "2. Девушки (Women's Doubles)", pair1: "Team 1 Women", pair2: "Team 7 Women", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R3-E5-G3", type: "MXD1", label: "3. 1-й Микс (Mix 1)", pair1: "Team 1 Mix 1", pair2: "Team 7 Mix 1", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R3-E5-G4", type: "MXD2", label: "4. 2-й Микс (Mix 2)", pair1: "Team 1 Mix 2", pair2: "Team 7 Mix 2", format: "1 Set to 11", score: "—", winner: null }
            ]
          },
          {
            id: "GA-R3-E6",
            round: "Round 3",
            time: "20:20 – 21:00",
            court: "Court 2",
            team1: "Team 3",
            team2: "Team 5",
            tieScore: "—",
            winner: null,
            games: [
              { id: "GA-R3-E6-G1", type: "MD", label: "1. Парни (Men's Doubles)", pair1: "Team 3 Men", pair2: "Team 5 Men", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R3-E6-G2", type: "WD", label: "2. Девушки (Women's Doubles)", pair1: "Team 3 Women", pair2: "Team 5 Women", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R3-E6-G3", type: "MXD1", label: "3. 1-й Микс (Mix 1)", pair1: "Team 3 Mix 1", pair2: "Team 5 Mix 1", format: "1 Set to 11", score: "—", winner: null },
              { id: "GA-R3-E6-G4", type: "MXD2", label: "4. 2-й Микс (Mix 2)", pair1: "Team 3 Mix 2", pair2: "Team 5 Mix 2", format: "1 Set to 11", score: "—", winner: null }
            ]
          }
        ]
      },
      {
        id: "group-b",
        name: "Group B",
        courts: "Courts 3 & 4",
        court: "Courts 3 & 4",
        teams: ["Team 2", "Team 4", "Team 6", "Team 8"],
        standings: [
          { rank: 1, name: "Team 2", played: 0, tiesWon: 0, tiesLost: 0, gamesWon: 0, gamesLost: 0, diff: 0, points: 0, advanceTo: "Semifinal 2 (B1)", qualified: true },
          { rank: 2, name: "Team 4", played: 0, tiesWon: 0, tiesLost: 0, gamesWon: 0, gamesLost: 0, diff: 0, points: 0, advanceTo: "Semifinal 1 (B2)", qualified: true },
          { rank: 3, name: "Team 6", played: 0, tiesWon: 0, tiesLost: 0, gamesWon: 0, gamesLost: 0, diff: 0, points: 0, advanceTo: "Group Stage", qualified: false },
          { rank: 4, name: "Team 8", played: 0, tiesWon: 0, tiesLost: 0, gamesWon: 0, gamesLost: 0, diff: 0, points: 0, advanceTo: "Group Stage", qualified: false }
        ],
        encounters: [
          // Round 1 (19:00 - 19:40)
          {
            id: "GB-R1-E1",
            round: "Round 1",
            time: "19:00 – 19:40",
            court: "Court 3",
            team1: "Team 2",
            team2: "Team 4",
            tieScore: "—",
            winner: null,
            games: [
              { id: "GB-R1-E1-G1", type: "MD", label: "1. Парни (Men's Doubles)", pair1: "Team 2 Men", pair2: "Team 4 Men", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R1-E1-G2", type: "WD", label: "2. Девушки (Women's Doubles)", pair1: "Team 2 Women", pair2: "Team 4 Women", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R1-E1-G3", type: "MXD1", label: "3. 1-й Микс (Mix 1)", pair1: "Team 2 Mix 1", pair2: "Team 4 Mix 1", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R1-E1-G4", type: "MXD2", label: "4. 2-й Микс (Mix 2)", pair1: "Team 2 Mix 2", pair2: "Team 4 Mix 2", format: "1 Set to 11", score: "—", winner: null }
            ]
          },
          {
            id: "GB-R1-E2",
            round: "Round 1",
            time: "19:00 – 19:40",
            court: "Court 4",
            team1: "Team 6",
            team2: "Team 8",
            tieScore: "—",
            winner: null,
            games: [
              { id: "GB-R1-E2-G1", type: "MD", label: "1. Парни (Men's Doubles)", pair1: "Team 6 Men", pair2: "Team 8 Men", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R1-E2-G2", type: "WD", label: "2. Девушки (Women's Doubles)", pair1: "Team 6 Women", pair2: "Team 8 Women", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R1-E2-G3", type: "MXD1", label: "3. 1-й Микс (Mix 1)", pair1: "Team 6 Mix 1", pair2: "Team 8 Mix 1", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R1-E2-G4", type: "MXD2", label: "4. 2-й Микс (Mix 2)", pair1: "Team 6 Mix 2", pair2: "Team 8 Mix 2", format: "1 Set to 11", score: "—", winner: null }
            ]
          },
          // Round 2 (19:40 - 20:20)
          {
            id: "GB-R2-E3",
            round: "Round 2",
            time: "19:40 – 20:20",
            court: "Court 3",
            team1: "Team 2",
            team2: "Team 6",
            tieScore: "—",
            winner: null,
            games: [
              { id: "GB-R2-E3-G1", type: "MD", label: "1. Парни (Men's Doubles)", pair1: "Team 2 Men", pair2: "Team 6 Men", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R2-E3-G2", type: "WD", label: "2. Девушки (Women's Doubles)", pair1: "Team 2 Women", pair2: "Team 6 Women", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R2-E3-G3", type: "MXD1", label: "3. 1-й Микс (Mix 1)", pair1: "Team 2 Mix 1", pair2: "Team 6 Mix 1", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R2-E3-G4", type: "MXD2", label: "4. 2-й Микс (Mix 2)", pair1: "Team 2 Mix 2", pair2: "Team 6 Mix 2", format: "1 Set to 11", score: "—", winner: null }
            ]
          },
          {
            id: "GB-R2-E4",
            round: "Round 2",
            time: "19:40 – 20:20",
            court: "Court 4",
            team1: "Team 4",
            team2: "Team 8",
            tieScore: "—",
            winner: null,
            games: [
              { id: "GB-R2-E4-G1", type: "MD", label: "1. Парни (Men's Doubles)", pair1: "Team 4 Men", pair2: "Team 8 Men", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R2-E4-G2", type: "WD", label: "2. Девушки (Women's Doubles)", pair1: "Team 4 Women", pair2: "Team 8 Women", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R2-E4-G3", type: "MXD1", label: "3. 1-й Микс (Mix 1)", pair1: "Team 4 Mix 1", pair2: "Team 8 Mix 1", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R2-E4-G4", type: "MXD2", label: "4. 2-й Микс (Mix 2)", pair1: "Team 4 Mix 2", pair2: "Team 8 Mix 2", format: "1 Set to 11", score: "—", winner: null }
            ]
          },
          // Round 3 (20:20 - 21:00)
          {
            id: "GB-R3-E5",
            round: "Round 3",
            time: "20:20 – 21:00",
            court: "Court 3",
            team1: "Team 2",
            team2: "Team 8",
            tieScore: "—",
            winner: null,
            games: [
              { id: "GB-R3-E5-G1", type: "MD", label: "1. Парни (Men's Doubles)", pair1: "Team 2 Men", pair2: "Team 8 Men", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R3-E5-G2", type: "WD", label: "2. Девушки (Women's Doubles)", pair1: "Team 2 Women", pair2: "Team 8 Women", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R3-E5-G3", type: "MXD1", label: "3. 1-й Микс (Mix 1)", pair1: "Team 2 Mix 1", pair2: "Team 8 Mix 1", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R3-E5-G4", type: "MXD2", label: "4. 2-й Микс (Mix 2)", pair1: "Team 2 Mix 2", pair2: "Team 8 Mix 2", format: "1 Set to 11", score: "—", winner: null }
            ]
          },
          {
            id: "GB-R3-E6",
            round: "Round 3",
            time: "20:20 – 21:00",
            court: "Court 4",
            team1: "Team 4",
            team2: "Team 6",
            tieScore: "—",
            winner: null,
            games: [
              { id: "GB-R3-E6-G1", type: "MD", label: "1. Парни (Men's Doubles)", pair1: "Team 4 Men", pair2: "Team 6 Men", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R3-E6-G2", type: "WD", label: "2. Девушки (Women's Doubles)", pair1: "Team 4 Women", pair2: "Team 6 Women", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R3-E6-G3", type: "MXD1", label: "3. 1-й Микс (Mix 1)", pair1: "Team 4 Mix 1", pair2: "Team 6 Mix 1", format: "1 Set to 11", score: "—", winner: null },
              { id: "GB-R3-E6-G4", type: "MXD2", label: "4. 2-й Микс (Mix 2)", pair1: "Team 4 Mix 2", pair2: "Team 6 Mix 2", format: "1 Set to 11", score: "—", winner: null }
            ]
          }
        ]
      }
    ],
    playoffs: {
      semifinals: [
        {
          id: "TG-SF-1",
          name: "Championship Semifinal 1",
          time: "21:00 – 21:30",
          court: "Courts 1 & 2",
          team1: { name: "Group A Winner (A1)", seed: "1st in Group A" },
          team2: { name: "Group B Runner-up (B2)", seed: "2nd in Group B" },
          tieScore: "—",
          games: [
            { id: "TG-SF1-G1", type: "MD", label: "1. Парни (Court 1)", pair1: "A1 Men", pair2: "B2 Men", format: "1 Set to 11", score: "—" },
            { id: "TG-SF1-G2", type: "WD", label: "2. Девушки (Court 2)", pair1: "A1 Women", pair2: "B2 Women", format: "1 Set to 11", score: "—" },
            { id: "TG-SF1-G3", type: "MXD1", label: "3. 1-й Микс (Court 1)", pair1: "A1 Mix 1", pair2: "B2 Mix 1", format: "1 Set to 11", score: "—" },
            { id: "TG-SF1-G4", type: "MXD2", label: "4. 2-й Микс (Court 2)", pair1: "A1 Mix 2", pair2: "B2 Mix 2", format: "1 Set to 11", score: "—" }
          ]
        },
        {
          id: "TG-SF-2",
          name: "Championship Semifinal 2",
          time: "21:00 – 21:30",
          court: "Courts 3 & 4",
          team1: { name: "Group B Winner (B1)", seed: "1st in Group B" },
          team2: { name: "Group A Runner-up (A2)", seed: "2nd in Group A" },
          tieScore: "—",
          games: [
            { id: "TG-SF2-G1", type: "MD", label: "1. Парни (Court 3)", pair1: "B1 Men", pair2: "A2 Men", format: "1 Set to 11", score: "—" },
            { id: "TG-SF2-G2", type: "WD", label: "2. Девушки (Court 4)", pair1: "B1 Women", pair2: "A2 Women", format: "1 Set to 11", score: "—" },
            { id: "TG-SF2-G3", type: "MXD1", label: "3. 1-й Микс (Court 3)", pair1: "B1 Mix 1", pair2: "A2 Mix 1", format: "1 Set to 11", score: "—" },
            { id: "TG-SF2-G4", type: "MXD2", label: "4. 2-й Микс (Court 4)", pair1: "B1 Mix 2", pair2: "A2 Mix 2", format: "1 Set to 11", score: "—" }
          ]
        }
      ],
      grandFinal: {
        id: "TG-FINAL",
        title: "🥇 Grand Championship Final",
        badge: "Team Trophy & Gold Medals",
        time: "21:30 – 22:00",
        court: "Courts 1 & 2",
        team1: { name: "Winner Semifinal 1", seed: "Winner SF1" },
        team2: { name: "Winner Semifinal 2", seed: "Winner SF2" },
        tieScore: "—",
        games: [
          { id: "TG-F-G1", type: "MD", label: "1. Парни (Court 1)", pair1: "Finalist 1 Men", pair2: "Finalist 2 Men", format: "1 Set to 11", score: "—" },
          { id: "TG-F-G2", type: "WD", label: "2. Девушки (Court 2)", pair1: "Finalist 1 Women", pair2: "Finalist 2 Women", format: "1 Set to 11", score: "—" },
          { id: "TG-F-G3", type: "MXD1", label: "3. 1-й Микс (Court 1)", pair1: "Finalist 1 Mix 1", pair2: "Finalist 2 Mix 1", format: "1 Set to 11", score: "—" },
          { id: "TG-F-G4", type: "MXD2", label: "4. 2-й Микс (Court 2)", pair1: "Finalist 1 Mix 2", pair2: "Finalist 2 Mix 2", format: "1 Set to 11", score: "—" }
        ]
      },
      bronzeMatch: {
        id: "TG-BRONZE",
        title: "🥉 Bronze Medal Match",
        badge: "Bronze Medals",
        time: "21:30 – 22:00",
        court: "Courts 3 & 4",
        team1: { name: "Runner-up Semifinal 1", seed: "Runner-up SF1" },
        team2: { name: "Runner-up Semifinal 2", seed: "Runner-up SF2" },
        tieScore: "—",
        games: [
          { id: "TG-B-G1", type: "MD", label: "1. Парни (Court 3)", pair1: "SF1 Loser Men", pair2: "SF2 Loser Men", format: "1 Set to 11", score: "—" },
          { id: "TG-B-G2", type: "WD", label: "2. Девушки (Court 4)", pair1: "SF1 Loser Women", pair2: "SF2 Loser Women", format: "1 Set to 11", score: "—" },
          { id: "TG-B-G3", type: "MXD1", label: "3. 1-й Микс (Court 3)", pair1: "SF1 Loser Mix 1", pair2: "SF2 Loser Mix 1", format: "1 Set to 11", score: "—" },
          { id: "TG-B-G4", type: "MXD2", label: "4. 2-й Микс (Court 4)", pair1: "SF1 Loser Mix 2", pair2: "SF2 Loser Mix 2", format: "1 Set to 11", score: "—" }
        ]
      },
      podium: [
        { place: 1, medal: "🥇 Champions", team: "TBD", subtitle: "Gold Trophy & Medals (4 Players)" },
        { place: 2, medal: "🥈 Runners-up", team: "TBD", subtitle: "Silver Medals (4 Players)" },
        { place: 3, medal: "🥉 Bronze Medalists", team: "TBD", subtitle: "Bronze Medals (4 Players)" }
      ]
    }
  }
};

TOURNAMENT_CONFIG.brackets = TOURNAMENT_BRACKETS;

/**
 * ==============================================================================
 * NOI EXPAT OPEN — TOURNAMENT SCHEDULE DATA
 * ==============================================================================
 */

const TOURNAMENT_CONFIG = {
  title: "NOI EXPAT OPEN",
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
      badge: "bg-amber-500 text-stone-950 font-black tracking-wider shadow-2xs",
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

        // 15:30 - 19:00 Prime Division (4.0+) (Courts 3 & 4 combined)
        {
          id: "d2-c3c4-prime",
          courtId: "c3",
          courtIds: ["c3", "c4"],
          courtSpan: 2,
          courtLabel: "Courts 3 & 4",
          start: "15:30",
          end: "19:00",
          title: "Prime Division (4.0+)",
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

        // 19:00 - 22:00 The Grand Kitchen Party (Courts 1 & 2 combined)
        {
          id: "d2-c1c2-kitchen",
          courtId: "c1",
          courtIds: ["c1", "c2"],
          courtSpan: 2,
          courtLabel: "Courts 1 & 2",
          start: "19:00",
          end: "22:00",
          title: "The Grand Kitchen Party",
          host: "TBA",
          logo: "002.svg",
          reclubUrl: "",
          category: "social",
          status: "occupied"
        },

        // 19:00 - 22:00 The Grand Kitchen Party (Court 4 - Picklehead)
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
  }
};

TOURNAMENT_CONFIG.brackets = TOURNAMENT_BRACKETS;

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
      title: "Day 1 — Saturday",
      dateFormatted: "Saturday • Day 1",
      schedule: [
        // 11:30 - 15:30 Mixed Doubles: Max 5.2 Cap (Courts 1, 2, 3, 4)
        {
          id: "d1-c1-mixed-52",
          courtId: "c1",
          start: "11:30",
          end: "15:30",
          title: "Mixed Doubles: Max 5.2 Cap",
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
          logo: "placeholder.svg",
          reclubUrl: "",
          category: "social",
          status: "planned"
        },
        {
          id: "d1-c2-sunset-social",
          courtId: "c2",
          start: "19:00",
          end: "22:00",
          title: "Noi Sunset Social",
          logo: "placeholder.svg",
          reclubUrl: "",
          category: "social",
          status: "planned"
        },
        {
          id: "d1-c3-sunset-social",
          courtId: "c3",
          start: "19:00",
          end: "22:00",
          title: "Noi Sunset Social",
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
      title: "Day 2 — Sunday",
      dateFormatted: "Sunday • Day 2",
      schedule: [
        // 11:00 - 16:00 Picklehead Cup (Courts 1, 2, 3, 4)
        {
          id: "d2-c1-picklehead",
          courtId: "c1",
          start: "11:00",
          end: "16:00",
          title: "Picklehead Main Stage: Individual Doubles (2.5–3.0)",
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
          logo: "placeholder.svg",
          reclubUrl: "",
          category: "social",
          status: "planned"
        }
      ]
    }
  ]
};

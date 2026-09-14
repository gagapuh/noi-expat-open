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
        // 10:00–16:00 Picklehead Main Stage (Courts 1–4, staggered finish)
        {
          id: "d2-c1c4-picklehead",
          courtId: "c1",
          courtIds: ["c1", "c2", "c3", "c4"],
          courtSpan: 4,
          courtLabel: "Courts 1–4",
          start: "10:00",
          end: "16:00",
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
            { courtId: "c1", courtName: "Court 1", start: "10:00", end: "16:00" },
            { courtId: "c2", courtName: "Court 2", start: "10:00", end: "15:00" },
            { courtId: "c3", courtName: "Court 3", start: "10:00", end: "14:00" },
            { courtId: "c4", courtName: "Court 4", start: "10:00", end: "14:00" }
          ]
        },

        // 14:00 - 18:00 Prime Division (Courts 3 & 4 combined)
        {
          id: "d2-c3c4-prime",
          courtId: "c3",
          courtIds: ["c3", "c4"],
          courtSpan: 2,
          start: "14:00",
          end: "18:00",
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

        // 16:00 - 18:00 Fun Event "King & Queen" (Court 1) — temporarily hidden
        {
          id: "d2-c1-king-queen",
          hidden: true,
          courtId: "c1",
          start: "16:00",
          end: "18:00",
          title: "King & Queen",
          subtitle: "",
          host: "Open Play",
          category: "social",
          badgeText: "Fun Event",
          badgeClass: "bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black tracking-wider shadow-2xs",
          borderClass: "border-transparent",
          status: "occupied",
          icon: "crown",
          rulesModal: "king-queen-rules"
        },

        // 18:00 - 22:00 Team Games (Courts 1–4 combined)
        {
          id: "d2-c1c4-team-games",
          courtId: "c1",
          courtIds: ["c1", "c2", "c3", "c4"],
          courtSpan: 4,
          courtLabel: "Courts 1–4",
          start: "18:00",
          end: "22:00",
          title: "Team Games",
          subtitle: "Multi-Discipline Team Matches (MD · WD · MXD) · Max 10.5 Combined Rating",
          host: "Artem",
          playersLabel: "Teams",
          playersCount: "0/8",
          isDupr: true,
          duprStatus: "To Be Confirmed",
          bracketId: "team-games",
          logo: "002.svg",
          reclubUrl: "",
          category: "tournament",
          status: "occupied",
          staggeredCourts: [
            { courtId: "c1", courtName: "Court 1", start: "18:00", end: "22:00" },
            { courtId: "c2", courtName: "Court 2", start: "18:00", end: "22:00" },
            { courtId: "c3", courtName: "Court 3", start: "18:00", end: "22:00" },
            { courtId: "c4", courtName: "Court 4", start: "18:00", end: "22:00" }
          ]
        }
      ]
    }
  ]
};

/**
 * ==============================================================================
 * EVENT RULES & INSTRUCTIONS (EN · VI · ES · RU)
 * ==============================================================================
 */
const EVENT_RULES = {
  "king-queen-rules": {
    id: "king-queen-rules",
    court: "Court 1",
    time: "16:00 – 18:00",
    en: {
      langName: "English",
      badge: "Court 1 · 16:00 – 18:00 · Fun Event",
      title: "King & Queen of the Court",
      subtitle: "",
      overview: "A continuous, high-tempo format where challenger pairs battle to dethrone the reigning King & Queen. To conquer the Throne, Challengers must win TWO consecutive serves!",
      sections: [
        {
          title: "Court Roles & Setup",
          icon: "users",
          items: [
            {
              label: "The Throne Side",
              text: "King (M) + Queen (F). The reigning pair defending the court together against incoming challengers until defeated."
            },
            {
              label: "The Challenger Side",
              text: "<strong>«Senior»</strong> (entered 1 rally ago) + <strong>«Junior»</strong> (just rotated in from the queue)."
            },
            {
              label: "The Queue",
              text: "Single FIFO line waiting behind the Challenger side baseline (first in, first out)."
            }
          ]
        },
        {
          title: "Rally Outcomes & Rotation",
          icon: "refresh-cw",
          cards: [
            {
              type: "loss",
              badge: "Scenario 1: Challengers Lose Rally",
              badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
              title: "King & Queen Defend the Throne",
              steps: [
                "The King and Queen remain on the Throne side, <strong>but swap sides between themselves</strong>.",
                "The <strong>«Senior»</strong> challenger exits to the end of the queue (time is up via FIFO).",
                "The <strong>«Junior»</strong> challenger is promoted to <strong>«Senior»</strong>.",
                "The next player in line enters the court to take the <strong>«Junior»</strong> spot."
              ]
            },
            {
              type: "win",
              badge: "Scenario 2: Challengers Win (Two Serves)",
              badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
              title: "Win 2 Serves to Ascend the Throne",
              steps: [
                "To dethrone a King or Queen, Challengers must win <strong>TWO consecutive serves</strong>:",
                "1. First serve: Challengers serve from the <strong>Right side (Junior)</strong>.",
                "2. If scored → Serve passes to the <strong>Senior (Left side)</strong>.",
                "3. If Challengers win the 2nd serve → <strong>Senior ascends to the Throne</strong> (Male replaces King, Female replaces Queen; ousted player goes to queue, opposite gender remains).",
                "The <strong>«Junior»</strong> challenger promotes to <strong>«Senior»</strong>; next in queue enters as <strong>«Junior»</strong>."
              ]
            }
          ]
        },
        {
          title: "Serving & Court Positioning",
          icon: "target",
          items: [
            {
              label: "Two Serves to Dethrone",
              icon: "zap",
              text: "Challengers must win 2 consecutive serves to take the Throne: 1st serve from the Right (Junior), 2nd serve from the Left (Senior)."
            },
            {
              label: "Junior Entry Position",
              icon: "log-in",
              text: "The Junior always steps into the court position corresponding to an <strong>even score</strong> (Right side / Deuce court)."
            },
            {
              label: "Kings Defense Swap",
              icon: "arrow-left-right",
              text: "When the King and Queen defend or score, they <strong>remain on the Throne and swap sides</strong> between themselves."
            },
            {
              label: "Court Rebalancing on Exit",
              icon: "shuffle",
              text: "If the Senior Challenger exits from the <strong>odd-number court position</strong> (Left side / Ad court), the Junior shifts into that spot and becomes the Senior."
            }
          ]
        }
      ]
    },
    vi: {
      langName: "Tiếng Việt",
      badge: "Sân 1 · 16:00 – 18:00 · Giao lưu vui vẻ",
      title: "Vua & Nữ Hoàng (King & Queen)",
      subtitle: "",
      overview: "Thể thức đánh đôi tốc độ cao và giao lưu hấp dẫn. Các cặp thách đấu liên tục vào sân để chinh phục Ngai Vàng. Để soán ngôi, bên Thách Đấu phải thắng HAI lượt giao bóng liên tiếp!",
      sections: [
        {
          title: "Vai trò trên sân & Sắp xếp",
          icon: "users",
          items: [
            {
              label: "Bên Ngai Vàng",
              text: "Vua (Nam) + Nữ Hoàng (Nữ). Cặp đôi đương nhiệm cùng nhau phòng thủ và bảo vệ Ngai Vàng trước các cặp thách đấu."
            },
            {
              label: "Bên Thách Đấu",
              text: "<strong>«Người Cũ» (Senior)</strong> (đã vào sân 1 pha bóng trước) + <strong>«Người Mới» (Junior)</strong> (vừa từ hàng chờ bước vào sân)."
            },
            {
              label: "Hàng Chờ (Queue)",
              text: "Một hàng đơn duy nhất xếp sau vạch cuối sân bên Thách Đấu theo luật FIFO (vào trước — ra trước)."
            }
          ]
        },
        {
          title: "Kết quả pha bóng & Luân chuyển",
          icon: "refresh-cw",
          cards: [
            {
              type: "loss",
              badge: "Kịch bản 1: Bên Thách Đấu thua pha bóng",
              badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
              title: "Vua & Nữ Hoàng bảo vệ thành công Ngai Vàng",
              steps: [
                "Vua và Nữ Hoàng tiếp tục giữ Ngai Vàng, <strong>nhưng đổi bên sân cho nhau</strong>.",
                "Người <strong>«Cũ» (Senior)</strong> rời sân về cuối hàng chờ (hết lượt theo nguyên tắc FIFO).",
                "Người <strong>«Mới» (Junior)</strong> được thăng cấp thành <strong>«Người Cũ» (Senior)</strong>.",
                "Người tiếp theo trong hàng chờ bước vào sân ở vị trí <strong>«Người Mới» (Junior)</strong>."
              ]
            },
            {
              type: "win",
              badge: "Kịch bản 2: Bên Thách Đấu thắng (Hai lượt giao bóng)",
              badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
              title: "Thắng 2 lượt giao bóng để chiếm Ngai Vàng",
              steps: [
                "Để soán ngôi Vua hoặc Nữ Hoàng, bên Thách Đấu cần thắng <strong>HAI lượt giao bóng</strong> liên tiếp:",
                "1. Lượt 1: Thách Đấu giao bóng từ <strong>bên Phải (Junior)</strong>.",
                "2. Nếu ghi điểm → Quyền giao bóng chuyển cho <strong>Người Cũ (Senior) ở bên Trái</strong>.",
                "3. Nếu thắng lượt 2 → <strong>Người Cũ chiếm Ngai Vàng</strong> (Nam thay Vua, Nữ thay Nữ Hoàng; người bị soán ngôi về hàng chờ, người khác giới tính giữ nguyên).",
                "Người <strong>«Mới» (Junior)</strong> thăng cấp thành <strong>«Người Cũ» (Senior)</strong>; người tiếp theo vào vị trí <strong>«Junior»</strong>."
              ]
            }
          ]
        },
        {
          title: "Giao bóng & Định vị trên sân",
          icon: "target",
          items: [
            {
              label: "Hai lượt giao bóng soán ngôi",
              icon: "zap",
              text: "Thách Đấu phải thắng 2 lượt giao bóng liên tiếp: Lượt 1 bên Phải (Junior), lượt 2 bên Trái (Senior)."
            },
            {
              label: "Vị trí Junior vào sân",
              icon: "log-in",
              text: "Junior luôn vào sân ở vị trí giao bóng với <strong>điểm số chẵn</strong> (Bên phải / Ô Deuce court)."
            },
            {
              label: "Bên Ngai Vàng đổi vị trí",
              icon: "arrow-left-right",
              text: "Khi Vua và Nữ Hoàng phòng thủ thành công hoặc ghi điểm, họ <strong>giữ Ngai Vàng và đổi bên sân cho nhau</strong>."
            },
            {
              label: "Điều chỉnh vị trí khi rời sân",
              icon: "shuffle",
              text: "Nếu Người Cũ rời sân từ <strong>vị trí điểm lẻ</strong> (Bên trái / Ô Ad court), Junior sẽ bước sang vị trí đó và trở thành Senior."
            }
          ]
        }
      ]
    },
    es: {
      langName: "Español",
      badge: "Pista 1 · 16:00 – 18:00 · Evento Social",
      title: "Rey y Reina de la Pista (King & Queen)",
      subtitle: "",
      overview: "Formato dinámico y continuo donde las parejas aspirantes compiten por conquistar el Trono. ¡Para destronar al Rey o la Reina, los Aspirantes deben ganar DOS saques consecutivos!",
      sections: [
        {
          title: "Roles en la Pista y Disposición",
          icon: "users",
          items: [
            {
              label: "Lado del Trono",
              text: "Rey (M) + Reina (F). Pareja campeona reinante que defiende la pista junta frente a las parejas retadoras."
            },
            {
              label: "Lado de los Aspirantes",
              text: "<strong>«Veterano» (Senior)</strong> (entró hace 1 punto) + <strong>«Júnior» (Junior)</strong> (acaba de entrar desde la fila)."
            },
            {
              label: "La Fila de Espera",
              text: "Una única fila detrás de la línea de fondo en el lado de los aspirantes bajo orden FIFO (primero en entrar, primero en salir)."
            }
          ]
        },
        {
          title: "Desenlace de Puntos y Rotación",
          icon: "refresh-cw",
          cards: [
            {
              type: "loss",
              badge: "Escenario 1: Los Aspirantes Pierden el Punto",
              badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
              title: "El Rey y la Reina Defienden el Trono",
              steps: [
                "El Rey y la Reina permanecen en el Trono, <strong>pero cambian de lado entre sí</strong>.",
                "El aspirante <strong>«Veterano» (Senior)</strong> va al final de la fila (su turno concluye por FIFO).",
                "El aspirante <strong>«Júnior» (Junior)</strong> es promovido a <strong>«Veterano» (Senior)</strong>.",
                "La siguiente persona de la fila entra a la pista para ocupar el puesto de <strong>«Júnior» (Junior)</strong>."
              ]
            },
            {
              type: "win",
              badge: "Escenario 2: Los Aspirantes Ganan (Dos Saques)",
              badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
              title: "Ganar 2 Saques para Ascender al Trono",
              steps: [
                "Para destronar a uno de los Reyes, los Aspirantes deben ganar <strong>DOS saques consecutivos</strong>:",
                "1. Primer saque: los Aspirantes sacan desde el <strong>lado derecho (Junior)</strong>.",
                "2. Si anotan → El saque pasa al <strong>Veterano/Senior (lado izquierdo)</strong>.",
                "3. Si ganan el segundo saque → <strong>El Veterano asciende al Trono</strong> (Hombre sustituye al Rey, Mujer sustituye a la Reina; quien sale va a la fila, el otro Rey permanece).",
                "El aspirante <strong>«Júnior» (Junior)</strong> es promovido a <strong>«Veterano» (Senior)</strong>; el siguiente jugador entra como <strong>«Júnior»</strong>."
              ]
            }
          ]
        },
        {
          title: "Saque y Colocación en la Pista",
          icon: "target",
          items: [
            {
              label: "Dos Saques para Destronar",
              icon: "zap",
              text: "Los Aspirantes deben ganar 2 saques consecutivos: 1.º saque por la derecha (Junior), 2.º saque por la izquierda (Senior)."
            },
            {
              label: "Posición de Entrada del Júnior",
              icon: "log-in",
              text: "El Júnior siempre entra en la posición de pista correspondiente a un <strong>tanteo par</strong> (Lado derecho / Deuce court)."
            },
            {
              label: "Reyes Defienden y Cambian",
              icon: "arrow-left-right",
              text: "Cuando el Rey y la Reina defienden o anotan, <strong>permanecen en el Trono y cambian de lado entre sí</strong>."
            },
            {
              label: "Ajuste al Salir de Posición Impar",
              icon: "shuffle",
              text: "Si el Veterano sale desde la <strong>posición impar</strong> (Lado izquierdo / Ad court), el Júnior ocupa ese lugar y pasa a ser Veterano."
            }
          ]
        }
      ]
    },
    ru: {
      langName: "Русский",
      badge: "1 корт · 16:00 – 18:00 · Фан-событие",
      title: "Король и Королева",
      subtitle: "",
      overview: "Динамичный социальный формат игры, где пары претендентов соревнуются за право занять Трон Короля и Королевы. Чтобы сместить одного из королей, претендентам нужно выиграть ДВЕ подачи подряд!",
      sections: [
        {
          title: "Роли на корте",
          icon: "users",
          items: [
            {
              label: "Сторона Трона",
              text: "Король (М) + Королева (Ж). Играют в смешанной паре и защищают трон."
            },
            {
              label: "Сторона Претендентов",
              text: "<strong>«Старший» (Senior)</strong> (зашел на корт 1 розыгрыш назад) + <strong>«Младший» (Junior)</strong> (только что зашел из очереди)."
            },
            {
              label: "Очередь",
              text: "Общая одиночная линия за задней линией претендентов по правилу FIFO (первый зашел — первый вышел)."
            }
          ]
        },
        {
          title: "Сценарии розыгрышей",
          icon: "refresh-cw",
          cards: [
            {
              type: "loss",
              badge: "Сценарий 1: Претенденты проиграли розыгрыш",
              badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
              title: "Короли защитили трон",
              steps: [
                "Король и Королева остаются на Троне, <strong>но меняются сторонами между собой</strong>.",
                "«Старший» претендент уходит в конец очереди (его время вышло по FIFO).",
                "«Младший» становится «Старшим».",
                "Из очереди заходит следующий человек и встает на позицию «Младшего»."
              ]
            },
            {
              type: "win",
              badge: "Сценарий 2: Претенденты выигрывают (Две подачи)",
              badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
              title: "Для смещения Короля нужно выиграть ДВЕ подачи",
              steps: [
                "Чтобы сместить одного из королей, претенденты должны выиграть <strong>ДВЕ подачи подряд</strong>:",
                "1. Сначала Претенденты подают с <strong>правой стороны (Младший)</strong>.",
                "2. Если забили → Подача переходит к <strong>Старшему претенденту (левая сторона)</strong>.",
                "3. Если забили и вторую подачу → <strong>Старший переходит на Трон</strong> (парень сменяет Короля, девушка сменяет Королеву; прежний монарх идет в очередь, представитель другого пола остается).",
                "«Младший» претендент повышается до «Старшего»; из очереди заходит следующий игрок на позицию «Младшего»."
              ]
            }
          ]
        },
        {
          title: "Подача и расстановка на корте",
          icon: "target",
          items: [
            {
              label: "Две подачи для Трона",
              icon: "zap",
              text: "Для смещения Королей нужно выиграть 2 подачи подряд: 1-я подача справа (Младший), 2-я подача слева (Старший)."
            },
            {
              label: "Позиция Младшего",
              icon: "log-in",
              text: "Младший всегда встает на место, где подается <strong>четное число</strong> (правый квадрат / Deuce)."
            },
            {
              label: "Смена мест Королей",
              icon: "arrow-left-right",
              text: "Когда Короли защищают трон или забивают, они <strong>остаются на Троне и меняются сторонами между собой</strong>."
            },
            {
              label: "Смена при выходе с нечетной позиции",
              icon: "shuffle",
              text: "Если уходит старший претендент с <strong>нечетной позиции поля</strong>, то на его место встает младший и становится «Старшим»."
            }
          ]
        }
      ]
    }
  }
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
    time: "10:00 – 16:00",
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
          time: "13:00 – 14:00",
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
          time: "13:00 – 14:00",
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
          time: "13:00 – 14:00",
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
          time: "13:00 – 14:00",
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
          time: "14:00 – 15:00",
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
          time: "14:00 – 15:00",
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
        time: "15:00 – 16:00",
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
    host: "Artem",
    day: "Sunday, Oct 4",
    time: "18:00 – 22:00",
    courts: "Courts 1, 2, 3, 4",
    format: "MLP Format: 2 Groups (Round-Robin) → Semifinals → Grand Final",
    playersCount: 32,
    teamsCount: 8,
    groupsCount: 2,
    advanceCount: 2,
    isDrawCompleted: false,
    description: "8 fixed teams: participants enter as pre-formed rosters of 4 players (2 men and 2 women). Max 10.5 Combined Team Rating. 2 groups of 4 teams. Team Seeding Pots (Pots 1–4) are used exclusively for a balanced draw into Group A and Group B (from each pot, 1 team goes to Group A, 1 to Group B). Each team plays a tie against all opponents in its group. Each tie consists of 4 mandatory matches: 1) Men's Doubles (MD), 2) Women's Doubles (WD), 3) Mix 1 (MXD1), 4) Mix 2 (MXD2). Top 2 teams from each group advance to the Playoffs (SF1 and SF2). Semifinals and Finals also consist of 1 tie (4 matches) each.",
    pots: {
      teamPots: [
        {
          id: "pot-1",
          name: "Pot 1: Top Seeds",
          badge: "bg-amber-100 text-amber-900 border-amber-300",
          description: "1 team drawn into Group A, 1 team into Group B",
          teams: [
            { id: "team-1", name: "Team 1", seed: 1, label: "Top Seed #1" },
            { id: "team-2", name: "Team 2", seed: 2, label: "Top Seed #2" }
          ]
        },
        {
          id: "pot-2",
          name: "Pot 2: Contenders",
          badge: "bg-blue-100 text-blue-900 border-blue-300",
          description: "1 team drawn into Group A, 1 team into Group B",
          teams: [
            { id: "team-3", name: "Team 3", seed: 3, label: "Seed #3" },
            { id: "team-4", name: "Team 4", seed: 4, label: "Seed #4" }
          ]
        },
        {
          id: "pot-3",
          name: "Pot 3: Challengers",
          badge: "bg-emerald-100 text-emerald-900 border-emerald-300",
          description: "1 team drawn into Group A, 1 team into Group B",
          teams: [
            { id: "team-5", name: "Team 5", seed: 5, label: "Seed #5" },
            { id: "team-6", name: "Team 6", seed: 6, label: "Seed #6" }
          ]
        },
        {
          id: "pot-4",
          name: "Pot 4: Dark Horses",
          badge: "bg-purple-100 text-purple-900 border-purple-300",
          description: "1 team drawn into Group A, 1 team into Group B",
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
          // Round 1 (18:00 - 18:40)
          {
            id: "GA-R1-E1",
            round: "Round 1",
            time: "18:00 – 18:40",
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
            time: "18:00 – 18:40",
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
          // Round 2 (18:40 - 19:20)
          {
            id: "GA-R2-E3",
            round: "Round 2",
            time: "18:40 – 19:20",
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
            time: "18:40 – 19:20",
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
          // Round 3 (19:20 - 20:00)
          {
            id: "GA-R3-E5",
            round: "Round 3",
            time: "19:20 – 20:00",
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
            time: "19:20 – 20:00",
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
          // Round 1 (18:00 - 18:40)
          {
            id: "GB-R1-E1",
            round: "Round 1",
            time: "18:00 – 18:40",
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
            time: "18:00 – 18:40",
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
          // Round 2 (18:40 - 19:20)
          {
            id: "GB-R2-E3",
            round: "Round 2",
            time: "18:40 – 19:20",
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
            time: "18:40 – 19:20",
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
          // Round 3 (19:20 - 20:00)
          {
            id: "GB-R3-E5",
            round: "Round 3",
            time: "19:20 – 20:00",
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
            time: "19:20 – 20:00",
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
          time: "20:00 – 21:00",
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
          time: "20:00 – 21:00",
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
        time: "21:00 – 22:00",
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
        time: "21:00 – 22:00",
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

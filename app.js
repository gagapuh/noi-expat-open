/**
 * ==============================================================================
 * NOI EXPAT OPEN — SCHEDULE TIMELINE ENGINE
 * Premium UI · Californian Design System
 * ==============================================================================
 */

// ─── State ───
const state = {
  currentDayId: 'day1',
  selectedMobileCourt: 'all',
  activeBracketId: null,
  activeCourtModalId: null,
  bracketActiveTab: 'groups', // 'groups', 'playoffs', 'pathway', 'players'
  bracketGroupFilter: 'all',
  playersRoster: null // loaded from bracket or localStorage
};
// ─── Constants ───
const PIXELS_PER_MINUTE = 1.8;

// ─── Helpers ───
function timeToMinutesFromStart(timeStr, startHour) {
  const [h, m] = timeStr.split(':').map(Number);
  return (h * 60 + m) - (startHour * 60);
}

function getDurationMinutes(startStr, endStr) {
  const [sh, sm] = startStr.split(':').map(Number);
  const [eh, em] = endStr.split(':').map(Number);
  return (eh * 60 + em) - (sh * 60 + sm);
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h`;
  return `${mins}m`;
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  renderHeaderAndMeta();
  renderCourtFilterTabs();
  renderTimelineMatrix();
  setupEventListeners();
});

function renderHeaderAndMeta() {
  const titleEl = document.getElementById('tournamentTitle');
  if (titleEl) titleEl.textContent = TOURNAMENT_CONFIG.title;
}

// ─── Mobile Court Tabs ───
function renderCourtFilterTabs() {
  const container = document.getElementById('mobileCourtTabs');
  if (!container) return;

  let html = `
    <button data-court="all" class="court-tab h-8 px-3 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
      state.selectedMobileCourt === 'all'
        ? 'bg-white text-stone-900 shadow-sm font-semibold'
        : 'text-stone-500 hover:text-stone-800'
    }">All</button>
  `;

  TOURNAMENT_CONFIG.courts.forEach(court => {
    const isSelected = state.selectedMobileCourt === court.id;
    html += `
      <button data-court="${court.id}" class="court-tab h-8 px-3 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
        isSelected
          ? 'bg-white text-stone-900 shadow-sm font-semibold'
          : 'text-stone-500 hover:text-stone-800'
      }">${court.name}</button>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll('.court-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.selectedMobileCourt = e.currentTarget.getAttribute('data-court');
      renderCourtFilterTabs();
      renderTimelineMatrix();
    });
  });
}

// ─── Timeline Matrix ───
function renderTimelineMatrix() {
  const currentDay = TOURNAMENT_CONFIG.days.find(d => d.id === state.currentDayId) || TOURNAMENT_CONFIG.days[0];

  // Update day tab styles & labels
  document.querySelectorAll('.day-tab-btn').forEach(btn => {
    const dayId = btn.getAttribute('data-day');
    const dayConfig = TOURNAMENT_CONFIG.days.find(d => d.id === dayId);
    if (dayConfig && dayConfig.title) {
      btn.textContent = dayConfig.title;
    }
    const isActive = dayId === state.currentDayId;
    btn.className = `day-tab-btn h-10 px-6 rounded-xl font-bold text-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
      isActive 
        ? 'bg-stone-900 text-white shadow-md' 
        : 'bg-white text-stone-600 border border-stone-300 hover:border-stone-400 hover:text-stone-900'
    }`;
  });

  const { startHour, endHour } = TOURNAMENT_CONFIG.timeRange;
  const totalMinutes = (endHour - startHour) * 60;
  const totalHeightPx = totalMinutes * PIXELS_PER_MINUTE;

  const visibleCourts = state.selectedMobileCourt === 'all'
    ? TOURNAMENT_CONFIG.courts
    : TOURNAMENT_CONFIG.courts.filter(c => c.id === state.selectedMobileCourt);

  const container = document.getElementById('gridTableContainer');
  if (!container) return;

  // ── Header Row ──
  let headerHtml = `
    <div class="timeline-grid-wrapper bg-surface-1 sticky top-0 z-30 border-b border-stone-200/70">
      <div class="court-header-cell bg-surface-1 border-r border-stone-200/60">
        <span class="text-[11px] font-semibold text-stone-400 uppercase tracking-widest">Time</span>
      </div>
  `;

  visibleCourts.forEach(court => {
    headerHtml += `
      <div class="court-header-cell">
        <span class="inline-flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20"></span>
          <span class="font-bold text-[15px] text-stone-800 font-display tracking-tight">${court.name}</span>
        </span>
      </div>
    `;
  });

  headerHtml += `</div>`;

  // ── Body ──
  let bodyHtml = `<div class="timeline-grid-wrapper relative bg-white" style="height: ${totalHeightPx}px;">`;

  // Time Column
  bodyHtml += `<div class="border-r border-stone-200/50 bg-surface-1/50 select-none">`;
  for (let h = startHour; h < endHour; h++) {
    const hStr = h.toString().padStart(2, '0');

    bodyHtml += `
      <div class="time-slot-marker hour-mark">
        <span class="text-[12px] font-mono font-semibold text-stone-700 tabular-nums">${hStr}:00</span>
      </div>
      <div class="time-slot-marker">
        <span class="text-[11px] font-mono text-stone-400 tabular-nums">${hStr}:30</span>
      </div>
    `;
  }
  bodyHtml += `</div>`;

  // Court Columns
  visibleCourts.forEach(court => {
    bodyHtml += `
      <div class="relative border-r border-stone-200/40 last:border-r-0">
        <div class="absolute inset-0 pointer-events-none">
    `;

    for (let h = startHour; h < endHour; h++) {
      bodyHtml += `
        <div class="court-bg-slot hour-mark"></div>
        <div class="court-bg-slot"></div>
      `;
    }

    bodyHtml += `</div>`;

    // Events
    const isSingleCourtView = state.selectedMobileCourt !== 'all';
    const courtEvents = (currentDay.schedule || []).filter(ev => {
      if (isSingleCourtView) {
        return ev.courtId === court.id || (ev.courtIds && ev.courtIds.includes(court.id));
      }
      return ev.courtId === court.id;
    });

    courtEvents.forEach(ev => {
      const topMinutes = timeToMinutesFromStart(ev.start, startHour);
      const durationMinutes = getDurationMinutes(ev.start, ev.end);
      const topPx = Math.max(0, topMinutes * PIXELS_PER_MINUTE);
      const heightPx = Math.max(48, durationMinutes * PIXELS_PER_MINUTE - 4);

      const catConfig = (TOURNAMENT_CONFIG.categories && TOURNAMENT_CONFIG.categories[ev.category]) || TOURNAMENT_CONFIG.categories.tournament;
      const isPlanned = ev.status === 'planned' || ev.status === 'tentative';
      const isFree = ev.status === 'free';
      const isFinals = ev.category === 'finals';
      const hasReclubUrl = Boolean(ev.reclubUrl && ev.reclubUrl.trim() !== '');


      // Unified group: 4 cards, each at real height, dashed borders between courts, centered content
      const isUnifiedGroup = !isSingleCourtView && Boolean(ev.unifiedGroup);

      let spanStyle = '';
      if (isUnifiedGroup) {
        if (court.id === 'c1') spanStyle = 'left: 5px; right: -1px; z-index: 15;';
        else if (court.id === 'c2' || court.id === 'c3') spanStyle = 'left: 0px; right: -1px; z-index: 15;';
        else if (court.id === 'c4') spanStyle = 'left: 0px; right: 5px; z-index: 15;';
      }

      // Multi-court span handling (non-unified)
      const effectiveSpan = (!isSingleCourtView && ev.courtSpan) ? ev.courtSpan : 1;
      if (!isUnifiedGroup && effectiveSpan > 1) {
        spanStyle = `width: calc(${effectiveSpan * 100}% - 10px); right: auto; z-index: 20;`;
      }

      const unifiedBorderClass = isUnifiedGroup
        ? (court.id === 'c4'
            ? 'border border-blue-300/70 border-l-0'
            : 'border border-blue-300/70 border-l-0 border-r border-dashed')
        : '';

      // ── Unified group: per-court cards + one floating title centered across all 4 ──
      if (isUnifiedGroup) {
        const unifiedBgPos = {
          c1: '0% 0%',
          c2: '33.333% 0%',
          c3: '66.667% 0%',
          c4: '100% 0%'
        }[court.id] || '0% 0%';

        const unifiedBgStyle = `background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 45%, #ffffff 100%); background-size: 400% 650px; background-position: ${unifiedBgPos}; background-repeat: no-repeat;`;

        const laneBorderClass = court.id === 'c1'
          ? 'border border-blue-300/60 border-r border-dashed'
          : (court.id === 'c4'
              ? 'border-t border-b border-r border-blue-300/60 border-l-0'
              : 'border-t border-b border-r border-dashed border-blue-300/60 border-l-0');

        let laneRoundedClass = 'rounded-t-none';
        if (court.id === 'c1') {
          laneRoundedClass = 'rounded-t-none rounded-b-2xl';
        } else if (court.id === 'c2') {
          laneRoundedClass = 'rounded-t-none rounded-b-2xl';
        } else if (court.id === 'c3') {
          laneRoundedClass = 'rounded-t-none rounded-bl-2xl rounded-br-none';
        } else if (court.id === 'c4') {
          laneRoundedClass = 'rounded-t-none rounded-br-2xl rounded-bl-none';
        }

        bodyHtml += `
          <div class="timeline-event-card ${laneBorderClass} ${laneRoundedClass} shadow-card hover:shadow-card-hover"
               style="top: ${topPx}px; height: ${heightPx}px; ${spanStyle} ${unifiedBgStyle}">
            <div class="flex items-center ${court.id === 'c1' ? 'justify-between' : 'justify-end'} gap-1">
              ${court.id === 'c1' ? `
                <span class="inline-flex items-center h-[20px] px-2 rounded-md text-[9px] sm:text-[10px] uppercase font-bold tracking-wide leading-none whitespace-nowrap ${catConfig.badge}">
                  ${catConfig.short}
                </span>
              ` : ''}
              <span class="inline-flex items-center h-[20px] px-1.5 sm:px-2 rounded-md text-[10px] sm:text-[11px] font-mono font-semibold tabular-nums bg-white/90 text-stone-600 border border-stone-200 leading-none whitespace-nowrap">${ev.start}–${ev.end}</span>
            </div>
            <div class="mt-auto flex flex-col gap-1.5 pt-1">
              ${ev.courtStages ? `<div class="text-[9px] font-semibold text-blue-800 bg-blue-50/90 border border-blue-200/80 rounded-md px-1.5 py-1 text-center leading-snug">${ev.courtStages}</div>` : ''}
              <button type="button" onclick="window.openCourtMatchesModal && window.openCourtMatchesModal('${ev.id}')"
                class="w-full py-1 rounded-md bg-white hover:bg-blue-600 hover:text-white border border-blue-200 text-[9px] font-extrabold text-blue-700 flex items-center justify-center gap-1 transition-all cursor-pointer group">
                <i data-lucide="calendar-days" class="w-2.5 h-2.5 text-blue-600 group-hover:text-white transition-colors"></i><span>Matches</span>
              </button>
              <div class="flex items-center justify-between gap-1">
                ${ev.bracketId ? `<button type="button" onclick="window.openBracketModal && window.openBracketModal('${ev.bracketId}')" class="inline-flex items-center h-5 px-1.5 rounded-md text-[8px] font-bold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 shadow-2xs transition-all cursor-pointer whitespace-nowrap"><i data-lucide="trophy" class="w-2.5 h-2.5 text-amber-500 mr-0.5"></i>Bracket</button>` : '<div></div>'}
                <a href="${hasReclubUrl ? ev.reclubUrl : 'javascript:void(0)'}" ${hasReclubUrl ? 'target="_blank" rel="noopener noreferrer"' : ''} class="inline-flex items-center h-5 px-1.5 rounded-md text-[8px] font-semibold transition-all ${hasReclubUrl ? 'text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 cursor-pointer' : 'text-stone-400 bg-stone-100 border border-stone-200 cursor-default'}">Reclub</a>
              </div>
            </div>
          </div>
        `;

        // Floating title — once only, on Court 1, spans all 4 courts
        if (court.id === 'c1') {
          bodyHtml += `
            <div style="position:absolute;top:${topPx}px;left:5px;width:calc(400% - 10px);z-index:30;pointer-events:none;display:flex;flex-direction:column;align-items:center;text-align:center;padding:32px 16px 0;">
              ${ev.logo ? `
                <div class="p-1.5 rounded-xl bg-white border border-stone-200 shadow-2xs flex items-center justify-center mb-1.5">
                  <img src="${ev.logo}" alt="" class="h-8 sm:h-9 w-auto max-w-full object-contain rounded-lg" onerror="this.parentElement.style.display='none'" />
                </div>
              ` : ''}
              <div class="text-[14px] sm:text-base font-black text-stone-900 leading-tight">
                ${ev.title}
              </div>
              ${ev.subtitle ? `
                <div class="text-[11px] sm:text-xs text-stone-600 font-semibold mt-0.5 leading-snug">
                  ${ev.subtitle}
                </div>
              ` : ''}
              ${ev.host && ev.host !== 'TBA' ? `
                <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white border border-stone-200/90 shadow-2xs text-stone-800 text-[10px] leading-none mt-1.5">
                  <span class="text-stone-400 font-bold uppercase tracking-wider text-[8px]">Host</span>
                  <span class="w-px h-2 rounded-full bg-stone-300"></span>
                  <span class="font-extrabold text-stone-950">${ev.host}</span>
                </div>
              ` : ''}
            </div>
          `;
        }

        return;
      }

      const cardClasses = isPlanned
        ? `bg-gradient-to-br ${catConfig.cardBg} border-2 border-dashed ${catConfig.cardBorderDashed} opacity-[0.65] hover:opacity-100`
        : `bg-gradient-to-br ${catConfig.cardBg} border ${catConfig.cardBorder} ${isFinals ? 'ring-2 ring-amber-300/40' : ''} shadow-card hover:shadow-card-hover`;

      bodyHtml += `
        <div 
          class="timeline-event-card ${cardClasses}"
          style="top: ${topPx}px; height: ${heightPx}px; ${spanStyle}"
          title="${ev.title}">
          
          <div class="flex flex-col gap-1">
            <div class="flex flex-wrap items-center justify-between gap-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="inline-flex items-center h-[20px] px-2 rounded-md text-[9px] sm:text-[10px] uppercase font-bold tracking-wide leading-none whitespace-nowrap ${
                  isFree ? 'bg-emerald-600 text-white font-black tracking-wider shadow-2xs' : catConfig.badge
                }">
                  ${isFree ? 'Free Court' : catConfig.short}
                </span>
                ${(ev.courtSpan > 1 || (ev.courtIds && ev.courtIds.length > 1) || ev.courtLabel) ? `
                  <span class="inline-flex items-center h-[20px] px-2 rounded-md text-[9px] sm:text-[10px] uppercase font-black tracking-wider bg-stone-900 text-white shadow-2xs leading-none whitespace-nowrap">
                    ${ev.courtLabel || 'Courts 3 & 4'}
                  </span>
                ` : ''}
              </div>
              <span class="inline-flex items-center h-[20px] px-1.5 sm:px-2 rounded-md text-[10px] sm:text-[11px] font-mono font-semibold tabular-nums bg-white/90 text-stone-600 border border-stone-200 leading-none whitespace-nowrap">
                ${ev.start}–${ev.end}<span class="text-stone-400 font-normal ml-1 hidden sm:inline">${formatDuration(durationMinutes)}</span>
              </span>
            </div>
          </div>

          <div class="my-auto flex flex-col items-center text-center gap-1.5 py-1.5">
            ${ev.logo ? `
              <div class="p-1.5 rounded-xl bg-white border border-stone-200 shadow-2xs flex items-center justify-center ${isPlanned ? 'opacity-60' : ''}">
                <img src="${ev.logo}" alt="" class="h-8 sm:h-9 w-auto max-w-full object-contain rounded-lg" onerror="this.parentElement.style.display='none'" />
              </div>
            ` : ''}
            <div class="${effectiveSpan > 1 ? 'text-[14px] sm:text-base font-black' : 'text-xs sm:text-[13px] font-black'} ${isPlanned ? 'text-stone-500 italic' : 'text-stone-900'} leading-tight">
              ${ev.title}
            </div>
            ${ev.host !== undefined ? `
              <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg ${
                isPlanned ? 'bg-stone-100/80 border border-stone-200/80 text-stone-500' : 'bg-white border border-stone-200/90 shadow-2xs text-stone-800'
              } text-[10px] leading-none">
                <span class="text-stone-400 font-bold uppercase tracking-wider text-[8px]">Host</span>
                <span class="w-px h-2 rounded-full bg-stone-300"></span>
                <span class="font-extrabold ${ev.host && ev.host !== 'TBA' ? 'text-stone-950' : 'text-stone-400 font-medium italic'}">${ev.host || 'TBA'}</span>
              </div>
            ` : ''}
          </div>

          <div class="pt-2 border-t ${isPlanned ? 'border-stone-200/40' : 'border-stone-200'} flex items-center justify-between gap-1.5">
            ${ev.bracketId ? `
              <button type="button" onclick="window.openBracketModal && window.openBracketModal('${ev.bracketId}')"
                class="inline-flex items-center justify-center h-7 px-2 sm:px-2.5 rounded-lg text-[10px] sm:text-[11px] font-bold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 hover:border-stone-400 shadow-2xs hover:shadow-xs transition-all cursor-pointer whitespace-nowrap">
                <span>Bracket</span>
              </button>
            ` : `<div></div>`}
            <a href="${hasReclubUrl ? ev.reclubUrl : 'javascript:void(0)'}" 
               ${hasReclubUrl ? 'target="_blank" rel="noopener noreferrer"' : ''}
               class="inline-flex items-center justify-center h-7 px-2 sm:px-2.5 rounded-lg text-[10px] sm:text-[11px] font-semibold transition-all ${
                 hasReclubUrl ? 'text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 cursor-pointer' : 'text-stone-400 bg-stone-100 border border-stone-200 cursor-default'
               }">
              <span>Reclub</span>
            </a>
          </div>
        </div>
      `;


    });

    bodyHtml += `</div>`;
  });

  bodyHtml += `</div>`;

  container.innerHTML = headerHtml + bodyHtml;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ─── Event Listeners ───
function setupEventListeners() {
  document.querySelectorAll('.day-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const dayId = e.currentTarget.getAttribute('data-day');
      state.currentDayId = dayId;
      renderTimelineMatrix();
    });
  });

  // Location modal backdrop click to close
  const locationBackdrop = document.getElementById('locationModalBackdrop');
  if (locationBackdrop) {
    locationBackdrop.addEventListener('click', () => {
      window.closeLocationModal();
    });
  }

  // Bracket modal backdrop click to close
  const backdrop = document.getElementById('bracketModalBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      window.closeBracketModal();
    });
  }

  // Court matches modal backdrop click to close
  const courtBackdrop = document.getElementById('courtMatchesModalBackdrop');
  if (courtBackdrop) {
    courtBackdrop.addEventListener('click', () => {
      window.closeCourtMatchesModal();
    });
  }

  // Keyboard Escape key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const locModal = document.getElementById('locationModal');
      if (locModal && !locModal.classList.contains('hidden')) {
        window.closeLocationModal();
      } else if (state.activeCourtModalId) {
        window.closeCourtMatchesModal();
      } else if (state.activeBracketId) {
        window.closeBracketModal();
      }
    }
  });
}

/// ─── Location / Directions Modal Functions ───
window.openLocationModal = function() {
  const modal = document.getElementById('locationModal');
  if (!modal) return;

  const venue = (typeof TOURNAMENT_CONFIG !== 'undefined' && TOURNAMENT_CONFIG.venue) || {};
  const nameEl = document.getElementById('locationVenueName');
  const addrEl = document.getElementById('locationVenueAddress');
  const imgEl = document.getElementById('locationVenueImage');
  const gmapsBtn = document.getElementById('googleMapsBtn');
  const appleBtn = document.getElementById('appleMapsBtn');

  if (nameEl && venue.name) nameEl.textContent = venue.name;
  if (addrEl && venue.address) addrEl.textContent = venue.address;
  if (imgEl && venue.image) imgEl.src = venue.image;
  if (gmapsBtn && venue.googleMapsUrl) gmapsBtn.href = venue.googleMapsUrl;
  if (appleBtn && venue.appleMapsUrl) appleBtn.href = venue.appleMapsUrl;

  modal.classList.remove('hidden');
  modal.classList.add('active', 'flex');
  document.body.style.overflow = 'hidden';

  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.closeLocationModal = function() {
  const modal = document.getElementById('locationModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('active', 'flex');
    document.body.style.overflow = '';
  }
};

/// ─── Tournament Draw / Bracket Modal Functions ───
window.openBracketModal = function(bracketId) {
  state.activeBracketId = bracketId;
  state.bracketActiveTab = 'players';
  state.bracketGroupFilter = 'all';
  initBracketRoster();
  renderBracketModal();
  const modal = document.getElementById('bracketModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.closeBracketModal = function() {
  state.activeBracketId = null;
  const modal = document.getElementById('bracketModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.setBracketTab = function(tabName) {
  state.bracketActiveTab = tabName;
  renderBracketModal();
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.setBracketGroupFilter = function(groupId) {
  state.bracketGroupFilter = groupId;
  renderBracketModal();
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

// ─── Player Roster & Randomizer Helpers ───
function initBracketRoster() {
  const bracket = getActiveBracket();
  if (!bracket) return;

  // Try to load saved custom roster and draw status from localStorage
  try {
    const saved = localStorage.getItem('noi_players_roster');
    const savedDraw = localStorage.getItem('noi_draw_completed');
    if (saved) {
      state.playersRoster = JSON.parse(saved);
      state.isDrawCompleted = (savedDraw === 'true') && state.playersRoster.some(p => p.group !== null && p.group !== undefined);
      if (state.isDrawCompleted) {
        applyRosterToBracket(state.playersRoster, bracket);
      } else {
        resetBracketToSlots(bracket);
      }
      return;
    }
  } catch (e) {}

  // Otherwise initialize from bracket default players (group: null initially)
  if (bracket.players && bracket.players.length === 32) {
    state.playersRoster = bracket.players.map(p => ({ ...p }));
  } else {
    const defaultRoster = [];
    for (let i = 1; i <= 32; i++) {
      defaultRoster.push({
        id: i,
        name: `Player ${i}`,
        group: null
      });
    }
    state.playersRoster = defaultRoster;
  }
  state.isDrawCompleted = false;
  resetBracketToSlots(bracket);
}

function getActiveBracket() {
  if (!state.activeBracketId) return null;
  return (TOURNAMENT_CONFIG.brackets && TOURNAMENT_CONFIG.brackets[state.activeBracketId])
    || (typeof TOURNAMENT_BRACKETS !== 'undefined' && TOURNAMENT_BRACKETS[state.activeBracketId]);
}

function resetBracketToSlots(bracket) {
  if (!bracket || !bracket.groups) return;
  bracket.groups.forEach(group => {
    group.players = ["Slot 1", "Slot 2", "Slot 3", "Slot 4"];
    group.matches = [
      { round: "Round 1", pair1: "Slot 1 & Slot 2", pair2: "Slot 3 & Slot 4", score: "—", winner: null, played: false },
      { round: "Round 2", pair1: "Slot 1 & Slot 3", pair2: "Slot 2 & Slot 4", score: "—", winner: null, played: false },
      { round: "Round 3", pair1: "Slot 1 & Slot 4", pair2: "Slot 2 & Slot 3", score: "—", winner: null, played: false },
      { round: "Round 4", pair1: "Slot 1 & Slot 2", pair2: "Slot 3 & Slot 4", score: "—", winner: null, played: false },
      { round: "Round 5", pair1: "Slot 1 & Slot 3", pair2: "Slot 2 & Slot 4", score: "—", winner: null, played: false },
      { round: "Round 6", pair1: "Slot 1 & Slot 4", pair2: "Slot 2 & Slot 3", score: "—", winner: null, played: false }
    ];
    group.standings = [
      { rank: 1, name: "Slot 1", played: 0, wins: 0, losses: 0, diff: 0, points: 0, qualified: false, advanceTo: "TBD" },
      { rank: 2, name: "Slot 2", played: 0, wins: 0, losses: 0, diff: 0, points: 0, qualified: false, advanceTo: "TBD" },
      { rank: 3, name: "Slot 3", played: 0, wins: 0, losses: 0, diff: 0, points: 0, qualified: false, advanceTo: "Eliminated" },
      { rank: 4, name: "Slot 4", played: 0, wins: 0, losses: 0, diff: 0, points: 0, qualified: false, advanceTo: "Eliminated" }
    ];
  });
}

function applyRosterToBracket(roster, bracket) {
  if (!roster || !bracket || !bracket.groups) return;
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  letters.forEach((letter, gIdx) => {
    const group = bracket.groups[gIdx];
    if (!group) return;
    const groupPlayers = roster.filter(p => p.group === `Group ${letter}`);
    if (groupPlayers.length === 4) {
      group.players = groupPlayers.map(p => p.name);
      const [p1, p2, p3, p4] = group.players;
      group.matches = [
        { round: "Round 1", pair1: `${p1} & ${p2}`, pair2: `${p3} & ${p4}`, score: "—", winner: null, played: false },
        { round: "Round 2", pair1: `${p1} & ${p3}`, pair2: `${p2} & ${p4}`, score: "—", winner: null, played: false },
        { round: "Round 3", pair1: `${p1} & ${p4}`, pair2: `${p2} & ${p3}`, score: "—", winner: null, played: false },
        { round: "Round 4", pair1: `${p1} & ${p2}`, pair2: `${p3} & ${p4}`, score: "—", winner: null, played: false },
        { round: "Round 5", pair1: `${p1} & ${p3}`, pair2: `${p2} & ${p4}`, score: "—", winner: null, played: false },
        { round: "Round 6", pair1: `${p1} & ${p4}`, pair2: `${p2} & ${p3}`, score: "—", winner: null, played: false }
      ];
      group.standings.forEach((s, idx) => {
        s.name = group.players[idx] || s.name;
        s.played = 0;
        s.wins = 0;
        s.losses = 0;
        s.diff = 0;
        s.points = 0;
        s.qualified = false;
      });
    }
  });
}

window.randomizeGroupsDraw = function() {
  const bracket = getActiveBracket();
  if (!bracket || !state.playersRoster || state.playersRoster.length !== 32) return;

  // Fisher-Yates shuffle of the 32 players
  const shuffled = [...state.playersRoster];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  shuffled.forEach((p, idx) => {
    const groupIndex = Math.floor(idx / 4);
    p.group = `Group ${letters[groupIndex]}`;
  });

  state.playersRoster = shuffled;
  state.isDrawCompleted = true;
  try {
    localStorage.setItem('noi_players_roster', JSON.stringify(state.playersRoster));
    localStorage.setItem('noi_draw_completed', 'true');
  } catch (e) {}

  applyRosterToBracket(state.playersRoster, bracket);
  renderBracketModal();
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Visual notification
  const notifyEl = document.getElementById('drawNotification');
  if (notifyEl) {
    notifyEl.classList.remove('hidden');
    setTimeout(() => {
      const el = document.getElementById('drawNotification');
      if (el) el.classList.add('hidden');
    }, 4000);
  }
};

window.saveRosterFromText = function() {
  const textarea = document.getElementById('bulkPlayersInput');
  if (!textarea) return;
  const lines = textarea.value.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return;

  const currentRoster = state.playersRoster || [];
  const newRoster = [];
  for (let i = 1; i <= 32; i++) {
    const name = lines[i - 1] || `Player ${i}`;
    const group = currentRoster[i - 1] ? currentRoster[i - 1].group : null;
    newRoster.push({ id: i, name, group });
  }

  state.playersRoster = newRoster;
  try {
    localStorage.setItem('noi_players_roster', JSON.stringify(state.playersRoster));
  } catch (e) {}

  const bracket = getActiveBracket();
  if (bracket && state.isDrawCompleted) {
    applyRosterToBracket(state.playersRoster, bracket);
  }

  renderBracketModal();
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.resetDrawOnly = function() {
  if (!state.playersRoster) return;
  state.playersRoster.forEach(p => {
    p.group = null;
  });
  state.isDrawCompleted = false;
  try {
    localStorage.setItem('noi_players_roster', JSON.stringify(state.playersRoster));
    localStorage.setItem('noi_draw_completed', 'false');
  } catch (e) {}
  const bracket = getActiveBracket();
  if (bracket) {
    resetBracketToSlots(bracket);
  }
  renderBracketModal();
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.resetRosterDefault = function() {
  try {
    localStorage.removeItem('noi_players_roster');
    localStorage.removeItem('noi_draw_completed');
  } catch (e) {}
  state.isDrawCompleted = false;
  state.playersRoster = null;
  initBracketRoster();
  const bracket = getActiveBracket();
  if (bracket) {
    resetBracketToSlots(bracket);
  }
  renderBracketModal();
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

function renderBracketModal() {
  const container = document.getElementById('bracketModalContent');
  if (!container || !state.activeBracketId) return;

  const bracket = getActiveBracket();
  if (!bracket) {
    container.innerHTML = `<div class="p-8 text-center text-stone-500">Tournament table data not found.</div>`;
    return;
  }

  const groupsList = bracket.groups || [];
  const po = bracket.playoffs || {};
  const activeTab = state.bracketActiveTab || 'groups';
  const roster = state.playersRoster || [];

  // Modal Header
  let html = `
    <!-- Header -->
    <div class="px-5 sm:px-7 py-4 border-b border-stone-200/80 bg-stone-50/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
      <div class="min-w-0">
        <h2 class="text-lg sm:text-xl font-display font-extrabold text-stone-900 tracking-tight leading-snug">
          ${bracket.title}
        </h2>
      </div>

      <div class="flex items-center gap-2 self-end sm:self-center">
        <button 
          onclick="closeBracketModal()" 
          class="w-9 h-9 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
          title="Close (Esc)">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
    </div>

    <!-- Navigation Tabs Bar -->
    <div class="px-5 sm:px-7 py-2.5 bg-white border-b border-stone-200/70 flex items-center justify-between gap-3 shrink-0 overflow-x-auto">
      <div class="inline-flex items-center p-1 rounded-xl bg-stone-100 border border-stone-200/60 shrink-0">
        <button 
          onclick="setBracketTab('players')" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'players' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          Players (32)
        </button>
        <button 
          onclick="setBracketTab('groups')" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'groups' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          Stage 1: Groups
        </button>
        <button 
          onclick="setBracketTab('playoffs')" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'playoffs' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          Playoffs Bracket
        </button>
        <button 
          onclick="setBracketTab('pathway')" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'pathway' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          32-Player Pathway
        </button>
      </div>
    </div>

    <!-- Body Content Area (Scrollable) -->
    <div class="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 bg-surface-1">
  `;

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 1: GROUP STAGE (Groups A–H) — Clean Empty Tables
  // ══════════════════════════════════════════════════════════════════════════
  if (activeTab === 'groups') {
    html += `
      <!-- Groups Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
    `;

    groupsList.forEach(group => {
      html += `
        <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card overflow-hidden flex flex-col">
          <!-- Group Header -->
          <div class="px-4 py-3 bg-stone-50 border-b border-stone-200/70 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="font-bold text-sm text-stone-900 font-display">${group.name}</span>
              <span class="text-[11px] text-stone-400 font-mono">(${group.court})</span>
            </div>
            <span class="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
              Top 2 Advance
            </span>
          </div>

          <!-- Standings Table (Empty / Ready for input) -->
          <div class="p-3 overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-stone-200 text-[10px] font-bold uppercase tracking-wider text-stone-400 bg-stone-50/50">
                  <th class="py-2 px-2.5 w-8 text-center">#</th>
                  <th class="py-2 px-2.5">Player</th>
                  <th class="py-2 px-2 text-center">MP</th>
                  <th class="py-2 px-2 text-center">W-L</th>
                  <th class="py-2 px-2 text-center">Diff</th>
                  <th class="py-2 px-2 text-center font-bold text-stone-700">Pts</th>
                  <th class="py-2 px-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-100">
                ${group.standings.map(row => `
                  <tr class="hover:bg-stone-50 transition-colors">
                    <td class="py-2 px-2.5 text-center font-mono font-bold text-stone-400">
                      ${row.rank}
                    </td>
                    <td class="py-2 px-2.5 font-bold text-stone-900">
                      ${row.name}
                    </td>
                    <td class="py-2 px-2 text-center tabular-nums text-stone-400">${row.played}</td>
                    <td class="py-2 px-2 text-center tabular-nums text-stone-400">${row.wins}-${row.losses}</td>
                    <td class="py-2 px-2 text-center tabular-nums text-stone-400">${row.diff}</td>
                    <td class="py-2 px-2 text-center font-mono font-bold text-stone-700 tabular-nums">${row.points}</td>
                    <td class="py-2 px-2.5 text-right whitespace-nowrap">
                      <span class="text-[10px] text-stone-400 italic">Upcoming</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Group Matches (3 Rounds: Each with Each) -->
          <div class="px-4 py-3 bg-stone-50/50 border-t border-stone-200/60 mt-auto">
            <div class="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center justify-between">
              <span>Americano Matches (3 Rounds):</span>
              <span class="text-[10px] font-normal text-stone-500 lowercase">each with each</span>
            </div>
            <div class="space-y-1.5 text-xs">
              ${group.matches.map(m => `
                <div class="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-stone-200/60 text-stone-700 shadow-2xs">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="text-[10px] font-mono font-bold text-stone-400 uppercase shrink-0">${m.round}</span>
                    <span class="truncate font-semibold text-stone-800">${m.pair1}</span>
                    <span class="text-stone-300 font-semibold shrink-0">vs</span>
                    <span class="truncate font-semibold text-stone-800">${m.pair2}</span>
                  </div>
                  <span class="font-mono font-bold text-[11px] text-stone-400 px-2.5 py-0.5 rounded bg-stone-50 border border-stone-200 shrink-0">
                    ${m.score}
                  </span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 2: PLAYOFFS BRACKET (BO3 / BO5) — Clean Empty Knockout
  // ══════════════════════════════════════════════════════════════════════════
  else if (activeTab === 'playoffs') {
    const qf = po.quarterfinals || [];
    const sf = po.semifinals || [];
    const gf = po.grandFinal || {};
    const podium = po.podium || [];

    html += `
      <!-- Playoff Rounds Flow -->
      <div class="space-y-6">
        <!-- 1. Quarterfinals (4 Matches · Courts 1-4 · BO3) -->
        <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card p-4 sm:p-5">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <h4 class="font-display font-bold text-sm sm:text-base text-stone-900">
                Quarterfinals · Best of 3 (BO3)
              </h4>
            </div>
            <div class="flex items-center gap-2 text-xs font-mono font-bold text-stone-500">
              <span>14:00 – 15:00</span>
              <span class="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-700">Courts 1–4</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${qf.map(m => `
              <div class="rounded-xl border border-stone-200 bg-stone-50/40 p-3.5 flex flex-col justify-between gap-3 shadow-2xs">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="font-bold text-stone-800">${m.name}</span>
                  <span class="font-mono text-stone-500 font-semibold">${m.court} • ${m.format}</span>
                </div>

                <div class="space-y-1.5 text-xs">
                  <!-- Team 1 -->
                  <div class="p-2.5 rounded-lg border bg-white border-stone-200/70 text-stone-700 flex items-center justify-between gap-2">
                    <div class="min-w-0">
                      <div class="truncate font-bold">${m.team1.duo}</div>
                      <div class="text-[10px] text-stone-400 font-mono">${m.team1.name} (${m.team1.seed})</div>
                    </div>
                    <span class="text-[10px] text-stone-400 font-mono">TBD</span>
                  </div>

                  <!-- Team 2 -->
                  <div class="p-2.5 rounded-lg border bg-white border-stone-200/70 text-stone-700 flex items-center justify-between gap-2">
                    <div class="min-w-0">
                      <div class="truncate font-bold">${m.team2.duo}</div>
                      <div class="text-[10px] text-stone-400 font-mono">${m.team2.name} (${m.team2.seed})</div>
                    </div>
                    <span class="text-[10px] text-stone-400 font-mono">TBD</span>
                  </div>
                </div>

                <div class="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                  <span class="text-[11px] text-stone-400 font-mono">First to 2 sets to 11</span>
                  <span class="font-mono font-bold text-stone-400 text-sm px-2 py-0.5 rounded bg-stone-100 border border-stone-200">${m.score}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Semifinals (2 Matches · Courts 1-2 · BO3) -->
        <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card p-4 sm:p-5">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              <h4 class="font-display font-bold text-sm sm:text-base text-stone-900">
                Championship Semifinals · Best of 3 (BO3)
              </h4>
            </div>
            <div class="flex items-center gap-2 text-xs font-mono font-bold text-stone-500">
              <span>15:00 – 16:00</span>
              <span class="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-700">Courts 1 & 2</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${sf.map(m => `
              <div class="rounded-xl border border-stone-200 bg-stone-50/40 p-3.5 flex flex-col justify-between gap-3 shadow-2xs">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="font-bold text-stone-800">${m.name}</span>
                  <span class="font-mono text-stone-500 font-semibold">${m.court} • ${m.format}</span>
                </div>

                <div class="space-y-1.5 text-xs">
                  <!-- Team 1 -->
                  <div class="p-2.5 rounded-lg border bg-white border-stone-200/70 text-stone-700 flex items-center justify-between gap-2">
                    <div class="min-w-0">
                      <div class="truncate font-bold">${m.team1.name}</div>
                      <div class="text-[10px] text-stone-400 font-mono">${m.team1.seed}</div>
                    </div>
                    <span class="text-[10px] text-stone-400 font-mono">TBD</span>
                  </div>

                  <!-- Team 2 -->
                  <div class="p-2.5 rounded-lg border bg-white border-stone-200/70 text-stone-700 flex items-center justify-between gap-2">
                    <div class="min-w-0">
                      <div class="truncate font-bold">${m.team2.name}</div>
                      <div class="text-[10px] text-stone-400 font-mono">${m.team2.seed}</div>
                    </div>
                    <span class="text-[10px] text-stone-400 font-mono">TBD</span>
                  </div>
                </div>

                <div class="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                  <span class="text-[11px] text-stone-400 font-mono">Winner to Grand Final</span>
                  <span class="font-mono font-bold text-stone-400 text-sm px-2 py-0.5 rounded bg-stone-100 border border-stone-200">${m.score}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. 🥇 Grand Championship Final (Court 1 · BO5) -->
        <div class="bg-gradient-to-b from-amber-50/60 to-white rounded-2xl border-2 border-amber-300 shadow-md p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div>
            <div class="flex items-center justify-between border-b border-amber-200/80 pb-3 mb-3">
              <div class="flex items-center gap-2.5">
                <i data-lucide="crown" class="w-6 h-6 text-amber-500"></i>
                <h4 class="font-display font-black text-lg sm:text-xl text-stone-950">${gf.title}</h4>
              </div>
              <span class="px-3 py-1 rounded-lg bg-amber-100 text-amber-950 border border-amber-300 text-xs font-black">
                ${gf.format}
              </span>
            </div>
            <div class="text-xs text-stone-500 font-medium mb-4">
              ${gf.court} • ${gf.time} • First to 3 sets to 11
            </div>

            <div class="space-y-3 text-xs sm:text-sm">
              <div class="p-3.5 rounded-xl bg-white border border-stone-200/80 text-stone-800 font-bold flex items-center justify-between">
                <div>
                  <div class="text-base font-black">${gf.team1.name}</div>
                  <div class="text-xs text-stone-400 font-mono">${gf.team1.seed}</div>
                </div>
                <span class="text-xs text-stone-400 font-mono">Finalist 1</span>
              </div>

              <div class="p-3.5 rounded-xl bg-white border border-stone-200/80 text-stone-800 font-bold flex items-center justify-between">
                <div>
                  <div class="text-base font-black">${gf.team2.name}</div>
                  <div class="text-xs text-stone-400 font-mono">${gf.team2.seed}</div>
                </div>
                <span class="text-xs text-stone-400 font-mono">Finalist 2</span>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-amber-200 flex items-center justify-between">
            <span class="text-xs text-stone-400 font-mono">Grand Final Score</span>
            <span class="font-mono font-bold text-stone-400 text-base px-3 py-1 rounded-lg bg-stone-100 border border-stone-200">
              ${gf.score}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 3: 32-PLAYER PATHWAY
  // ══════════════════════════════════════════════════════════════════════════
  else if (activeTab === 'pathway') {
    html += `
      <!-- Stepper 1: Stage 1 Groups (32 Players in 8 Groups) -->
      <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card p-4 sm:p-6">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">01</div>
            <div>
              <h4 class="font-display font-bold text-sm sm:text-base text-stone-900">Step 1: 32 Players in 8 Groups of 4 (Groups A to H)</h4>
              <p class="text-xs text-stone-500">Every player plays 6 Americano matches rotating partners to 11 points (2 rounds)</p>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold">11:00 – 14:00</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          ${groupsList.map(g => `
            <div class="p-3 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between gap-2">
              <div class="font-bold text-xs text-stone-900 text-center font-display border-b border-stone-200 pb-1.5">${g.name}</div>
              <div class="space-y-1 text-[11px]">
                <div class="p-1 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold text-center truncate">★ #1 Adv</div>
                <div class="p-1 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold text-center truncate">✦ #2 Adv</div>
                <div class="p-1 rounded bg-stone-100 text-stone-400 font-normal text-center truncate">#3 Out</div>
                <div class="p-1 rounded bg-stone-100 text-stone-400 font-normal text-center truncate">#4 Out</div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="mt-4 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-950">
          <span class="font-bold flex items-center gap-1.5">
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i>
            16 Players Qualify (8 Winners + 8 Runners-Up)
          </span>
          <span class="text-stone-500">16 Players Complete Group Stage</span>
        </div>
      </div>

      <!-- Stepper 2: The Merit Pairing Funnel (#1 with #8) -->
      <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card p-4 sm:p-6">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-amber-500 text-stone-950 font-mono font-bold text-xs flex items-center justify-center shrink-0">02</div>
            <div>
              <h4 class="font-display font-bold text-sm sm:text-base text-stone-900">Step 2: Merit Seeding Pots & Balanced Team Formation</h4>
              <p class="text-xs text-stone-500">Formula: Winner #k is paired with Runner-Up #(9 - k)</p>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">14:00 Seeding</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Pot 1 -->
          <div class="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80">
            <div class="font-bold text-xs text-amber-950 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Pot W: 8 Group Winners</span>
              <span class="font-mono text-[10px] text-amber-700">Ranked W1 to W8</span>
            </div>
            <div class="grid grid-cols-4 gap-1.5 text-xs text-center font-mono font-bold text-amber-900">
              <div class="p-2 rounded bg-white border border-amber-200">W1</div>
              <div class="p-2 rounded bg-white border border-amber-200">W2</div>
              <div class="p-2 rounded bg-white border border-amber-200">W3</div>
              <div class="p-2 rounded bg-white border border-amber-200">W4</div>
              <div class="p-2 rounded bg-white border border-amber-200">W5</div>
              <div class="p-2 rounded bg-white border border-amber-200">W6</div>
              <div class="p-2 rounded bg-white border border-amber-200">W7</div>
              <div class="p-2 rounded bg-white border border-amber-200">W8</div>
            </div>
          </div>

          <!-- Pot 2 -->
          <div class="p-4 rounded-xl bg-blue-50/50 border border-blue-200/80">
            <div class="font-bold text-xs text-blue-950 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Pot R: 8 Group Runners-Up</span>
              <span class="font-mono text-[10px] text-blue-700">Ranked R1 to R8</span>
            </div>
            <div class="grid grid-cols-4 gap-1.5 text-xs text-center font-mono font-bold text-blue-900">
              <div class="p-2 rounded bg-white border border-blue-200">R8</div>
              <div class="p-2 rounded bg-white border border-blue-200">R7</div>
              <div class="p-2 rounded bg-white border border-blue-200">R6</div>
              <div class="p-2 rounded bg-white border border-blue-200">R5</div>
              <div class="p-2 rounded bg-white border border-blue-200">R4</div>
              <div class="p-2 rounded bg-white border border-blue-200">R3</div>
              <div class="p-2 rounded bg-white border border-blue-200">R2</div>
              <div class="p-2 rounded bg-white border border-blue-200">R1</div>
            </div>
          </div>
        </div>

        <!-- 8 Formed Balanced Teams -->
        <div class="mt-4 pt-3 border-t border-stone-200">
          <div class="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2.5">
            8 Balanced Playoff Pairs Formed:
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div class="p-2.5 rounded-lg bg-surface-1 border border-stone-200 text-center">
              <div class="font-bold text-stone-900">Team 1</div>
              <div class="font-mono text-[11px] text-stone-500">W1 + R8</div>
            </div>
            <div class="p-2.5 rounded-lg bg-surface-1 border border-stone-200 text-center">
              <div class="font-bold text-stone-900">Team 2</div>
              <div class="font-mono text-[11px] text-stone-500">W2 + R7</div>
            </div>
            <div class="p-2.5 rounded-lg bg-surface-1 border border-stone-200 text-center">
              <div class="font-bold text-stone-900">Team 3</div>
              <div class="font-mono text-[11px] text-stone-500">W3 + R6</div>
            </div>
            <div class="p-2.5 rounded-lg bg-surface-1 border border-stone-200 text-center">
              <div class="font-bold text-stone-900">Team 4</div>
              <div class="font-mono text-[11px] text-stone-500">W4 + R5</div>
            </div>
            <div class="p-2.5 rounded-lg bg-surface-1 border border-stone-200 text-center">
              <div class="font-bold text-stone-900">Team 5</div>
              <div class="font-mono text-[11px] text-stone-500">W5 + R4</div>
            </div>
            <div class="p-2.5 rounded-lg bg-surface-1 border border-stone-200 text-center">
              <div class="font-bold text-stone-900">Team 6</div>
              <div class="font-mono text-[11px] text-stone-500">W6 + R3</div>
            </div>
            <div class="p-2.5 rounded-lg bg-surface-1 border border-stone-200 text-center">
              <div class="font-bold text-stone-900">Team 7</div>
              <div class="font-mono text-[11px] text-stone-500">W7 + R2</div>
            </div>
            <div class="p-2.5 rounded-lg bg-surface-1 border border-stone-200 text-center">
              <div class="font-bold text-stone-900">Team 8</div>
              <div class="font-mono text-[11px] text-stone-500">W8 + R1</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stepper 3: The Knockout Ladder (Quarterfinals → Semifinals → Grand Final) -->
      <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card p-4 sm:p-6">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">03</div>
            <div>
              <h4 class="font-display font-bold text-sm sm:text-base text-stone-900">Step 3: Single-Elimination Knockout Ladder</h4>
              <p class="text-xs text-stone-500">Quarterfinals (BO3) → Semifinals (BO3) → Grand Championship Final (BO5)</p>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">14:00 – 17:00</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <!-- 8 Teams in QF -->
          <div class="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between gap-3">
            <div>
              <div class="font-bold text-stone-900 flex items-center justify-between">
                <span>Quarterfinals (8 Teams)</span>
                <span class="px-2 py-0.5 rounded bg-white text-stone-700 font-mono text-[10px] border">BO3</span>
              </div>
              <div class="text-[11px] text-stone-500 mt-1">4 matches across Courts 1–4</div>
              <div class="space-y-1.5 mt-3">
                <div class="p-2 rounded bg-white border border-stone-200/80 font-mono">QF1: Team 1 vs Team 8</div>
                <div class="p-2 rounded bg-white border border-stone-200/80 font-mono">QF2: Team 4 vs Team 5</div>
                <div class="p-2 rounded bg-white border border-stone-200/80 font-mono">QF3: Team 2 vs Team 7</div>
                <div class="p-2 rounded bg-white border border-stone-200/80 font-mono">QF4: Team 3 vs Team 6</div>
              </div>
            </div>
            <div class="text-[10px] text-emerald-700 font-bold">4 Winners advance to SF</div>
          </div>

          <!-- 4 Teams in SF -->
          <div class="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between gap-3">
            <div>
              <div class="font-bold text-stone-900 flex items-center justify-between">
                <span>Semifinals (4 Teams)</span>
                <span class="px-2 py-0.5 rounded bg-white text-stone-700 font-mono text-[10px] border">BO3</span>
              </div>
              <div class="text-[11px] text-stone-500 mt-1">2 matches on Courts 1 & 2</div>
              <div class="space-y-1.5 mt-3">
                <div class="p-2 rounded bg-white border border-stone-200/80 font-mono">SF1: Winner QF1 vs Winner QF2</div>
                <div class="p-2 rounded bg-white border border-stone-200/80 font-mono">SF2: Winner QF3 vs Winner QF4</div>
              </div>
            </div>
            <div class="text-[10px] text-emerald-700 font-bold">2 Winners advance to Grand Final</div>
          </div>

          <!-- Grand Final (BO5) -->
          <div class="p-4 rounded-xl bg-amber-50/60 border border-amber-300 flex flex-col justify-between gap-3">
            <div>
              <div class="font-bold text-stone-950 flex items-center justify-between">
                <span class="flex items-center gap-1.5"><i data-lucide="crown" class="w-4 h-4 text-amber-500"></i> Grand Final</span>
                <span class="px-2 py-0.5 rounded bg-amber-200 text-amber-950 font-mono font-bold text-[10px] border border-amber-300">BO5</span>
              </div>
              <div class="text-[11px] text-stone-600 mt-1">Court 1 (Picklehead Main Stage)</div>
              <div class="p-3 rounded-lg bg-white border border-amber-200 text-center font-bold text-stone-950 mt-3 shadow-2xs">
                Winner SF1 vs Winner SF2
                <div class="text-[10px] text-amber-800 font-normal mt-0.5">First to 3 sets to 11</div>
              </div>
            </div>
            <div class="p-2 rounded bg-amber-400 text-stone-950 font-black text-center text-xs">
              🥇 NOI EXPAT OPEN CHAMPIONS
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════════
  // TAB 4: PLAYERS ROSTER (32)
  // ══════════════════════════════════════════════════════════════════════════
  else if (activeTab === 'players') {
    const isDrawn = !!(state.isDrawCompleted && roster.some(p => p.group));

    html += `
      <!-- Players Tab Header -->
      <div class="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h3 class="font-display font-bold text-stone-900 text-sm sm:text-base">Tournament Participants (${roster.length})</h3>
          <p class="text-xs text-stone-500">Official Roster & DUPR Player Verification</p>
        </div>
        <button 
          onclick="exportDuprCsv()"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-display font-semibold text-xs transition-colors shadow-2xs cursor-pointer">
          <i data-lucide="download" class="w-3.5 h-3.5 text-amber-400"></i>
          Export DUPR CSV
        </button>
      </div>

      <!-- 32 Players Grid / List -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        ${roster.map(p => `
          <div class="p-3 rounded-xl bg-white border border-stone-200/80 shadow-card flex items-center justify-between gap-2.5 hover:border-blue-300 transition-colors">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="w-7 h-7 rounded-lg bg-stone-100 text-stone-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                ${p.id}
              </span>
              <div class="min-w-0">
                <div class="font-bold text-stone-900 text-xs truncate">${p.name}</div>
                <div class="text-[10px] font-mono ${p.duprId ? 'text-blue-600 font-semibold' : 'text-stone-400'}">
                  ${p.duprId ? `DUPR: ${p.duprId}` : 'DUPR: —'}
                </div>
              </div>
            </div>
            ${(isDrawn && p.group) ? `
              <span class="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200 shrink-0">
                ${p.group}
              </span>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }
  html += `
    </div>
  `;

  container.innerHTML = html;
}

/// ─── Court Matches / Order of Play Modal Functions ───
window.openCourtMatchesModal = function(eventId, courtId) {
  state.activeCourtModalId = eventId;
  state.activeCourtModalCourtId = courtId || null;
  renderCourtMatchesModal();
  const modal = document.getElementById('courtMatchesModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.closeCourtMatchesModal = function() {
  state.activeCourtModalId = null;
  state.activeCourtModalCourtId = null;
  const modal = document.getElementById('courtMatchesModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

function renderCourtMatchesModal() {
  const container = document.getElementById('courtMatchesModalContent');
  if (!container) return;

  const eventId = state.activeCourtModalId;
  let targetEvent = null;
  let eventDay = null;

  for (const d of TOURNAMENT_CONFIG.days) {
    const found = (d.schedule || []).find(ev => ev.id === eventId);
    if (found) {
      targetEvent = found;
      eventDay = d;
      break;
    }
  }

  if (!targetEvent) {
    container.innerHTML = `<div class="p-8 text-center text-stone-500">Court schedule information not found.</div>`;
    return;
  }

  const activeCourtId = state.activeCourtModalCourtId || targetEvent.courtId;
  const courtObj = TOURNAMENT_CONFIG.courts.find(c => c.id === activeCourtId) || { name: activeCourtId };
  const courtScheduleItem = targetEvent.courtScheduleList ? targetEvent.courtScheduleList.find(cs => cs.courtId === activeCourtId) : null;
  const timeDisplay = courtScheduleItem ? courtScheduleItem.time : `${targetEvent.start} – ${targetEvent.end}`;
  const matches = getCourtMatchesList(targetEvent, courtObj.name);

  let html = `
    <!-- Header -->
    <div class="px-5 sm:px-6 py-4 border-b border-stone-200/80 bg-stone-50 flex items-center justify-between gap-3 shrink-0">
      <div class="min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-stone-900 text-white font-display font-bold text-xs">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-400"></i>
            ${courtObj.name}
          </span>
          <span class="inline-flex items-center px-2 py-0.5 rounded-md bg-stone-200/80 text-stone-700 text-[11px] font-mono font-semibold">
            ${timeDisplay}
          </span>
        </div>
        <h3 class="text-base sm:text-lg font-display font-extrabold text-stone-900 truncate">
          ${targetEvent.title}
        </h3>
        <p class="text-xs text-stone-500 mt-0.5">
          ${eventDay ? eventDay.dateFormatted : ''} • Court Order of Play
        </p>
      </div>

      <button 
        onclick="closeCourtMatchesModal()" 
        class="w-9 h-9 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-all cursor-pointer shadow-2xs shrink-0"
        title="Close (Esc)">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    </div>

    ${targetEvent.courtScheduleList ? `
      <!-- Court Switcher Tabs for Multi-Court Tournaments -->
      <div class="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-blue-50/70 border-b border-blue-200/70 overflow-x-auto">
        <span class="text-[10px] font-bold uppercase tracking-wider text-blue-900 mr-1 shrink-0">Switch Court:</span>
        ${targetEvent.courtScheduleList.map(cs => `
          <button 
            type="button" 
            onclick="state.activeCourtModalCourtId='${cs.courtId}'; renderCourtMatchesModal(); if(window.lucide)window.lucide.createIcons();"
            class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              (activeCourtId === cs.courtId)
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-blue-900 hover:bg-blue-100 border border-blue-200'
            }">
            ${cs.courtName} (${cs.time.replace(/ /g, '')})
          </button>
        `).join('')}
      </div>
    ` : ''}

    <!-- Body: Order of Play List -->
    <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-surface-1">
      <div class="flex items-center justify-between text-xs text-stone-500 pb-1 border-b border-stone-200">
        <span class="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
          Scheduled Matches (${matches.length})
        </span>
        <span>Court Order of Play</span>
      </div>

      <div class="space-y-3">
        ${matches.map((m, idx) => `
          <div class="bg-white rounded-xl border border-stone-200/80 p-3.5 sm:p-4 shadow-card hover:border-amber-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-start sm:items-center gap-3 min-w-0">
              <span class="w-7 h-7 rounded-lg bg-stone-900 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                #${idx + 1}
              </span>
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${m.badgeClass || 'bg-blue-50 text-blue-900 border border-blue-200'}">
                    ${m.stage}
                  </span>
                  <span class="text-xs font-extrabold text-stone-900">${m.title}</span>
                </div>
                <div class="text-xs text-stone-600 mt-1 flex items-center gap-2 flex-wrap font-medium">
                  <span class="text-stone-900 font-bold">${m.pair1}</span>
                  <span class="text-stone-400 font-normal italic">vs</span>
                  <span class="text-stone-900 font-bold">${m.pair2}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
              <span class="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-mono text-[11px] font-semibold border border-stone-200/70">
                ${m.format}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function getCourtMatchesList(ev, overrideCourtName) {
  const courtObj = TOURNAMENT_CONFIG.courts.find(c => c.id === ev.courtId) || { name: ev.courtId };
  const courtName = overrideCourtName || courtObj.name; // e.g. "Court 1", "Court 2", "Court 3", "Court 4"

  // 1. If it links to a bracket (Picklehead Individual Doubles)
  if (ev.bracketId && TOURNAMENT_BRACKETS[ev.bracketId]) {
    const bracket = TOURNAMENT_BRACKETS[ev.bracketId];
    const courtMatches = [];

    // Stage 1 Americano Groups assigned to this court
    const groupsOnCourt = (bracket.groups || []).filter(g => g.court && g.court.includes(courtName));
    groupsOnCourt.forEach(group => {
      (group.matches || []).forEach((m, mIdx) => {
        courtMatches.push({
          stage: group.name,
          title: `${group.name} · ${m.round || `Match ${mIdx + 1}`}`,
          pair1: m.pair1 || 'Team A',
          pair2: m.pair2 || 'Team B',
          format: '1 Set to 11',
          badgeClass: 'bg-blue-50 text-blue-900 border border-blue-200'
        });
      });
    });

    // Playoffs: Quarterfinals on this court
    const qfOnCourt = (bracket.playoffs?.quarterfinals || []).filter(q => q.court && q.court.includes(courtName));
    qfOnCourt.forEach(q => {
      courtMatches.push({
        stage: 'Playoffs',
        title: q.name,
        pair1: q.team1?.name || 'TBD',
        pair2: q.team2?.name || 'TBD',
        format: q.format || 'BO3 to 11',
        badgeClass: 'bg-indigo-50 text-indigo-900 border border-indigo-200'
      });
    });

    // Playoffs: Semifinals on this court
    const sfOnCourt = (bracket.playoffs?.semifinals || []).filter(s => s.court && s.court.includes(courtName));
    sfOnCourt.forEach(s => {
      courtMatches.push({
        stage: 'Playoffs',
        title: s.name,
        pair1: s.team1?.name || 'Winner QF',
        pair2: s.team2?.name || 'Winner QF',
        format: s.format || 'BO3 to 11',
        badgeClass: 'bg-purple-50 text-purple-900 border border-purple-200'
      });
    });

    // Playoffs: Grand Final on this court
    if (bracket.playoffs?.grandFinal && bracket.playoffs.grandFinal.court && bracket.playoffs.grandFinal.court.includes(courtName)) {
      const gf = bracket.playoffs.grandFinal;
      courtMatches.push({
        stage: 'Championship',
        title: '🥇 Grand Championship Final',
        pair1: gf.team1?.name || 'Winner SF1',
        pair2: gf.team2?.name || 'Winner SF2',
        format: 'BO5 to 11',
        badgeClass: 'bg-amber-100 text-amber-950 border border-amber-300 font-bold'
      });
    }

    if (courtMatches.length > 0) {
      return courtMatches;
    }
  }

  // 2. Generic / Other categories (e.g. Mixed Doubles, DUPR, Socials)
  if (ev.category === 'tournament' || ev.category === 'round_robin') {
    return [
      {
        stage: 'Round 1',
        title: `${ev.title} · Match 1`,
        pair1: 'Pair 1',
        pair2: 'Pair 2',
        format: '1 Set to 11',
        badgeClass: 'bg-blue-50 text-blue-900 border border-blue-200'
      },
      {
        stage: 'Round 2',
        title: `${ev.title} · Match 2`,
        pair1: 'Pair 3',
        pair2: 'Pair 4',
        format: '1 Set to 11',
        badgeClass: 'bg-blue-50 text-blue-900 border border-blue-200'
      },
      {
        stage: 'Round 3',
        title: `${ev.title} · Match 3`,
        pair1: 'Pair 1',
        pair2: 'Pair 3',
        format: '1 Set to 11',
        badgeClass: 'bg-blue-50 text-blue-900 border border-blue-200'
      },
      {
        stage: 'Round 4',
        title: `${ev.title} · Match 4`,
        pair1: 'Pair 2',
        pair2: 'Pair 4',
        format: '1 Set to 11',
        badgeClass: 'bg-blue-50 text-blue-900 border border-blue-200'
      },
      {
        stage: 'Round 5',
        title: `${ev.title} · Match 5`,
        pair1: 'Pair 1',
        pair2: 'Pair 4',
        format: '1 Set to 11',
        badgeClass: 'bg-blue-50 text-blue-900 border border-blue-200'
      },
      {
        stage: 'Round 6',
        title: `${ev.title} · Match 6`,
        pair1: 'Pair 2',
        pair2: 'Pair 3',
        format: '1 Set to 11',
        badgeClass: 'bg-blue-50 text-blue-900 border border-blue-200'
      }
    ];
  }

  // 3. Social / Open Play
  return [
    {
      stage: 'Rotation 1',
      title: `${ev.title} · Game 1`,
      pair1: 'Open Rotation A',
      pair2: 'Open Rotation B',
      format: 'Social Play to 11',
      badgeClass: 'bg-stone-100 text-stone-800 border border-stone-200'
    },
    {
      stage: 'Rotation 2',
      title: `${ev.title} · Game 2`,
      pair1: 'Open Rotation C',
      pair2: 'Open Rotation D',
      format: 'Social Play to 11',
      badgeClass: 'bg-stone-100 text-stone-800 border border-stone-200'
    },
    {
      stage: 'Rotation 3',
      title: `${ev.title} · Game 3`,
      pair1: 'Open Rotation E',
      pair2: 'Open Rotation F',
      format: 'Social Play to 11',
      badgeClass: 'bg-stone-100 text-stone-800 border border-stone-200'
    },
    {
      stage: 'Rotation 4',
      title: `${ev.title} · Game 4`,
      pair1: 'King of the Court',
      pair2: 'Challengers',
      format: 'Social Play to 11',
      badgeClass: 'bg-stone-100 text-stone-800 border border-stone-200'
    }
  ];
}

/// ─── DUPR Official Club CSV Export ───
window.exportDuprCsv = function() {
  const bracket = getActiveBracket();
  if (!bracket) {
    alert('Tournament bracket not found.');
    return;
  }

  const roster = state.playersRoster || [];
  const playerMap = {};
  roster.forEach(p => {
    playerMap[p.name] = p.duprId || '';
  });

  // Official DUPR CSV Column Headers
  const rows = [
    [
      'Match Date',
      'Event Name',
      'Match Type',
      'Player 1 Name',
      'Player 1 DUPR ID',
      'Player 2 Name',
      'Player 2 DUPR ID',
      'Player 3 Name',
      'Player 3 DUPR ID',
      'Player 4 Name',
      'Player 4 DUPR ID',
      'Game 1 Team 1',
      'Game 1 Team 2',
      'Game 2 Team 1',
      'Game 2 Team 2',
      'Game 3 Team 1',
      'Game 3 Team 2'
    ]
  ];

  const matchDate = '2026-10-04';
  const eventName = 'NOI EXPAT OPEN';

  // 1. Group stage matches (Double Americano)
  (bracket.groups || []).forEach(group => {
    (group.matches || []).forEach(m => {
      const t1 = (m.pair1 || '').split('&').map(s => s.trim());
      const t2 = (m.pair2 || '').split('&').map(s => s.trim());
      const p1 = t1[0] || '';
      const p2 = t1[1] || '';
      const p3 = t2[0] || '';
      const p4 = t2[1] || '';

      let g1t1 = '', g1t2 = '';
      if (m.score && m.score.includes('-') && m.score !== '—') {
        const parts = m.score.split('-').map(s => s.trim());
        g1t1 = parts[0] || '';
        g1t2 = parts[1] || '';
      }

      rows.push([
        matchDate,
        eventName,
        'DOUBLES',
        p1, playerMap[p1] || '',
        p2, playerMap[p2] || '',
        p3, playerMap[p3] || '',
        p4, playerMap[p4] || '',
        g1t1, g1t2,
        '', '',
        '', ''
      ]);
    });
  });

  // Build CSV content
  const csvString = rows.map(r => r.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `noi-expat-open-dupr-matches.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


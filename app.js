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
  bracketActiveTab: 'stage1',
  bracketGroupFilter: 'all',
  bracketStage2Filter: 'all'
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
    const courtEvents = (currentDay.schedule || []).filter(ev => ev.courtId === court.id);

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

      // Card classes
      const cardClasses = isPlanned
        ? `bg-gradient-to-br ${catConfig.cardBg} border-2 border-dashed ${catConfig.cardBorderDashed} opacity-[0.65] hover:opacity-100`
        : `bg-gradient-to-br ${catConfig.cardBg} border ${catConfig.cardBorder} ${isFinals ? 'ring-2 ring-amber-300/40' : ''} shadow-card hover:shadow-card-hover`;

      bodyHtml += `
        <div 
          class="timeline-event-card ${cardClasses}"
          style="top: ${topPx}px; height: ${heightPx}px;"
          title="${ev.title}">
          
          <!-- Header: Badge + Time -->
          <div class="flex flex-wrap items-center justify-between gap-1">
            <span class="inline-flex items-center h-[20px] px-2 rounded-md text-[9px] sm:text-[10px] uppercase font-bold tracking-wide leading-none whitespace-nowrap ${
              isFree ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : catConfig.badge
            }">
              ${isFree ? 'Free Court' : catConfig.short}
            </span>
            <span class="inline-flex items-center h-[20px] px-1.5 sm:px-2 rounded-md text-[10px] sm:text-[11px] font-mono font-semibold tabular-nums bg-white/90 text-stone-600 border border-stone-200 leading-none whitespace-nowrap">
              ${ev.start}–${ev.end}<span class="text-stone-400 font-normal ml-1 hidden sm:inline">${formatDuration(durationMinutes)}</span>
            </span>
          </div>

          <!-- Content: Logo + Title + Host (vertically centered) -->
          <div class="my-auto flex flex-col items-center text-center gap-2 py-2">
            ${ev.logo ? `
              <div class="p-1.5 rounded-xl bg-white border border-stone-200 shadow-sm flex items-center justify-center ${isPlanned ? 'opacity-60' : ''}">
                <img src="${ev.logo}" alt="" class="h-10 sm:h-12 w-auto max-w-full object-contain rounded-lg" onerror="this.parentElement.style.display='none'" />
              </div>
            ` : ''}
            <div class="text-[13px] sm:text-sm font-extrabold ${isPlanned ? 'text-stone-500 italic' : 'text-stone-900'} leading-snug">
              ${ev.title}
            </div>
            ${ev.host !== undefined ? `
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${
                isPlanned 
                  ? 'bg-stone-100/80 border border-stone-200/80 text-stone-500' 
                  : 'bg-white border-2 border-stone-200/90 shadow-xs text-stone-800'
              } text-[12px] leading-none mt-1">
                <span class="text-stone-400 font-bold uppercase tracking-wider text-[10px]">Host</span>
                <span class="w-1 h-3 rounded-full bg-stone-300"></span>
                <span class="font-extrabold ${ev.host && ev.host !== 'TBA' ? 'text-stone-950 text-[13px]' : 'text-stone-400 font-medium italic text-[12px]'}">${ev.host || 'TBA'}</span>
              </div>
            ` : ''}
          </div>

          <!-- Footer: Tournament Table (Left) + Reclub Link (Right) -->
          <div class="pt-2.5 border-t ${isPlanned ? 'border-stone-200/40' : 'border-stone-200'} flex items-center justify-between gap-2">
            ${ev.bracketId ? `
              <button 
                type="button" 
                onclick="window.openBracketModal && window.openBracketModal('${ev.bracketId}')"
                class="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-[11px] font-bold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 hover:border-stone-400 shadow-2xs hover:shadow-xs transition-all duration-150 cursor-pointer whitespace-nowrap">
                <i data-lucide="layout-grid" class="w-3.5 h-3.5 text-blue-600"></i>
                <span>Tournament Table</span>
              </button>
            ` : `<div></div>`}
            <a 
              href="${hasReclubUrl ? ev.reclubUrl : 'javascript:void(0)'}" 
              ${hasReclubUrl ? 'target="_blank" rel="noopener noreferrer"' : ''}
              class="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-[11px] font-semibold transition-all duration-150 ${
                hasReclubUrl 
                  ? 'text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 cursor-pointer' 
                  : 'text-stone-400 bg-stone-100 border border-stone-200 cursor-default'
              }">
              <i data-lucide="external-link" class="w-3 h-3"></i>
              <span>Reclub Link</span>
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

  const printBtn = document.getElementById('printScheduleBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Bracket modal backdrop click to close
  const backdrop = document.getElementById('bracketModalBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      window.closeBracketModal();
    });
  }

  // Keyboard Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.activeBracketId) {
      window.closeBracketModal();
    }
  });
}

/// ─── Tournament Draw / Bracket Modal Functions ───
window.openBracketModal = function(bracketId) {
  state.activeBracketId = bracketId;
  state.bracketActiveTab = 'stage1';
  state.bracketGroupFilter = 'all';
  state.bracketStage2Filter = 'all';
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

window.setBracketStage2Filter = function(filter) {
  state.bracketStage2Filter = filter;
  renderBracketModal();
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

function renderBracketModal() {
  const container = document.getElementById('bracketModalContent');
  if (!container || !state.activeBracketId) return;

  const bracket = (TOURNAMENT_CONFIG.brackets && TOURNAMENT_CONFIG.brackets[state.activeBracketId])
    || (typeof TOURNAMENT_BRACKETS !== 'undefined' && TOURNAMENT_BRACKETS[state.activeBracketId]);

  if (!bracket) {
    container.innerHTML = `<div class="p-8 text-center text-stone-500">Tournament table data not found.</div>`;
    return;
  }

  const groupsList = bracket.groups || bracket.pools || [];
  const activeTab = (state.bracketActiveTab === 'groups') ? 'stage1' : (state.bracketActiveTab === 'rules' ? 'schedule' : state.bracketActiveTab);

  // Modal Header
  let html = `
    <!-- Header -->
    <div class="px-5 sm:px-7 py-4 border-b border-stone-200/80 bg-stone-50/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-2 mb-1.5">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-950 text-white text-xs font-bold uppercase tracking-wider shadow-2xs">
            <i data-lucide="user-check" class="w-3.5 h-3.5 text-amber-400"></i>
            Host: ${bracket.host}
          </span>
          <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold">
            ${bracket.format}
          </span>
          <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold">
            ${bracket.totalMatches || 60} Matches · 15 Rounds · 32 Players
          </span>
        </div>
        <h2 class="text-lg sm:text-xl font-display font-extrabold text-stone-900 tracking-tight leading-snug">
          ${bracket.title}
        </h2>
        <div class="text-xs text-stone-500 font-medium mt-0.5">
          ${bracket.day} • ${bracket.time} • ${bracket.courts} (5 Hours = 300 Min)
        </div>
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
          onclick="setBracketTab('stage1')" 
          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'stage1' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          Stage 1: Groups A–H <span class="ml-1 text-[10px] px-1.5 py-0.2 rounded-md bg-stone-200/80 text-stone-700">24 M</span>
        </button>
        <button 
          onclick="setBracketTab('stage2')" 
          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'stage2' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          Stage 2: Semifinals <span class="ml-1 text-[10px] px-1.5 py-0.2 rounded-md bg-stone-200/80 text-stone-700">24 M</span>
        </button>
        <button 
          onclick="setBracketTab('stage3')" 
          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'stage3' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          Stage 3: Finals & Medals <span class="ml-1 text-[10px] px-1.5 py-0.2 rounded-md bg-stone-200/80 text-stone-700">12 M</span>
        </button>
        <button 
          onclick="setBracketTab('schedule')" 
          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'schedule' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          60-Match Schedule & Rules
        </button>
      </div>

      ${activeTab === 'stage1' ? `
        <!-- Stage 1 Group Quick Filter -->
        <div class="hidden lg:inline-flex items-center gap-1 overflow-x-auto">
          <span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider mr-1">Filter:</span>
          <button 
            onclick="setBracketGroupFilter('all')" 
            class="px-2 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              state.bracketGroupFilter === 'all' 
                ? 'bg-stone-900 text-white shadow-2xs' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }">All (8)</button>
          ${groupsList.map(g => `
            <button 
              onclick="setBracketGroupFilter('${g.id}')" 
              class="px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                state.bracketGroupFilter === g.id 
                  ? 'bg-stone-900 text-white shadow-2xs' 
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }">${g.name.replace('Group ', '')}</button>
          `).join('')}
        </div>
      ` : ''}

      ${activeTab === 'stage2' ? `
        <!-- Stage 2 Division Filter -->
        <div class="hidden sm:inline-flex items-center gap-1.5">
          <span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider mr-1">Division:</span>
          <button 
            onclick="setBracketStage2Filter('all')" 
            class="px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              state.bracketStage2Filter === 'all' 
                ? 'bg-stone-900 text-white shadow-2xs' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }">All (8)</button>
          <button 
            onclick="setBracketStage2Filter('gold')" 
            class="px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              state.bracketStage2Filter === 'gold' 
                ? 'bg-amber-500 text-stone-950 shadow-2xs' 
                : 'bg-amber-50 text-amber-900 border border-amber-200/60 hover:bg-amber-100'
            }">Gold (4)</button>
          <button 
            onclick="setBracketStage2Filter('silver')" 
            class="px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              state.bracketStage2Filter === 'silver' 
                ? 'bg-slate-700 text-white shadow-2xs' 
                : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
            }">Silver (4)</button>
        </div>
      ` : ''}
    </div>

    <!-- Body Content Area (Scrollable) -->
    <div class="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 bg-surface-1">
  `;

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 1: STAGE 1 — PRELIM GROUPS (Groups A–H · 24 Matches)
  // ══════════════════════════════════════════════════════════════════════════
  if (activeTab === 'stage1') {
    const visibleGroups = state.bracketGroupFilter === 'all'
      ? groupsList
      : groupsList.filter(g => g.id === state.bracketGroupFilter);

    html += `
      <div class="bg-blue-50/80 border border-blue-200/90 rounded-xl p-3.5 sm:p-4 text-xs text-blue-950 flex items-start gap-3 shadow-2xs">
        <i data-lucide="info" class="w-4 h-4 text-blue-600 shrink-0 mt-0.5"></i>
        <div class="leading-relaxed">
          <span class="font-bold">Stage 1 (24 Matches · Rounds 1–6):</span> 32 individual players are seeded into 8 groups of 4 players (Groups A to H). 
          Each player plays <strong>3 Americano matches</strong> (partnering with each of the other 3 players in their group once). 
          Matches are played to 11 points. 
          The <span class="font-bold text-amber-900 bg-amber-100/90 px-1.5 py-0.5 rounded border border-amber-200">Top 2 players</span> advance to the <strong>Gold Division</strong>; 
          the <span class="font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">3rd & 4th players</span> advance to the <strong>Silver Division</strong>!
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
    `;

    visibleGroups.forEach(group => {
      html += `
        <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card overflow-hidden flex flex-col">
          <!-- Group Header -->
          <div class="px-4 py-3 bg-stone-50 border-b border-stone-200/70 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span class="font-bold text-sm text-stone-900 font-display">${group.name}</span>
              <span class="text-[11px] text-stone-400 font-mono">(${group.court})</span>
            </div>
            <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
              <span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">Top 2 → Gold</span>
              <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">3–4 → Silver</span>
            </div>
          </div>

          <!-- Standings Table -->
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
                  <th class="py-2 px-2.5 text-right">Stage 2 Destination</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-100">
                ${group.standings.map(row => `
                  <tr class="${row.qualified ? 'bg-amber-50/30 font-medium' : 'text-stone-600'} hover:bg-stone-50 transition-colors">
                    <td class="py-2 px-2.5 text-center font-mono font-bold ${row.qualified ? 'text-amber-700' : 'text-stone-400'}">
                      ${row.rank}
                    </td>
                    <td class="py-2 px-2.5 font-bold ${row.qualified ? 'text-stone-900' : 'text-stone-700'}">
                      ${row.name}
                    </td>
                    <td class="py-2 px-2 text-center tabular-nums text-stone-500">${row.played}</td>
                    <td class="py-2 px-2 text-center tabular-nums text-stone-500">${row.wins}-${row.losses}</td>
                    <td class="py-2 px-2 text-center tabular-nums ${row.diff.startsWith('+') ? 'text-emerald-600 font-semibold' : 'text-stone-500'}">${row.diff}</td>
                    <td class="py-2 px-2 text-center font-mono font-extrabold text-stone-900 tabular-nums">${row.points}</td>
                    <td class="py-2 px-2.5 text-right whitespace-nowrap">
                      ${row.qualified 
                        ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                             <i data-lucide="award" class="w-2.5 h-2.5 text-amber-600"></i> Gold Division
                           </span>`
                        : `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
                             <i data-lucide="shield" class="w-2.5 h-2.5 text-slate-500"></i> Silver Division
                           </span>`
                      }
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
                    <span class="truncate ${m.winner === 1 ? 'font-bold text-stone-900' : 'text-stone-600'}">${m.pair1}</span>
                    <span class="text-stone-300 font-semibold shrink-0">vs</span>
                    <span class="truncate ${m.winner === 2 ? 'font-bold text-stone-900' : 'text-stone-600'}">${m.pair2}</span>
                  </div>
                  <span class="font-mono font-bold text-[11px] text-stone-800 px-2 py-0.5 rounded bg-stone-100 border border-stone-200 shrink-0">
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
  // TAB 2: STAGE 2 — SEMIFINALS (Gold & Silver · 24 Matches)
  // ══════════════════════════════════════════════════════════════════════════
  else if (activeTab === 'stage2') {
    const s2 = bracket.stage2;
    const filter = state.bracketStage2Filter || 'all';

    html += `
      <div class="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3.5 sm:p-4 text-xs text-amber-950 flex items-start gap-3 shadow-2xs">
        <i data-lucide="layers" class="w-4 h-4 text-amber-600 shrink-0 mt-0.5"></i>
        <div class="leading-relaxed">
          <span class="font-bold">${s2.title} (${s2.badge}):</span> ${s2.description} 
          In each 4-player group, every player plays <strong>3 matches</strong> ('each with each'). 
          The <span class="font-bold text-amber-900 bg-amber-100 px-1 rounded border border-amber-300">#1 Winner</span> of each Gold group qualifies for the <strong>Gold Championship Final (1st–4th) 🥇🥈🥉</strong>, 
          #2 qualifies for <strong>5th–8th Place Final</strong>. 
          The #1 Winner of each Silver group qualifies for the <strong>Silver Cup Final 🏆</strong>!
        </div>
      </div>
    `;

    // Render Gold Division Groups
    if (filter === 'all' || filter === 'gold') {
      html += `
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b border-amber-200 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-200"></span>
              <h3 class="font-display font-extrabold text-base text-stone-900">Gold Division (Top 16 from Stage 1 · Groups G1–G4)</h3>
            </div>
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              12 Matches · Rounds 7–9 (13:00 – 14:00)
            </span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            ${s2.goldDivision.map(group => `
              <div class="bg-white rounded-2xl border border-amber-200/90 shadow-card overflow-hidden flex flex-col">
                <!-- Group Header -->
                <div class="px-4 py-3 bg-gradient-to-r from-amber-50/80 to-stone-50 border-b border-amber-200/70 flex items-center justify-between">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-sm text-stone-900 font-display">${group.name}</span>
                      <span class="text-[11px] text-amber-700 font-mono font-semibold">(${group.court})</span>
                    </div>
                    <div class="text-[10px] text-stone-500 font-mono mt-0.5">${group.seedInfo}</div>
                  </div>
                  <span class="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    Winner → Final 🥇
                  </span>
                </div>

                <!-- Standings Table -->
                <div class="p-3 overflow-x-auto">
                  <table class="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr class="border-b border-stone-200 text-[10px] font-bold uppercase tracking-wider text-stone-400 bg-stone-50/50">
                        <th class="py-2 px-2 w-7 text-center">#</th>
                        <th class="py-2 px-2">Player</th>
                        <th class="py-2 px-1.5 text-stone-400 font-mono text-[10px]">Seed</th>
                        <th class="py-2 px-1.5 text-center">MP</th>
                        <th class="py-2 px-1.5 text-center">W-L</th>
                        <th class="py-2 px-1.5 text-center">Diff</th>
                        <th class="py-2 px-1.5 text-center font-bold text-stone-700">Pts</th>
                        <th class="py-2 px-2 text-right">Stage 3 Qual</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-stone-100">
                      ${group.standings.map(row => `
                        <tr class="${row.qualified ? 'bg-amber-50/60 font-medium' : 'text-stone-600'} hover:bg-stone-50 transition-colors">
                          <td class="py-2 px-2 text-center font-mono font-bold ${row.qualified ? 'text-amber-700' : 'text-stone-400'}">
                            ${row.rank}
                          </td>
                          <td class="py-2 px-2 font-bold ${row.qualified ? 'text-stone-900' : 'text-stone-700'}">
                            ${row.name}
                          </td>
                          <td class="py-2 px-1.5 text-[10px] font-mono text-stone-400">${row.origin}</td>
                          <td class="py-2 px-1.5 text-center tabular-nums text-stone-500">${row.played}</td>
                          <td class="py-2 px-1.5 text-center tabular-nums text-stone-500">${row.wins}-${row.losses}</td>
                          <td class="py-2 px-1.5 text-center tabular-nums ${row.diff.startsWith('+') ? 'text-emerald-600 font-semibold' : 'text-stone-500'}">${row.diff}</td>
                          <td class="py-2 px-1.5 text-center font-mono font-extrabold text-stone-900 tabular-nums">${row.points}</td>
                          <td class="py-2 px-2 text-right whitespace-nowrap">
                            ${row.rank === 1
                              ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                   <i data-lucide="crown" class="w-2.5 h-2.5 text-amber-600"></i> ${row.nextStage}
                                 </span>`
                              : (row.rank === 2
                                ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                                     5th–8th Final
                                   </span>`
                                : `<span class="text-[10px] text-stone-400 italic">${row.nextStage}</span>`)
                            }
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>

                <!-- Matches -->
                <div class="px-4 py-3 bg-stone-50/50 border-t border-stone-200/60 mt-auto">
                  <div class="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center justify-between">
                    <span>Americano Matches (3 Rounds):</span>
                    <span class="text-[10px] font-normal text-stone-500 lowercase">each with each</span>
                  </div>
                  <div class="space-y-1.5 text-xs">
                    ${group.matches.map(m => `
                      <div class="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-stone-200/60 text-stone-700 shadow-2xs">
                        <div class="flex items-center gap-2 min-w-0">
                          <span class="text-[10px] font-mono font-bold text-stone-400 shrink-0">${m.round}</span>
                          <span class="truncate ${m.winner === 1 ? 'font-bold text-stone-900' : 'text-stone-600'}">${m.pair1}</span>
                          <span class="text-stone-300 font-semibold shrink-0">vs</span>
                          <span class="truncate ${m.winner === 2 ? 'font-bold text-stone-900' : 'text-stone-600'}">${m.pair2}</span>
                        </div>
                        <span class="font-mono font-bold text-[11px] text-stone-800 px-2 py-0.5 rounded bg-stone-100 border border-stone-200 shrink-0">
                          ${m.score}
                        </span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Render Silver Division Groups
    if (filter === 'all' || filter === 'silver') {
      html += `
        <div class="space-y-4 pt-4">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-slate-500 ring-2 ring-slate-200"></span>
              <h3 class="font-display font-extrabold text-base text-stone-900">Silver Division (16 Players · Groups S1–S4)</h3>
            </div>
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-300">
              12 Matches · Rounds 10–12 (14:00 – 15:00)
            </span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            ${s2.silverDivision.map(group => `
              <div class="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden flex flex-col">
                <!-- Group Header -->
                <div class="px-4 py-3 bg-gradient-to-r from-slate-50 to-stone-50 border-b border-slate-200/70 flex items-center justify-between">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-sm text-stone-900 font-display">${group.name}</span>
                      <span class="text-[11px] text-slate-600 font-mono font-semibold">(${group.court})</span>
                    </div>
                    <div class="text-[10px] text-stone-500 font-mono mt-0.5">${group.seedInfo}</div>
                  </div>
                  <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-300 text-[10px] font-bold uppercase tracking-wider">
                    Winner → Silver Cup 🏆
                  </span>
                </div>

                <!-- Standings Table -->
                <div class="p-3 overflow-x-auto">
                  <table class="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr class="border-b border-stone-200 text-[10px] font-bold uppercase tracking-wider text-stone-400 bg-stone-50/50">
                        <th class="py-2 px-2 w-7 text-center">#</th>
                        <th class="py-2 px-2">Player</th>
                        <th class="py-2 px-1.5 text-stone-400 font-mono text-[10px]">Seed</th>
                        <th class="py-2 px-1.5 text-center">MP</th>
                        <th class="py-2 px-1.5 text-center">W-L</th>
                        <th class="py-2 px-1.5 text-center">Diff</th>
                        <th class="py-2 px-1.5 text-center font-bold text-stone-700">Pts</th>
                        <th class="py-2 px-2 text-right">Stage 3 Qual</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-stone-100">
                      ${group.standings.map(row => `
                        <tr class="${row.qualified ? 'bg-slate-50/70 font-medium' : 'text-stone-600'} hover:bg-stone-50 transition-colors">
                          <td class="py-2 px-2 text-center font-mono font-bold ${row.qualified ? 'text-slate-800' : 'text-stone-400'}">
                            ${row.rank}
                          </td>
                          <td class="py-2 px-2 font-bold ${row.qualified ? 'text-stone-900' : 'text-stone-700'}">
                            ${row.name}
                          </td>
                          <td class="py-2 px-1.5 text-[10px] font-mono text-stone-400">${row.origin}</td>
                          <td class="py-2 px-1.5 text-center tabular-nums text-stone-500">${row.played}</td>
                          <td class="py-2 px-1.5 text-center tabular-nums text-stone-500">${row.wins}-${row.losses}</td>
                          <td class="py-2 px-1.5 text-center tabular-nums ${row.diff.startsWith('+') ? 'text-emerald-600 font-semibold' : 'text-stone-500'}">${row.diff}</td>
                          <td class="py-2 px-1.5 text-center font-mono font-extrabold text-stone-900 tabular-nums">${row.points}</td>
                          <td class="py-2 px-2 text-right whitespace-nowrap">
                            ${row.rank === 1
                              ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-900 border border-slate-300">
                                   <i data-lucide="trophy" class="w-2.5 h-2.5 text-amber-500"></i> ${row.nextStage}
                                 </span>`
                              : (row.rank === 2
                                ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
                                     21st–24th Final
                                   </span>`
                                : `<span class="text-[10px] text-stone-400 italic">${row.nextStage}</span>`)
                            }
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>

                <!-- Matches -->
                <div class="px-4 py-3 bg-stone-50/50 border-t border-stone-200/60 mt-auto">
                  <div class="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center justify-between">
                    <span>Americano Matches (3 Rounds):</span>
                    <span class="text-[10px] font-normal text-stone-500 lowercase">each with each</span>
                  </div>
                  <div class="space-y-1.5 text-xs">
                    ${group.matches.map(m => `
                      <div class="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-stone-200/60 text-stone-700 shadow-2xs">
                        <div class="flex items-center gap-2 min-w-0">
                          <span class="text-[10px] font-mono font-bold text-stone-400 shrink-0">${m.round}</span>
                          <span class="truncate ${m.winner === 1 ? 'font-bold text-stone-900' : 'text-stone-600'}">${m.pair1}</span>
                          <span class="text-stone-300 font-semibold shrink-0">vs</span>
                          <span class="truncate ${m.winner === 2 ? 'font-bold text-stone-900' : 'text-stone-600'}">${m.pair2}</span>
                        </div>
                        <span class="font-mono font-bold text-[11px] text-stone-800 px-2 py-0.5 rounded bg-stone-100 border border-stone-200 shrink-0">
                          ${m.score}
                        </span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 3: STAGE 3 — FINALS & MEDALS (12 Matches)
  // ══════════════════════════════════════════════════════════════════════════
  else if (activeTab === 'stage3') {
    const s3 = bracket.stage3;

    html += `
      <div class="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-300/80 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3 shadow-2xs">
        <i data-lucide="trophy" class="w-5 h-5 text-amber-600 shrink-0 mt-0.5"></i>
        <div class="leading-relaxed">
          <span class="font-bold text-sm">${s3.title} (${s3.badge}):</span><br/>
          ${s3.description} 
          All 4 groups compete simultaneously on Courts 1–4 in Rounds 13, 14, and 15 (15:00 – 16:00). 
          Every player plays 3 Americano matches to decide the final podium ranking!
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        ${s3.finalGroups.map(fg => `
          <div class="bg-white rounded-2xl border ${fg.id === 'gold-champ' ? 'border-amber-300 shadow-md ring-2 ring-amber-400/20' : 'border-stone-200/80 shadow-card'} overflow-hidden flex flex-col">
            <!-- Header -->
            <div class="px-5 py-3.5 bg-gradient-to-r ${fg.cardBg || 'from-stone-50 to-white'} border-b border-stone-200/70 flex items-center justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-display font-extrabold text-sm sm:text-base text-stone-900">${fg.name}</h3>
                </div>
                <div class="text-[11px] text-stone-500 font-medium mt-0.5">${fg.subName} • <span class="font-mono font-bold text-stone-700">${fg.court}</span></div>
              </div>
              <span class="px-2.5 py-1 rounded-lg text-xs font-bold ${fg.badgeColor} border shrink-0">
                ${fg.badge}
              </span>
            </div>

            <!-- Standings Table with Podium -->
            <div class="p-3.5 overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-stone-200 text-[10px] font-bold uppercase tracking-wider text-stone-400 bg-stone-50/50">
                    <th class="py-2 px-2.5 text-center">Place</th>
                    <th class="py-2 px-2.5">Player</th>
                    <th class="py-2 px-2 text-stone-400 font-mono text-[10px]">Seed</th>
                    <th class="py-2 px-2 text-center">MP</th>
                    <th class="py-2 px-2 text-center">W-L</th>
                    <th class="py-2 px-2 text-center">Diff</th>
                    <th class="py-2 px-2 text-center font-bold text-stone-700">Pts</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-stone-100">
                  ${fg.standings.map(row => `
                    <tr class="${row.rank === 1 ? 'bg-amber-50/70 font-semibold' : (row.rank === 2 ? 'bg-stone-50 font-medium' : '')} hover:bg-stone-50/80 transition-colors">
                      <td class="py-2.5 px-2.5 font-bold whitespace-nowrap">
                        <span class="text-xs ${row.rank === 1 ? 'text-amber-800' : 'text-stone-700'}">${row.medal}</span>
                      </td>
                      <td class="py-2.5 px-2.5 font-extrabold text-stone-900">
                        ${row.name}
                      </td>
                      <td class="py-2 px-2 text-[10px] font-mono text-stone-400">${row.origin}</td>
                      <td class="py-2 px-2 text-center tabular-nums text-stone-500">${row.played}</td>
                      <td class="py-2 px-2 text-center tabular-nums text-stone-500">${row.wins}-${row.losses}</td>
                      <td class="py-2 px-2 text-center tabular-nums ${row.diff.startsWith('+') ? 'text-emerald-600 font-bold' : 'text-stone-500'}">${row.diff}</td>
                      <td class="py-2 px-2 text-center font-mono font-black text-stone-950 text-sm tabular-nums">${row.points}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Matches List -->
            <div class="px-4 py-3 bg-stone-50/60 border-t border-stone-200/60 mt-auto">
              <div class="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center justify-between">
                <span>Finals Americano Matches (Rounds 13–15):</span>
                <span class="text-[10px] font-normal text-stone-500 lowercase">each with each</span>
              </div>
              <div class="space-y-1.5 text-xs">
                ${fg.matches.map(m => `
                  <div class="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-stone-200/60 text-stone-700 shadow-2xs">
                    <div class="flex items-center gap-2 min-w-0">
                      <span class="text-[10px] font-mono font-bold text-stone-400 shrink-0">${m.round}</span>
                      <span class="truncate ${m.winner === 1 ? 'font-bold text-stone-900' : 'text-stone-600'}">${m.pair1}</span>
                      <span class="text-stone-300 font-semibold shrink-0">vs</span>
                      <span class="truncate ${m.winner === 2 ? 'font-bold text-stone-900' : 'text-stone-600'}">${m.pair2}</span>
                    </div>
                    <span class="font-mono font-bold text-[11px] text-stone-800 px-2.5 py-0.5 rounded bg-stone-100 border border-stone-200 shrink-0">
                      ${m.score}
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 4: 60-MATCH SCHEDULE & RULES (15 Rounds Grid + System)
  // ══════════════════════════════════════════════════════════════════════════
  else if (activeTab === 'schedule') {
    const sGrid = bracket.schedule15Rounds || [];

    html += `
      <!-- Tournament Math & Efficiency Banner -->
      <div class="bg-stone-900 text-white rounded-2xl p-5 sm:p-6 shadow-md">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[11px] font-extrabold uppercase tracking-wide mb-2">
              <i data-lucide="zap" class="w-3 h-3"></i> 60 Matches · 100% Court Utilization
            </div>
            <h3 class="text-lg sm:text-xl font-display font-extrabold tracking-tight">
              3-Stage Americano Tournament Architecture
            </h3>
            <p class="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              Designed for 5 hours (11:00 – 16:00) across 4 courts. 15 rounds of 20 minutes each. 
              In every group, players rotate partners so everyone plays with everyone ("each with each"). 
              Every player plays at least 6 matches, with finalists playing 9 matches!
            </p>
          </div>
          <div class="grid grid-cols-3 gap-2 shrink-0">
            <div class="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700 text-center">
              <div class="text-lg font-black text-amber-400 font-mono">24</div>
              <div class="text-[10px] text-stone-400 uppercase font-semibold">Stage 1</div>
            </div>
            <div class="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700 text-center">
              <div class="text-lg font-black text-amber-400 font-mono">24</div>
              <div class="text-[10px] text-stone-400 uppercase font-semibold">Stage 2</div>
            </div>
            <div class="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700 text-center">
              <div class="text-lg font-black text-emerald-400 font-mono">12</div>
              <div class="text-[10px] text-stone-400 uppercase font-semibold">Stage 3</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 15-Round Court Matrix Table -->
      <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card p-4 sm:p-5">
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
          <div class="flex items-center gap-2">
            <i data-lucide="calendar" class="w-4 h-4 text-blue-600"></i>
            <h4 class="font-display font-bold text-sm sm:text-base text-stone-900">
              15-Round Master Court Schedule (11:00 – 16:00)
            </h4>
          </div>
          <span class="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
            4 Courts Active Simultaneously
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="border-b border-stone-200 text-[10px] font-bold uppercase tracking-wider text-stone-400 bg-stone-50/80">
                <th class="py-2.5 px-3 w-16 text-center">Round</th>
                <th class="py-2.5 px-3 w-28">Time</th>
                <th class="py-2.5 px-3 w-40">Phase</th>
                <th class="py-2.5 px-3 text-stone-700 font-bold">Court 1</th>
                <th class="py-2.5 px-3 text-stone-700 font-bold">Court 2</th>
                <th class="py-2.5 px-3 text-stone-700 font-bold">Court 3</th>
                <th class="py-2.5 px-3 text-stone-700 font-bold">Court 4</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-100">
              ${sGrid.map(r => `
                <tr class="hover:bg-stone-50/80 transition-colors ${r.roundNum >= 13 ? 'bg-amber-50/20' : (r.roundNum >= 7 ? 'bg-stone-50/30' : '')}">
                  <td class="py-2.5 px-3 text-center font-mono font-bold text-stone-900">
                    R${r.roundNum}
                  </td>
                  <td class="py-2.5 px-3 font-mono text-[11px] font-semibold text-stone-600 whitespace-nowrap">
                    ${r.time}
                  </td>
                  <td class="py-2.5 px-3 whitespace-nowrap">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.roundNum >= 13 
                        ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                        : (r.roundNum >= 10
                          ? 'bg-slate-100 text-slate-800 border border-slate-200'
                          : (r.roundNum >= 7
                            ? 'bg-blue-100 text-blue-900 border border-blue-200'
                            : 'bg-stone-100 text-stone-700 border border-stone-200'))
                    }">
                      ${r.label}
                    </span>
                  </td>
                  <td class="py-2.5 px-3 font-medium text-stone-800 text-[11px]">${r.c1}</td>
                  <td class="py-2.5 px-3 font-medium text-stone-800 text-[11px]">${r.c2}</td>
                  <td class="py-2.5 px-3 font-medium text-stone-800 text-[11px]">${r.c3}</td>
                  <td class="py-2.5 px-3 font-medium text-stone-800 text-[11px]">${r.c4}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Rules Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${bracket.rules.map((rule, idx) => `
          <div class="p-4 rounded-xl bg-white border border-stone-200/80 shadow-card flex gap-3">
            <div class="w-7 h-7 rounded-lg bg-stone-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              0${idx + 1}
            </div>
            <div>
              <h4 class="text-xs font-bold text-stone-900 mb-1">${rule.title}</h4>
              <p class="text-[11px] sm:text-xs text-stone-600 leading-normal">${rule.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Americano Rotation Matrix Visualizer -->
      <div class="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-card">
        <h4 class="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 flex items-center gap-2">
          <i data-lucide="rotate-cw" class="w-4 h-4 text-blue-600"></i>
          <span>Americano Rotation Formula (Every Group of 4 Players)</span>
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="p-3.5 rounded-xl bg-stone-50 border border-stone-200 shadow-2xs">
            <div class="font-bold text-blue-600 text-[11px] mb-1 uppercase tracking-wide">Match 1</div>
            <div class="font-bold text-stone-900">Player A & Player B</div>
            <div class="text-stone-400 text-[10px] my-1 uppercase font-semibold">vs</div>
            <div class="font-bold text-stone-900">Player C & Player D</div>
          </div>
          <div class="p-3.5 rounded-xl bg-stone-50 border border-stone-200 shadow-2xs">
            <div class="font-bold text-blue-600 text-[11px] mb-1 uppercase tracking-wide">Match 2</div>
            <div class="font-bold text-stone-900">Player A & Player C</div>
            <div class="text-stone-400 text-[10px] my-1 uppercase font-semibold">vs</div>
            <div class="font-bold text-stone-900">Player B & Player D</div>
          </div>
          <div class="p-3.5 rounded-xl bg-stone-50 border border-stone-200 shadow-2xs">
            <div class="font-bold text-blue-600 text-[11px] mb-1 uppercase tracking-wide">Match 3</div>
            <div class="font-bold text-stone-900">Player A & Player D</div>
            <div class="text-stone-400 text-[10px] my-1 uppercase font-semibold">vs</div>
            <div class="font-bold text-stone-900">Player B & Player C</div>
          </div>
        </div>
      </div>
    `;
  }

  html += `
    </div>
  `;

  container.innerHTML = html;
}

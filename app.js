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
  bracketActiveTab: 'pools',
  bracketPoolFilter: 'all'
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

// ─── Tournament Draw / Bracket Modal Functions ───
window.openBracketModal = function(bracketId) {
  state.activeBracketId = bracketId;
  state.bracketActiveTab = 'pools';
  state.bracketPoolFilter = 'all';
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

window.setBracketPoolFilter = function(poolId) {
  state.bracketPoolFilter = poolId;
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

  // Modal Header
  let html = `
    <!-- Header -->
    <div class="px-5 sm:px-7 py-4 border-b border-stone-200/80 bg-stone-50/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-2 mb-1.5">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-stone-900 text-white text-[11px] font-bold uppercase tracking-wide">
            Host: ${bracket.host}
          </span>
          <span class="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[11px] font-bold">
            ${bracket.format}
          </span>
          <span class="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">
            ${bracket.playersCount} Players · ${bracket.poolsCount} Pools · Top ${bracket.advanceCount} Advance
          </span>
        </div>
        <h2 class="text-lg sm:text-xl font-display font-extrabold text-stone-900 tracking-tight leading-snug">
          ${bracket.title}
        </h2>
        <div class="text-xs text-stone-500 font-medium mt-0.5">
          ${bracket.day} • ${bracket.time} • ${bracket.courts}
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
      <div class="inline-flex items-center p-1 rounded-xl bg-stone-100 border border-stone-200/60">
        <button 
          onclick="setBracketTab('pools')" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            state.bracketActiveTab === 'pools' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          Group Stage (8 Pools)
        </button>
        <button 
          onclick="setBracketTab('playoffs')" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            state.bracketActiveTab === 'playoffs' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          Playoffs (Top 16)
        </button>
        <button 
          onclick="setBracketTab('rules')" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            state.bracketActiveTab === 'rules' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          Americano Rules
        </button>
      </div>

      ${state.bracketActiveTab === 'pools' ? `
        <!-- Pool Quick Filter -->
        <div class="hidden md:inline-flex items-center gap-1 overflow-x-auto">
          <span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider mr-1">Filter:</span>
          <button 
            onclick="setBracketPoolFilter('all')" 
            class="px-2 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              state.bracketPoolFilter === 'all' 
                ? 'bg-stone-900 text-white shadow-2xs' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }">All</button>
          ${bracket.pools.map(p => `
            <button 
              onclick="setBracketPoolFilter('${p.id}')" 
              class="px-2 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                state.bracketPoolFilter === p.id 
                  ? 'bg-stone-900 text-white shadow-2xs' 
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }">${p.id.replace('pool-', 'P')}</button>
          `).join('')}
        </div>
      ` : ''}
    </div>

    <!-- Body Content Area (Scrollable) -->
    <div class="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 bg-surface-1">
  `;

  // ── Tab 1: Pools / Group Stage ──
  if (state.bracketActiveTab === 'pools') {
    const visiblePools = state.bracketPoolFilter === 'all'
      ? bracket.pools
      : bracket.pools.filter(p => p.id === state.bracketPoolFilter);

    html += `
      <div class="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5 sm:p-4 text-xs text-blue-900 flex items-start gap-3">
        <i data-lucide="info" class="w-4 h-4 text-blue-600 shrink-0 mt-0.5"></i>
        <div>
          <span class="font-bold">Americano / Individual Doubles Format:</span> 32 individual players are seeded into 8 pools (4 players per pool). 
          Each player plays <strong>3 matches</strong> (partnering with each of the other 3 players in their pool once). 
          The <strong>Top 2 players</strong> from each pool advance to the 16-player Championship Playoff stage!
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
    `;

    visiblePools.forEach(pool => {
      html += `
        <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card overflow-hidden flex flex-col">
          <!-- Pool Header -->
          <div class="px-4 py-3 bg-stone-50 border-b border-stone-200/70 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span class="font-bold text-sm text-stone-900 font-display">${pool.name}</span>
              <span class="text-[11px] text-stone-400 font-mono">(${pool.court})</span>
            </div>
            <span class="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
              Top 2 Advance
            </span>
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
                  <th class="py-2 px-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-100">
                ${pool.standings.map(row => `
                  <tr class="${row.qualified ? 'bg-emerald-50/40 font-medium' : 'text-stone-600'} hover:bg-stone-50 transition-colors">
                    <td class="py-2 px-2.5 text-center font-mono font-bold ${row.qualified ? 'text-emerald-700' : 'text-stone-400'}">
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
                        ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                             <i data-lucide="check" class="w-2.5 h-2.5"></i> Advance
                           </span>`
                        : `<span class="text-[10px] text-stone-400 italic font-normal">Eliminated</span>`
                      }
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Pool Matches (3 Rounds: Each with Each) -->
          <div class="px-4 py-3 bg-stone-50/50 border-t border-stone-200/60 mt-auto">
            <div class="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center justify-between">
              <span>Pool Matches (3 Rounds):</span>
              <span class="text-[10px] font-normal text-stone-500 lowercase">each with each</span>
            </div>
            <div class="space-y-1.5 text-xs">
              ${pool.matches.map(m => `
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

  // ── Tab 2: Playoffs (Top 16 Bracket) ──
  else if (state.bracketActiveTab === 'playoffs') {
    const po = bracket.playoffs;
    html += `
      <div class="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 sm:p-4 text-xs text-amber-900 flex items-start gap-3">
        <i data-lucide="award" class="w-4 h-4 text-amber-600 shrink-0 mt-0.5"></i>
        <div>
          <span class="font-bold">${po.title}:</span> ${po.description}
        </div>
      </div>

      <div class="space-y-6">
        ${po.rounds.map((round, rIdx) => `
          <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card p-4 sm:p-5">
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full ${rIdx === po.rounds.length - 1 ? 'bg-amber-400 ring-2 ring-amber-400/20' : 'bg-blue-500'}"></span>
                <h3 class="font-display font-extrabold text-base text-stone-900">${round.name}</h3>
              </div>
              <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                ${round.badge}
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              ${round.matches.map(match => `
                <div class="rounded-xl border ${match.title ? 'border-amber-300 bg-amber-50/20' : 'border-stone-200/80 bg-stone-50/40'} p-3.5 flex flex-col justify-between gap-2 shadow-2xs">
                  ${match.title ? `
                    <div class="text-[11px] font-bold text-amber-800 uppercase tracking-wide flex items-center justify-between">
                      <span>${match.title}</span>
                      <span class="text-stone-400 font-mono">${match.court}</span>
                    </div>
                  ` : `
                    <div class="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between">
                      <span>${match.id}</span>
                      <span class="text-stone-400 font-mono">${match.court}</span>
                    </div>
                  `}

                  <div class="space-y-1.5 text-xs">
                    <div class="flex items-center justify-between gap-2 p-2 rounded-lg ${match.winner === 1 ? 'bg-emerald-50 border border-emerald-200 font-bold text-emerald-950' : 'bg-white border border-stone-200/60 text-stone-600'}">
                      <span class="truncate">${match.pair1}</span>
                      ${match.winner === 1 ? '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>' : ''}
                    </div>
                    <div class="flex items-center justify-between gap-2 p-2 rounded-lg ${match.winner === 2 ? 'bg-emerald-50 border border-emerald-200 font-bold text-emerald-950' : 'bg-white border border-stone-200/60 text-stone-600'}">
                      <span class="truncate">${match.pair2}</span>
                      ${match.winner === 2 ? '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>' : ''}
                    </div>
                  </div>

                  <div class="text-right text-[11px] font-mono font-bold text-stone-700 pt-1 border-t border-stone-200/50">
                    Result: <span class="text-stone-900">${match.score}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ── Tab 3: Format & Scoring Rules ──
  else if (state.bracketActiveTab === 'rules') {
    html += `
      <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card p-5 sm:p-7 space-y-6">
        <div>
          <h3 class="text-base font-display font-extrabold text-stone-900 mb-1">
            Tournament Structure: Individual Doubles (Americano)
          </h3>
          <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
            ${bracket.description}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${bracket.rules.map((rule, idx) => `
            <div class="p-4 rounded-xl bg-surface-1 border border-stone-200/70 flex gap-3">
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

        <!-- Americano Rotation Matrix -->
        <div class="p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200">
          <h4 class="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 flex items-center gap-2">
            <i data-lucide="rotate-cw" class="w-3.5 h-3.5 text-blue-600"></i>
            <span>4-Player Americano Rotation Matrix per Pool</span>
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div class="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
              <div class="font-bold text-blue-600 text-[11px] mb-1 uppercase tracking-wide">Round 1</div>
              <div class="font-bold text-stone-900">Player A & Player B</div>
              <div class="text-stone-400 text-[10px] my-1 uppercase font-semibold">vs</div>
              <div class="font-bold text-stone-900">Player C & Player D</div>
            </div>
            <div class="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
              <div class="font-bold text-blue-600 text-[11px] mb-1 uppercase tracking-wide">Round 2</div>
              <div class="font-bold text-stone-900">Player A & Player C</div>
              <div class="text-stone-400 text-[10px] my-1 uppercase font-semibold">vs</div>
              <div class="font-bold text-stone-900">Player B & Player D</div>
            </div>
            <div class="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
              <div class="font-bold text-blue-600 text-[11px] mb-1 uppercase tracking-wide">Round 3</div>
              <div class="font-bold text-stone-900">Player A & Player D</div>
              <div class="text-stone-400 text-[10px] my-1 uppercase font-semibold">vs</div>
              <div class="font-bold text-stone-900">Player B & Player C</div>
            </div>
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

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
  bracketActiveTab: 'groups', // 'groups', 'playoffs', 'consolation', 'rules'
  bracketGroupFilter: 'all'
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
                <span>Tournament Table (BO3/BO5)</span>
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
  state.bracketActiveTab = 'groups';
  state.bracketGroupFilter = 'all';
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

function renderBracketModal() {
  const container = document.getElementById('bracketModalContent');
  if (!container || !state.activeBracketId) return;

  const bracket = (TOURNAMENT_CONFIG.brackets && TOURNAMENT_CONFIG.brackets[state.activeBracketId])
    || (typeof TOURNAMENT_BRACKETS !== 'undefined' && TOURNAMENT_BRACKETS[state.activeBracketId]);

  if (!bracket) {
    container.innerHTML = `<div class="p-8 text-center text-stone-500">Tournament table data not found.</div>`;
    return;
  }

  const groupsList = bracket.groups || [];
  const po = bracket.playoffs || {};
  const teamsList = bracket.teams || [];
  const activeTab = state.bracketActiveTab || 'groups';

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
          <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold">
            QF & SF: BO3 · Final: BO5
          </span>
        </div>
        <h2 class="text-lg sm:text-xl font-display font-extrabold text-stone-900 tracking-tight leading-snug">
          ${bracket.title}
        </h2>
        <div class="text-xs text-stone-500 font-medium mt-0.5">
          ${bracket.day} • ${bracket.time} • ${bracket.courts} (11:00 – 16:00 · 300 Min)
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
          onclick="setBracketTab('groups')" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'groups' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          Stage 1: Americano Groups (A–H)
        </button>
        <button 
          onclick="setBracketTab('playoffs')" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'playoffs' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          Championship Playoffs (BO3 / BO5) 🥇
        </button>
        <button 
          onclick="setBracketTab('consolation')" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'consolation' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          5th–8th Consolation (BO3)
        </button>
        <button 
          onclick="setBracketTab('rules')" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'rules' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-800'
          }">
          Balanced Teams & Schedule
        </button>
      </div>

      ${activeTab === 'groups' ? `
        <!-- Group Quick Filter -->
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
    </div>

    <!-- Body Content Area (Scrollable) -->
    <div class="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 bg-surface-1">
  `;

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 1: GROUP STAGE (Groups A–H)
  // ══════════════════════════════════════════════════════════════════════════
  if (activeTab === 'groups') {
    const visibleGroups = state.bracketGroupFilter === 'all'
      ? groupsList
      : groupsList.filter(g => g.id === state.bracketGroupFilter);

    html += `
      <!-- Balanced Duo Banner -->
      <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200/90 rounded-2xl p-4 sm:p-5 text-xs text-blue-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <i data-lucide="users" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="font-bold text-sm text-blue-950">Stage 1: Americano Groups → Balanced Duo Team Formation</div>
            <p class="text-blue-800 text-xs mt-0.5 max-w-2xl leading-relaxed">
              32 individual players play 3 matches rotating partners ("each with each"). 
              The <strong>Top 2</strong> from each group advance and unite into <strong>8 balanced playoff teams</strong>: 
              <strong>Group Winner (#1)</strong> is paired with <strong>Sister Group Runner-up (#2)</strong> so every playoff team is equally balanced (one strong leader + one solid runner-up)!
            </p>
          </div>
        </div>
        <button 
          onclick="setBracketTab('rules')" 
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-blue-100 border border-blue-300 text-blue-900 font-bold text-xs shadow-2xs transition-all shrink-0 cursor-pointer">
          <i data-lucide="eye" class="w-3.5 h-3.5 text-blue-600"></i>
          <span>View 8 Teams</span>
        </button>
      </div>

      <!-- Groups Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
    `;

    visibleGroups.forEach(group => {
      html += `
        <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card overflow-hidden flex flex-col">
          <!-- Group Header -->
          <div class="px-4 py-3 bg-stone-50 border-b border-stone-200/70 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span class="font-bold text-sm text-stone-900 font-display">${group.name}</span>
              <span class="text-[11px] text-stone-400 font-mono">(${group.court})</span>
            </div>
            <span class="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
              Top 2 Advance to Duo Playoffs
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
                  <th class="py-2 px-2.5 text-right">Playoff Duo Destination</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-100">
                ${group.standings.map(row => `
                  <tr class="${row.qualified ? 'bg-amber-50/40 font-medium' : 'text-stone-600'} hover:bg-stone-50 transition-colors">
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
                             <i data-lucide="check" class="w-2.5 h-2.5 text-amber-600"></i> ${row.advanceTo}
                           </span>`
                        : `<span class="text-[10px] text-stone-400 italic">Consolation</span>`
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
  // TAB 2: CHAMPIONSHIP PLAYOFFS (BO3 / BO5)
  // ══════════════════════════════════════════════════════════════════════════
  else if (activeTab === 'playoffs') {
    const qf = po.quarterfinals || [];
    const sf = po.semifinals || [];
    const finals = po.finals || [];
    const goldFinal = finals.find(f => f.id === 'F-GOLD') || finals[0];
    const bronzeFinal = finals.find(f => f.id === 'F-BRONZE') || finals[1];

    html += `
      <!-- Info Header -->
      <div class="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-400/20"></span>
            <h3 class="font-display font-extrabold text-base sm:text-lg text-stone-900">
              Championship Knockout Bracket · Best of 3 & Best of 5
            </h3>
          </div>
          <p class="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Quarterfinals and Semifinals are played as <strong>Best of 3 (BO3)</strong> sets to 11 (win by 2). 
            The Grand Final on Court 1 is a <strong>Best of 5 (BO5)</strong> championship battle!
          </p>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs">
            🥇 Grand Final: BO5
          </span>
          <span class="px-3 py-1 rounded-lg bg-blue-100 text-blue-900 border border-blue-200 font-bold text-xs">
            QF & SF: BO3
          </span>
        </div>
      </div>

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
              <span>13:00 – 13:50</span>
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
                  <div class="p-2.5 rounded-lg border ${m.winner === 1 ? 'bg-amber-50 border-amber-300 text-stone-950 font-bold shadow-2xs' : 'bg-white border-stone-200/70 text-stone-600'} flex items-center justify-between gap-2">
                    <div class="min-w-0">
                      <div class="truncate">${m.team1.duo}</div>
                      <div class="text-[10px] text-stone-400 font-mono font-normal">${m.team1.name} (${m.team1.seed})</div>
                    </div>
                    ${m.winner === 1 ? '<span class="px-1.5 py-0.5 rounded bg-amber-200/70 text-amber-900 text-[10px] font-bold">WIN</span>' : ''}
                  </div>

                  <!-- Team 2 -->
                  <div class="p-2.5 rounded-lg border ${m.winner === 2 ? 'bg-amber-50 border-amber-300 text-stone-950 font-bold shadow-2xs' : 'bg-white border-stone-200/70 text-stone-600'} flex items-center justify-between gap-2">
                    <div class="min-w-0">
                      <div class="truncate">${m.team2.duo}</div>
                      <div class="text-[10px] text-stone-400 font-mono font-normal">${m.team2.name} (${m.team2.seed})</div>
                    </div>
                    ${m.winner === 2 ? '<span class="px-1.5 py-0.5 rounded bg-amber-200/70 text-amber-900 text-[10px] font-bold">WIN</span>' : ''}
                  </div>
                </div>

                <div class="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                  <span class="text-[11px] text-stone-500 font-mono">Sets: ${m.games.join(', ')}</span>
                  <span class="font-mono font-black text-stone-900 text-sm px-2 py-0.5 rounded bg-stone-100 border border-stone-200">${m.score}</span>
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
              <span>13:50 – 14:40</span>
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
                  <div class="p-2.5 rounded-lg border ${m.winner === 1 ? 'bg-amber-50 border-amber-300 text-stone-950 font-bold shadow-2xs' : 'bg-white border-stone-200/70 text-stone-600'} flex items-center justify-between gap-2">
                    <div class="min-w-0">
                      <div class="truncate">${m.team1.duo}</div>
                      <div class="text-[10px] text-stone-400 font-mono font-normal">${m.team1.name} (${m.team1.seed})</div>
                    </div>
                    ${m.winner === 1 ? '<span class="px-1.5 py-0.5 rounded bg-amber-200/70 text-amber-900 text-[10px] font-bold">To Grand Final 🥇</span>' : ''}
                  </div>

                  <!-- Team 2 -->
                  <div class="p-2.5 rounded-lg border ${m.winner === 2 ? 'bg-amber-50 border-amber-300 text-stone-950 font-bold shadow-2xs' : 'bg-white border-stone-200/70 text-stone-600'} flex items-center justify-between gap-2">
                    <div class="min-w-0">
                      <div class="truncate">${m.team2.duo}</div>
                      <div class="text-[10px] text-stone-400 font-mono font-normal">${m.team2.name} (${m.team2.seed})</div>
                    </div>
                    ${m.winner === 2 ? '<span class="px-1.5 py-0.5 rounded bg-amber-200/70 text-amber-900 text-[10px] font-bold">To Grand Final 🥇</span>' : ''}
                  </div>
                </div>

                <div class="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                  <span class="text-[11px] text-stone-500 font-mono">Sets: ${m.games.join(', ')}</span>
                  <span class="font-mono font-black text-stone-900 text-sm px-2 py-0.5 rounded bg-stone-100 border border-stone-200">${m.score}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Medal Finals: Grand Final (BO5) + Bronze Match (BO3) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <!-- 🥇 Grand Championship Final (Court 1 · BO5) -->
          <div class="bg-gradient-to-b from-amber-50/50 to-white rounded-2xl border-2 border-amber-300 shadow-md p-5 flex flex-col justify-between gap-4">
            <div>
              <div class="flex items-center justify-between border-b border-amber-200/80 pb-3 mb-3">
                <div class="flex items-center gap-2">
                  <i data-lucide="crown" class="w-5 h-5 text-amber-500"></i>
                  <h4 class="font-display font-black text-base sm:text-lg text-stone-950">${goldFinal.title}</h4>
                </div>
                <span class="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black">
                  ${goldFinal.format}
                </span>
              </div>
              <div class="text-xs text-stone-500 font-medium mb-3">
                ${goldFinal.court} • ${goldFinal.time} • First to 3 sets to 11
              </div>

              <div class="space-y-2 text-xs sm:text-sm">
                <!-- Winner (1st) -->
                <div class="p-3 rounded-xl bg-amber-100/70 border border-amber-300 text-stone-950 font-bold flex items-center justify-between shadow-2xs">
                  <div>
                    <div class="text-sm font-black">${goldFinal.team1.duo}</div>
                    <div class="text-[11px] text-amber-900 font-mono font-medium">${goldFinal.team1.name} (${goldFinal.team1.seed})</div>
                  </div>
                  <span class="px-2.5 py-1 rounded-lg bg-amber-400 text-stone-950 text-xs font-black shadow-2xs">
                    🥇 CHAMPIONS
                  </span>
                </div>

                <!-- Runner-up (2nd) -->
                <div class="p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 font-semibold flex items-center justify-between">
                  <div>
                    <div class="text-sm">${goldFinal.team2.duo}</div>
                    <div class="text-[11px] text-stone-400 font-mono font-normal">${goldFinal.team2.name} (${goldFinal.team2.seed})</div>
                  </div>
                  <span class="px-2.5 py-1 rounded-lg bg-stone-200 text-stone-800 text-xs font-bold">
                    🥈 Silver Medal
                  </span>
                </div>
              </div>
            </div>

            <div class="pt-3 border-t border-amber-200 flex items-center justify-between">
              <span class="text-xs text-stone-600 font-mono">Sets: ${goldFinal.games.join(', ')}</span>
              <span class="font-mono font-black text-stone-950 text-base px-3 py-1 rounded-lg bg-amber-200 border border-amber-300">
                ${goldFinal.score}
              </span>
            </div>
          </div>

          <!-- 🥉 Bronze Medal Match (Court 2 · BO3) -->
          <div class="bg-gradient-to-b from-orange-50/40 to-white rounded-2xl border border-orange-200 shadow-card p-5 flex flex-col justify-between gap-4">
            <div>
              <div class="flex items-center justify-between border-b border-orange-200/80 pb-3 mb-3">
                <div class="flex items-center gap-2">
                  <i data-lucide="medal" class="w-5 h-5 text-orange-500"></i>
                  <h4 class="font-display font-extrabold text-base sm:text-lg text-stone-900">${bronzeFinal.title}</h4>
                </div>
                <span class="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-900 border border-orange-300 text-xs font-bold">
                  ${bronzeFinal.format}
                </span>
              </div>
              <div class="text-xs text-stone-500 font-medium mb-3">
                ${bronzeFinal.court} • ${bronzeFinal.time} • First to 2 sets to 11
              </div>

              <div class="space-y-2 text-xs sm:text-sm">
                <!-- Winner (3rd) -->
                <div class="p-3 rounded-xl bg-orange-100/60 border border-orange-300 text-stone-950 font-bold flex items-center justify-between shadow-2xs">
                  <div>
                    <div class="text-sm font-black">${bronzeFinal.team1.duo}</div>
                    <div class="text-[11px] text-orange-950 font-mono font-medium">${bronzeFinal.team1.name} (${bronzeFinal.team1.seed})</div>
                  </div>
                  <span class="px-2.5 py-1 rounded-lg bg-orange-200 text-orange-950 text-xs font-black shadow-2xs">
                    🥉 BRONZE
                  </span>
                </div>

                <!-- 4th Place -->
                <div class="p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 font-semibold flex items-center justify-between">
                  <div>
                    <div class="text-sm">${bronzeFinal.team2.duo}</div>
                    <div class="text-[11px] text-stone-400 font-mono font-normal">${bronzeFinal.team2.name} (${bronzeFinal.team2.seed})</div>
                  </div>
                  <span class="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 text-xs font-medium">
                    4th Place
                  </span>
                </div>
              </div>
            </div>

            <div class="pt-3 border-t border-orange-200 flex items-center justify-between">
              <span class="text-xs text-stone-600 font-mono">Sets: ${bronzeFinal.games.join(', ')}</span>
              <span class="font-mono font-black text-stone-950 text-base px-3 py-1 rounded-lg bg-orange-100 border border-orange-200">
                ${bronzeFinal.score}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 3: CONSOLATION BRACKET (5th–8th Place · BO3)
  // ══════════════════════════════════════════════════════════════════════════
  else if (activeTab === 'consolation') {
    const csf = po.consolationSemifinals || [];
    const finals = po.finals || [];
    const f5th = finals.find(f => f.id === 'F-5TH');
    const f7th = finals.find(f => f.id === 'F-7TH');
    const podium = po.podium || [];

    html += `
      <!-- Banner -->
      <div class="bg-blue-50/80 border border-blue-200/90 rounded-2xl p-4 sm:p-5 text-xs text-blue-950 flex items-start gap-3 shadow-2xs">
        <i data-lucide="shield" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"></i>
        <div class="leading-relaxed">
          <span class="font-bold text-sm">5th–8th Place Consolation Bracket (Courts 3 & 4 · BO3):</span><br/>
          Teams that did not advance through Quarterfinals continue playing on Courts 3 & 4 in Best-of-3 series! 
          Every team plays 3 full playoff series throughout the afternoon, ensuring zero idle court time and full tournament experience for all participants.
        </div>
      </div>

      <!-- Consolation Semifinals -->
      <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card p-4 sm:p-5">
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <h4 class="font-display font-bold text-sm sm:text-base text-stone-900">
              5th–8th Place Semifinals · Best of 3 (BO3)
            </h4>
          </div>
          <div class="text-xs font-mono font-semibold text-stone-500">13:50 – 14:40 • Courts 3 & 4</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${csf.map(m => `
            <div class="rounded-xl border border-stone-200 bg-stone-50/40 p-3.5 flex flex-col justify-between gap-3 shadow-2xs">
              <div class="flex items-center justify-between text-[11px]">
                <span class="font-bold text-stone-800">${m.name}</span>
                <span class="font-mono text-stone-500 font-semibold">${m.court} • ${m.format}</span>
              </div>

              <div class="space-y-1.5 text-xs">
                <!-- Team 1 -->
                <div class="p-2.5 rounded-lg border ${m.winner === 1 ? 'bg-blue-50 border-blue-300 text-stone-950 font-bold shadow-2xs' : 'bg-white border-stone-200/70 text-stone-600'} flex items-center justify-between gap-2">
                  <div class="min-w-0">
                    <div class="truncate">${m.team1.duo}</div>
                    <div class="text-[10px] text-stone-400 font-mono font-normal">${m.team1.name} (${m.team1.seed})</div>
                  </div>
                  ${m.winner === 1 ? '<span class="px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 text-[10px] font-bold">To 5th Final</span>' : ''}
                </div>

                <!-- Team 2 -->
                <div class="p-2.5 rounded-lg border ${m.winner === 2 ? 'bg-blue-50 border-blue-300 text-stone-950 font-bold shadow-2xs' : 'bg-white border-stone-200/70 text-stone-600'} flex items-center justify-between gap-2">
                  <div class="min-w-0">
                    <div class="truncate">${m.team2.duo}</div>
                    <div class="text-[10px] text-stone-400 font-mono font-normal">${m.team2.name} (${m.team2.seed})</div>
                  </div>
                  ${m.winner === 2 ? '<span class="px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 text-[10px] font-bold">To 5th Final</span>' : ''}
                </div>
              </div>

              <div class="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                <span class="text-[11px] text-stone-500 font-mono">Sets: ${m.games.join(', ')}</span>
                <span class="font-mono font-black text-stone-900 text-sm px-2 py-0.5 rounded bg-stone-100 border border-stone-200">${m.score}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Placement Matches (5th & 7th) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        ${f5th ? `
          <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card p-4 sm:p-5 flex flex-col justify-between gap-3">
            <div class="flex items-center justify-between border-b border-stone-200 pb-2.5">
              <h4 class="font-display font-bold text-sm text-stone-900">${f5th.title}</h4>
              <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-xs font-bold">${f5th.court} • BO3</span>
            </div>
            <div class="space-y-2 text-xs">
              <div class="p-2.5 rounded-lg ${f5th.winner === 1 ? 'bg-blue-50 border border-blue-200 font-bold text-stone-950' : 'bg-stone-50 border border-stone-200 text-stone-600'} flex items-center justify-between">
                <div>${f5th.team1.duo} <span class="text-[10px] text-stone-400">(${f5th.team1.name})</span></div>
                <span class="font-mono font-bold">${f5th.winner === 1 ? '5th Place' : ''}</span>
              </div>
              <div class="p-2.5 rounded-lg ${f5th.winner === 2 ? 'bg-blue-50 border border-blue-200 font-bold text-stone-950' : 'bg-stone-50 border border-stone-200 text-stone-600'} flex items-center justify-between">
                <div>${f5th.team2.duo} <span class="text-[10px] text-stone-400">(${f5th.team2.name})</span></div>
                <span class="font-mono font-bold">${f5th.winner === 2 ? '5th Place' : ''}</span>
              </div>
            </div>
            <div class="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
              <span class="text-[11px] text-stone-500 font-mono">Sets: ${f5th.games.join(', ')}</span>
              <span class="font-mono font-bold text-stone-900">${f5th.score}</span>
            </div>
          </div>
        ` : ''}

        ${f7th ? `
          <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card p-4 sm:p-5 flex flex-col justify-between gap-3">
            <div class="flex items-center justify-between border-b border-stone-200 pb-2.5">
              <h4 class="font-display font-bold text-sm text-stone-900">${f7th.title}</h4>
              <span class="px-2 py-0.5 rounded bg-stone-100 text-stone-800 text-xs font-bold">${f7th.court} • BO3</span>
            </div>
            <div class="space-y-2 text-xs">
              <div class="p-2.5 rounded-lg ${f7th.winner === 1 ? 'bg-stone-100 border border-stone-300 font-bold text-stone-950' : 'bg-stone-50 border border-stone-200 text-stone-600'} flex items-center justify-between">
                <div>${f7th.team1.duo} <span class="text-[10px] text-stone-400">(${f7th.team1.name})</span></div>
                <span class="font-mono font-bold">${f7th.winner === 1 ? '7th Place' : ''}</span>
              </div>
              <div class="p-2.5 rounded-lg ${f7th.winner === 2 ? 'bg-stone-100 border border-stone-300 font-bold text-stone-950' : 'bg-stone-50 border border-stone-200 text-stone-600'} flex items-center justify-between">
                <div>${f7th.team2.duo} <span class="text-[10px] text-stone-400">(${f7th.team2.name})</span></div>
                <span class="font-mono font-bold">${f7th.winner === 2 ? '7th Place' : ''}</span>
              </div>
            </div>
            <div class="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
              <span class="text-[11px] text-stone-500 font-mono">Sets: ${f7th.games.join(', ')}</span>
              <span class="font-mono font-bold text-stone-900">${f7th.score}</span>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Master 1–8 Placement Standings Table -->
      <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card p-4 sm:p-5">
        <h4 class="font-display font-bold text-sm text-stone-900 mb-3 flex items-center gap-2">
          <i data-lucide="award" class="w-4 h-4 text-amber-500"></i>
          <span>Official Final Tournament Standings (1st – 8th Place)</span>
        </h4>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="border-b border-stone-200 text-[10px] font-bold uppercase tracking-wider text-stone-400 bg-stone-50/50">
                <th class="py-2.5 px-3 w-16 text-center">Place</th>
                <th class="py-2.5 px-3">Playoff Duo</th>
                <th class="py-2.5 px-3">Team</th>
                <th class="py-2.5 px-3">Seeding Origin (#1 + #2)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-100">
              ${podium.map(row => `
                <tr class="hover:bg-stone-50/80 transition-colors ${row.place <= 3 ? 'bg-amber-50/30 font-semibold' : ''}">
                  <td class="py-2.5 px-3 text-center font-bold">
                    <span class="${row.place === 1 ? 'text-amber-800 text-sm font-black' : (row.place <= 3 ? 'text-stone-900' : 'text-stone-500')}">${row.medal}</span>
                  </td>
                  <td class="py-2.5 px-3 font-extrabold text-stone-950">${row.players}</td>
                  <td class="py-2.5 px-3 font-mono text-stone-600">${row.team}</td>
                  <td class="py-2.5 px-3 text-stone-500 font-mono text-[11px]">${row.seeds}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 4: BALANCED TEAMS & SCHEDULE (Rules & Timeline)
  // ══════════════════════════════════════════════════════════════════════════
  else if (activeTab === 'rules') {
    const timeline = po.scheduleTimeline || [];

    html += `
      <!-- Philosophy Banner -->
      <div class="bg-stone-900 text-white rounded-2xl p-5 sm:p-6 shadow-md">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[11px] font-extrabold uppercase tracking-wide mb-2">
              <i data-lucide="zap" class="w-3 h-3"></i> Balanced Duo Formula (#1 + #2)
            </div>
            <h3 class="text-lg sm:text-xl font-display font-extrabold tracking-tight">
              Americano Groups → Balanced Team Playoffs
            </h3>
            <p class="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              Every playoff team is formed by combining the <strong>#1 Winner of one group</strong> with the <strong>#2 Runner-up of another group</strong>. 
              This guarantees that every duo has an equal blend of a top-seeded player and a solid finalist, creating the fairest and most exciting playoff matches possible!
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700 text-center shrink-0">
            <div class="text-xl font-black text-amber-400 font-mono">BO3 / BO5</div>
            <div class="text-[10px] text-stone-400 uppercase font-semibold mt-0.5">Playoff Series</div>
          </div>
        </div>
      </div>

      <!-- 8 Formed Teams Grid -->
      <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card p-4 sm:p-5">
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
          <div class="flex items-center gap-2">
            <i data-lucide="shield-check" class="w-4 h-4 text-blue-600"></i>
            <h4 class="font-display font-bold text-sm sm:text-base text-stone-900">
              The 8 Balanced Playoff Teams (#1 Leader + #2 Runner-up)
            </h4>
          </div>
          <span class="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
            8 Teams · 16 Advancing Players
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          ${teamsList.map(t => `
            <div class="p-3.5 rounded-xl bg-surface-1 border border-stone-200/80 shadow-2xs hover:border-blue-300 transition-colors flex flex-col justify-between gap-2">
              <div class="flex items-center justify-between">
                <span class="font-mono font-extrabold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">${t.name}</span>
                <span class="text-[10px] text-stone-400 font-mono">Balanced</span>
              </div>
              <div>
                <div class="font-bold text-stone-950 text-xs">${t.duo}</div>
                <div class="text-[10px] text-stone-500 font-mono mt-1 space-y-0.5">
                  <div class="text-amber-800 font-medium">★ ${t.p1} (${t.p1Origin})</div>
                  <div class="text-blue-800 font-medium">✦ ${t.p2} (${t.p2Origin})</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 4-Stage Master Schedule Timeline -->
      <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card p-4 sm:p-5">
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
          <div class="flex items-center gap-2">
            <i data-lucide="clock" class="w-4 h-4 text-blue-600"></i>
            <h4 class="font-display font-bold text-sm sm:text-base text-stone-900">
              Tournament Time Schedule (11:00 – 16:00 · Courts 1–4)
            </h4>
          </div>
          <span class="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
            5 Hours · 100% Court Use
          </span>
        </div>

        <div class="space-y-3 text-xs">
          ${timeline.map((item, idx) => `
            <div class="p-3.5 rounded-xl bg-stone-50/60 border border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="flex items-start sm:items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-stone-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  0${idx + 1}
                </div>
                <div>
                  <div class="font-bold text-stone-900 text-sm">${item.title}</div>
                  <div class="text-stone-600 text-xs mt-0.5">${item.desc}</div>
                </div>
              </div>
              <div class="flex sm:flex-col items-end gap-1 shrink-0 self-start sm:self-auto">
                <span class="px-2.5 py-1 rounded-md bg-white border border-stone-200 font-mono font-bold text-xs text-stone-900 shadow-2xs">
                  ${item.time}
                </span>
                <span class="text-[10px] text-stone-500 font-mono font-medium">${item.courts}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Rules Cards -->
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
    `;
  }

  html += `
    </div>
  `;

  container.innerHTML = html;
}

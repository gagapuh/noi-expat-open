/**
 * ==============================================================================
 * NOI EXPAT OPEN — SCHEDULE TIMELINE ENGINE
 * Premium UI · Californian Design System
 * ==============================================================================
 */

// ─── State ───
const state = {
  currentDayId: 'day1',
  selectedMobileCourt: 'all'
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

  // Update day tab styles
  document.querySelectorAll('.day-tab-btn').forEach(btn => {
    const dayId = btn.getAttribute('data-day');
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

          <!-- Content: Logo + Title (vertically centered) -->
          <div class="my-auto flex flex-col items-center text-center gap-2.5 py-2">
            ${ev.logo ? `
              <div class="p-1.5 rounded-xl bg-white border border-stone-200 shadow-sm flex items-center justify-center ${isPlanned ? 'opacity-60' : ''}">
                <img src="${ev.logo}" alt="" class="h-10 sm:h-12 w-auto max-w-full object-contain rounded-lg" onerror="this.parentElement.style.display='none'" />
              </div>
            ` : ''}
            <div class="text-[13px] sm:text-sm font-extrabold ${isPlanned ? 'text-stone-500 italic' : 'text-stone-900'} leading-snug">
              ${ev.title}
            </div>
          </div>

          <!-- Footer: Link -->
          <div class="pt-2.5 border-t ${isPlanned ? 'border-stone-200/40' : 'border-stone-200'} flex items-center justify-end">
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
}

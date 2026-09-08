# NOI EXPAT OPEN — Pickleball Tournament Schedule 🎾

Interactive 30-minute grid court schedule for a 2-day, 4-court pickleball tournament.
Pure frontend application (HTML5 / Tailwind CSS / Vanilla JS) requiring zero build steps and no backend. Ready for GitHub Pages.

## 🚀 Quick Start (Localhost)

The server runs on port: **`48291`**.

### Launch with Python:
```bash
python3 serve.py
```
or on Windows:
```powershell
python serve.py
```
Then open in your browser: **[http://localhost:48291](http://localhost:48291)**

---

## 📝 How to Edit Schedule, Matches & Courts

All schedule data is stored in **`data.js`**.

Example entry:
```javascript
{
  id: "d1-c1-03",                                            // Unique ID
  courtId: "c1",                                            // c1, c2, c3, or c4
  start: "09:30",                                           // Start time (HH:MM)
  end: "11:00",                                             // End time (HH:MM)
  title: "Men's Doubles (MD) — Group Stage",                // Activity / Match title
  host: "Picklehead",                                       // Host / Organizer name
  logo: "picklehead.webp",                                  // Logo image path or placeholder.svg
  reclubUrl: "",                                            // Optional Reclub event link
  category: "tournament",                                   // tournament, round_robin, social, free, finals, clinic, event, break
  status: "occupied"                                        // "occupied" (confirmed) or "planned" (dashed)
}
```

### Available Categories (`category`):
- `tournament` — Tournament Matches (Tracked in Reclub)
- `free` — Free Court (Available for Open Practice / Free Play) 🟢
- `finals` — Finals & Medals 🏆
- `clinic` — Clinic / Workshop / Exhibition
- `event` — Ceremony / Briefing
- `break` — Lunch / Maintenance break

---

## 🏆 Tournament Architecture: Picklehead Individual Doubles (32 Players)

**Day 2 (Sunday, Oct 4) • 11:00 – 17:00 • Courts 1, 2, 3, 4 (Host: Ho)**

### 1. Format Overview
- **32 Individual Players** start in 8 groups of 4 players (**Group A** to **Group H**).
- **Stage 1 (11:00 – 14:00) — Double Americano Groups (6 Matches per Player)**:
  - In each 4-player group, every player plays 6 matches rotating partners ("each with each" in 2 full rounds).
  - Every participant is guaranteed at least 6 matches!
  - Matches are played to 11 points. Individual points and score differentials are accumulated across all 6 matches.
  - Top 2 players from each group advance to the playoffs (16 players total).
- **Merit-Based Seed Pairing (Option 3: 1st with 8th)**:
  - All 8 group winners are ranked #1 to #8 by accumulated points and point differential (W1 to W8).
  - All 8 runners-up are ranked #1 to #8 by points and differential (R1 to R8).
  - Teams are paired by inverting ranks: **$W_k + R_{9-k}$**
    - Team 1: Winner #1 + Runner-up #8
    - Team 2: Winner #2 + Runner-up #7
    - Team 3: Winner #3 + Runner-up #6
    - Team 4: Winner #4 + Runner-up #5
    - Team 5: Winner #5 + Runner-up #4
    - Team 6: Winner #6 + Runner-up #3
    - Team 7: Winner #7 + Runner-up #2
    - Team 8: Winner #8 + Runner-up #1
  - This guarantees perfect parity: every playoff duo has one top group leader and one solid finalist!
- **Playoffs (14:00 – 17:00) — Pure Knockout (BO3 / BO5)**:
  - **Quarterfinals (14:00 – 15:00)**: 8 teams · 4 matches across Courts 1–4 · **Best of 3 (BO3)** to 11 (win by 2). Courts 3 & 4 finish after QF.
  - **Semifinals (15:00 – 16:00)**: 4 teams · 2 matches on Courts 1 & 2 · **Best of 3 (BO3)** to 11. Court 2 finishes after SF.
  - **Grand Championship Final (16:00 – 17:00)**: Court 1 · **Best of 5 (BO5)** to 11 · First to 3 sets wins the trophy!
  - *No Bronze match and no consolation bracket* — pure high-stakes championship drama!

### 2. Day 2 Court Allocation & Staggered Schedule
- **Court 1**: 11:00 – 17:00 (Picklehead: Groups A & E, QF1, SF1, Grand Final) → 19:00 – 22:00 (Kitchen Party)
- **Court 2**: 11:00 – 16:00 (Picklehead: Groups B & F, QF2, SF2) → 19:00 – 22:00 (Kitchen Party)
- **Court 3**: 11:00 – 15:00 (Picklehead: Groups C & G, QF3) → 16:00 – 19:00 (DUPR 3.5–4.0) → 19:00 – 22:00 (Kitchen Party)
- **Court 4**: 11:00 – 15:00 (Picklehead: Groups D & H, QF4) → 16:00 – 19:00 (DUPR 3.5–4.0) → 19:00 – 22:00 (Kitchen Party)

---

## 🌐 Deploy to GitHub Pages

1. Create a repository on GitHub (e.g. `noi-expat-open`).
2. Push your project files:
   ```bash
   git init
   git add .
   git commit -m "NOI EXPAT OPEN Schedule"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/noi-expat-open.git
   git push -u origin main
   ```
3. In GitHub repo settings: **Settings** → **Pages** → select branch `main` and folder `/(root)` → click **Save**.
4. Your schedule will be live at `https://YOUR_USERNAME.github.io/noi-expat-open/`!

---

## 🤖 Telegram Bot & Live Backend (`ssh usavpn`)

Для круглосуточной работы бота и мгновенной синхронизации турнирной таблицы бэкенд развернут на сервере **`usavpn`** (хост настроен в `~/.ssh/config`). Бот работает непрерывно 24/7 в качестве службы `systemd` (`noi-bot.service`).

### 📌 Параметры подключения и размещение
- **SSH хост:** `usavpn` (или `ssh root@5.78.204.27`)
- **Папка с кодом бота:** `/opt/noi-expat-bot/`
- **Имя службы systemd:** `noi-bot.service`
- **Бот в Telegram:** [@noi_expat_open_bot](https://t.me/noi_expat_open_bot)

---

### 🛠️ Инструкция по работе с ботом и обновлениям

Вы (и любой ИИ-ассистент) можете в любой момент подключаться к серверу `ssh usavpn`, проверять состояние, читать логи и обновлять функционал:

#### 1. Проверить статус службы:
```bash
ssh usavpn "systemctl status noi-bot --no-pager"
```

#### 2. Просмотр логов в реальном времени:
```bash
ssh usavpn "journalctl -u noi-bot -f"
```
*(просмотреть последние 50 строк: `ssh usavpn "journalctl -u noi-bot -n 50 --no-pager"`)*

#### 3. Перезапустить бота:
```bash
ssh usavpn "systemctl restart noi-bot"
```

#### 4. Остановить / Запустить:
```bash
ssh usavpn "systemctl stop noi-bot"
ssh usavpn "systemctl start noi-bot"
```

#### 5. Как обновлять код бота:
**Способ А (с локальной машины в одну команду через rsync):**
```bash
rsync -avz --exclude='venv/' --exclude='__pycache__/' bot/ usavpn:/opt/noi-expat-bot/ && ssh usavpn "systemctl restart noi-bot"
```

**Способ Б (напрямую на сервере):**
```bash
ssh usavpn
cd /opt/noi-expat-bot
# вносим правки
systemctl restart noi-bot
```

#### 6. Мульти-турнирность (переключение и создание турниров):
Бот поддерживает работу с несколькими турнирами одновременно:
- Команда `/tournaments` или кнопка **«🏆 Турниры»** в главном меню — открывает список всех турниров из Supabase и позволяет в 1 клик выбрать активный.
- Команда `/set_tournament <ID>` — быстрое переключение на нужный ID.
- Команда `/new_tournament` — пошаговый мастер создания нового турнира (автоматически создаёт 32 слота игроков и сетку плей-офф в базе).
- Выбранный активный турнир сохраняется индивидуально для каждого администратора в `active_tournaments.json`.

#### 7. Конфигурация (.env на сервере):
Файл с переменными окружения находится на сервере по пути `/opt/noi-expat-bot/.env`.

Служба `systemd` настроена с флагом `Restart=always` и `RestartSec=5s`, поэтому бот автоматически перезапускается при любых сбоях и загружается при старте системы.



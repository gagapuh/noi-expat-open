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

**Day 2 (Sunday, Oct 4) • 11:00 – 16:00 • Courts 1, 2, 3, 4 (Host: Ho)**

### 1. Format Overview
- **32 Individual Players** start in 8 groups of 4 players (**Group A** to **Group H**).
- **Stage 1 (11:00 – 13:00) — Americano Groups**:
  - In each 4-player group, every player plays 3 matches rotating partners ("each with each").
  - Matches are played to 11 points. Individual points are accumulated.
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
- **Playoffs (13:00 – 16:00) — Pure Knockout (BO3 / BO5)**:
  - **Quarterfinals (13:00 – 14:00)**: 8 teams · 4 matches across Courts 1–4 · **Best of 3 (BO3)** to 11 (win by 2).
  - **Semifinals (14:00 – 15:00)**: 4 teams · 2 matches on Courts 1 & 2 · **Best of 3 (BO3)** to 11.
  - **Grand Championship Final (15:00 – 16:00)**: Court 1 · **Best of 5 (BO5)** to 11 · First to 3 sets wins the trophy!
  - *No Bronze match and no consolation bracket* — pure high-stakes championship drama!

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


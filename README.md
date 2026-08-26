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
  category: "tournament",                                   // tournament, free, finals, clinic, event, break
  status: "occupied",                                       // "occupied" (in use) or "free" (free court)
  stage: "Group A",                                         // Stage
  note: "Matches tracked live in Reclub"                    // Notes / Reclub info
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

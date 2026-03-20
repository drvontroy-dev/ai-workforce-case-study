# AI Workforce Intelligence — Case Study & Lead Gen Funnel

Full-stack data analytics case study: interactive dashboard, executive slide deck, gated landing page with Netlify Forms, and a Medium-ready article — all built from live BLS and PwC workforce data. Explores the 56% AI wage premium and 5-year pay gap projection. Google DA framework.

## Live Site

🔗 **[View Live →](#)** *(update with your Netlify URL after deploy)*

## What This Is

A two-page lead generation funnel built on Netlify:

- **Landing Page** (`index.html`) — Email capture with Netlify Forms, stat proof bar, content preview, audience targeting, and Hybrid Worker course waitlist
- **Gated Report** (`case-study/index.html`) — Full case study with data tables, stat callouts, 6 sections following the Google Data Analytics lifecycle, and course CTA

## Key Findings

| Metric | Value | Source |
|--------|-------|--------|
| AI Wage Premium | 56% | PwC Global AI Jobs Barometer |
| AI-Skilled Employment Rate | ~97% | PwC, Ravio, WEF synthesis |
| Non-AI Employment Rate | ~89% | PwC, Ravio, WEF synthesis |
| Projected Pay Gap by 2030 | $155K+/year | Trend extrapolation |
| Top AI Role Salary | $212,928 | Dice, Second Talent |
| Healthcare Job Growth | +2M by 2034 | BLS Projections |

## Tech Stack

- **Frontend:** HTML, CSS, vanilla JavaScript
- **Forms:** Netlify Forms (zero backend)
- **Hosting:** Netlify via GitHub auto-deploy
- **Fonts:** Syne, DM Sans, JetBrains Mono (Google Fonts)
- **Data Sources:** BLS, PwC, WEF, Ravio, Dice, Rise, DOE

## Repo Structure

```
├── index.html              Landing page + email capture
├── case-study/
│   └── index.html          Gated report (redirected after form submit)
├── netlify.toml            Netlify configuration
└── README.md               This file
```

## Deploy

This repo is connected to Netlify for auto-deploy. Every push to `main` triggers a new build.

### Manual Setup
1. Fork or clone this repo
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click **"Add new site" → "Import an existing project"**
4. Connect your GitHub and select this repo
5. Deploy settings: publish directory is `.` (root), no build command needed
6. Click **Deploy** — done

Forms auto-activate. Submissions appear under **Site Dashboard → Forms**.

## Data Sources

- U.S. Bureau of Labor Statistics — Employment Situation (Feb 2026)
- PwC Global AI Jobs Barometer 2025 (~1B job ads analyzed)
- Ravio 2026 Compensation Trends Report
- World Economic Forum — Future of Jobs 2025
- Dice 2025 Tech Salary Report
- Rise AI Talent Salary Report 2026
- U.S. Department of Energy — USEER 2025

## Author

**Davon Ransom** · [S.T.A.R. Culture, LLC](https://github.com/starculture)  
Columbus, OH · Google Data Analytics Professional Certificate Candidate

---

*Projections marked with * are extrapolated from current trend data and should be treated as directional, not precise. This is not financial or career advice.*

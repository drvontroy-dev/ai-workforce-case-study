# AI Workforce Intelligence Dashboard — Case Study

**Author:** Davon Ransom · [S.T.A.R. Culture, LLC](https://github.com/starculture)
**Date:** March 2026
**Tools:** React, Recharts, JavaScript, Web Research, Data Synthesis
**Live Demo:** [View Interactive Dashboard →](#) *(Netlify link)*

---

## Executive Summary

This case study analyzes the diverging employment and compensation trajectories of AI-skilled versus non-AI workers in the U.S. labor market. Using live data from the Bureau of Labor Statistics, PwC's Global AI Jobs Barometer, the World Economic Forum, and multiple compensation reports, I built an interactive dashboard that visualizes unemployment trends, AI adoption rates, salary premiums, industry growth projections, and a 5-year pay gap forecast.

**Key Finding:** Workers with AI skills earn a **56% wage premium** over peers without them — a figure that doubled in a single year — and hold employment rates 8+ percentage points higher. By 2030, the projected annual pay gap between AI-skilled and non-AI workers could exceed **$155,000**.

---

## 1. ASK — Defining the Business Problem

### Stakeholder Questions
- What does the current U.S. labor market look like as of early 2026?
- How do employment rates differ between AI-educated and non-AI workers?
- What is the projected pay gap over the next 5 years?
- Which industries offer the most stable long-term job growth?
- Who is trending to earn the most in the workforce?

### Business Task
Build a comprehensive, interactive dashboard that synthesizes live labor market data to answer these questions for job seekers, hiring managers, career changers, and business strategists — with a specific focus on the AI skills divide.

---

## 2. PREPARE — Data Sources & Collection

### Primary Sources

| Source | Data Type | Recency |
|--------|-----------|---------|
| **U.S. Bureau of Labor Statistics** | Unemployment rate, nonfarm payrolls, employment projections (2024–2034) | Feb 2026 |
| **PwC Global AI Jobs Barometer 2025** | AI wage premium, productivity growth, job ad analysis (~1B job ads) | Jun 2025 |
| **Ravio 2026 Compensation Trends** | AI/ML hiring growth (88% YoY), entry-level decline (73.4%) | Jan 2026 |
| **World Economic Forum — Future of Jobs 2025** | Skills obsolescence (39% by 2030), employer AI plans | Jan 2025 |
| **Dice 2025 Tech Salary Report** | Role-level salary data, AI/ML premium (17.7–18%) | 2025 |
| **Rise AI Talent Salary Report 2026** | Median AI salary ($160K), 28% salary premium | Jan 2026 |
| **U.S. DOE — USEER 2025** | Clean energy job growth (3x faster than economy) | 2025 |

### Data Limitations
- Projections for 2027–2030 are extrapolated from current trend data and should be treated as directional, not precise.
- AI "skilled" vs "non-AI" categorization is based on job posting requirements and survey self-reporting, which may vary by source.
- Salary data represents medians and ranges; individual outcomes depend on geography, experience, and specialization.

---

## 3. PROCESS — Data Cleaning & Transformation

### Approach
Data was collected via structured web research across 10+ authoritative sources. I cross-referenced multiple reports to validate key claims (e.g., the 56% wage premium appears in both PwC and independent analyses of 15+ studies). I then normalized the data into structured arrays suitable for Recharts visualization.

### Transformations Applied
- **Unemployment trend:** Compiled 12 months of BLS seasonally-adjusted data (Mar '25 – Feb '26)
- **AI vs Non-AI employment/salary:** Synthesized from PwC, WEF, Ravio, and Rise data; historical values (2023–2026) are sourced, projections (2027–2030) are extrapolated using compound growth rates
- **Pay gap calculation:** Derived as `(AI_Salary - NonAI_Salary)` and `((AI_Salary - NonAI_Salary) / NonAI_Salary) × 100` for premium percentage
- **Industry growth:** Sourced from BLS 2024–2034 projections, DOE USEER, and WEF employer surveys
- **Top earner data:** Aggregated from Dice, Second Talent, Rise, and BLS occupational data

---

## 4. ANALYZE — Key Findings

### Finding 1: The Labor Market Is Under Pressure
The U.S. unemployment rate rose to **4.4% in February 2026**, with nonfarm payrolls dropping by 92,000 — the first net job loss in months. Long-term unemployment hit its highest level since December 2021.

### Finding 2: AI Skills Create a Two-Tier Workforce
- **AI-skilled workers:** ~97% employment rate, median salary $160,000
- **Non-AI workers:** ~89% employment rate, median salary ~$67,000
- The AI wage premium jumped from **25% to 56%** in a single year (PwC)
- AI skills now carry a higher salary premium than a Master's degree (23% vs 13% in UK data)

### Finding 3: The Pay Gap Is Accelerating
| Year | AI Salary | Non-AI Salary | Gap | Premium |
|------|-----------|---------------|-----|---------|
| 2024 | $112,000 | $64,000 | $48,000 | 75% |
| 2026 | $160,000 | $67,000 | $93,000 | 139% |
| 2030* | $225,000 | $70,000 | $155,000 | 221% |

*Projected based on current trend data*

### Finding 4: Healthcare, Cybersecurity, and AI/ML Lead Growth
- **Healthcare & Social Assistance:** +8.4% growth, +2M jobs by 2034 — largest single-sector growth
- **AI & Machine Learning:** +33% projected growth — highest percentage increase
- **Cybersecurity:** +28% growth with 90/100 stability rating
- **Clean Energy:** Growing 3x faster than the overall economy

### Finding 5: AI Roles Dominate the Top-Earner List
7 of the top 10 highest-paying roles require AI-specific skills, led by Senior ML Engineers ($212K), AI Architects ($196K), and NLP Specialists ($180K).

---

## 5. SHARE — Deliverables

### Interactive Dashboard (React)
- 6-tab navigation: Overview, AI vs Non-AI, Pay Gap Forecast, Industry Growth, Top Earners, 30-Sec Breakdown
- Charts: Area, Line, Bar, Pie (via Recharts)
- Animated narration module with auto-play and manual navigation
- Dark theme, responsive layout

### Executive Slide Deck (.pptx)
- 10-slide presentation optimized for stakeholder briefings
- Data visualizations embedded via PptxGenJS charts
- Speaker notes included

### Medium Article (.md)
- Narrative write-up for thought leadership and portfolio publishing
- Data-driven storytelling with clear takeaways

---

## 6. ACT — Recommendations

### For Job Seekers
1. **Prioritize AI literacy immediately** — even prompt engineering and AI-assisted workflows carry measurable salary premiums.
2. **Target healthcare, cybersecurity, and clean energy** for recession-resistant career paths.
3. **Document AI project outcomes** — practical experience carries 19–23% more value than certifications alone.

### For Employers & Business Leaders
1. **Invest in workforce AI upskilling** — 77% of employers already plan to, but the gap between plan and execution is wide.
2. **Budget for AI talent premiums** — median AI salaries are $160K and climbing; underpaying means losing talent.
3. **Watch the entry-level pipeline** — with entry-level hiring down 73%, succession planning needs urgent attention.

### For STAR Culture Clients
This data reinforces the value of AI-augmented marketing operations. Brands that integrate AI into their campaign workflows will attract higher-caliber talent and achieve operational leverage that manual-first competitors cannot match.

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 18, Recharts |
| Styling | Inline CSS, CSS-in-JS |
| Typography | Space Grotesk, JetBrains Mono, Inter |
| Data | BLS API, PwC, WEF, Ravio, Dice, Rise, DOE |
| Deployment | Netlify |
| Presentation | PptxGenJS |

---

## Repository Structure

```
ai-workforce-dashboard/
├── README.md                    # This case study
├── src/
│   └── ai-workforce-dashboard.jsx  # React dashboard component
├── netlify/
│   └── index.html               # Standalone deployment
├── docs/
│   ├── medium-article.md        # Blog write-up
│   └── executive-deck.pptx      # Slide presentation
└── data/
    └── sources.md               # Full source citations
```

---

## License

This project is open source for educational and portfolio purposes. Data sourced from publicly available reports; all sources cited above.

---

**Built by Davon Ransom** · S.T.A.R. Culture, LLC · Columbus, OH
*Google Data Analytics Professional Certificate Candidate*

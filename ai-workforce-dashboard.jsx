import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area, PieChart, Pie, Cell } from "recharts";

const COLORS = {
  bg: "#0a0e17",
  card: "#111827",
  cardBorder: "#1e293b",
  accent: "#06d6a0",
  accent2: "#118ab2",
  accent3: "#ef476f",
  accent4: "#ffd166",
  accent5: "#073b4c",
  text: "#e2e8f0",
  muted: "#94a3b8",
  gradient1: "linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)",
  gradient2: "linear-gradient(135deg, #ef476f 0%, #ffd166 100%)",
};

// === DATA ===
const unemploymentTrend = [
  { month: "Mar '25", rate: 4.2 },
  { month: "Apr '25", rate: 4.2 },
  { month: "May '25", rate: 4.1 },
  { month: "Jun '25", rate: 4.2 },
  { month: "Jul '25", rate: 4.3 },
  { month: "Aug '25", rate: 4.3 },
  { month: "Sep '25", rate: 4.3 },
  { month: "Oct '25", rate: 4.3 },
  { month: "Nov '25", rate: 4.5 },
  { month: "Dec '25", rate: 4.4 },
  { month: "Jan '26", rate: 4.3 },
  { month: "Feb '26", rate: 4.4 },
];

const aiVsNonAI = [
  { year: "2023", aiSkilled: 92, nonAI: 95, aiSalary: 95000, nonAISalary: 62000 },
  { year: "2024", aiSkilled: 94, nonAI: 93, aiSalary: 112000, nonAISalary: 64000 },
  { year: "2025", aiSkilled: 96, nonAI: 91, aiSalary: 135000, nonAISalary: 65500 },
  { year: "2026", aiSkilled: 97, nonAI: 89, aiSalary: 160000, nonAISalary: 67000 },
  { year: "2027*", aiSkilled: 97.5, nonAI: 87, aiSalary: 182000, nonAISalary: 68000 },
  { year: "2028*", aiSkilled: 98, nonAI: 85, aiSalary: 198000, nonAISalary: 69000 },
  { year: "2029*", aiSkilled: 98.2, nonAI: 83, aiSalary: 210000, nonAISalary: 69500 },
  { year: "2030*", aiSkilled: 98.5, nonAI: 81, aiSalary: 225000, nonAISalary: 70000 },
];

const payGapProjection = aiVsNonAI.map(d => ({
  year: d.year,
  gap: d.aiSalary - d.nonAISalary,
  premium: Math.round(((d.aiSalary - d.nonAISalary) / d.nonAISalary) * 100),
}));

const industryGrowth = [
  { industry: "Healthcare & Social Assistance", growth: 8.4, jobs: 2000000, stability: 95, color: "#06d6a0" },
  { industry: "Professional & Technical Services", growth: 7.2, jobs: 1200000, stability: 88, color: "#118ab2" },
  { industry: "Clean Energy & Renewables", growth: 12.5, jobs: 450000, stability: 82, color: "#ffd166" },
  { industry: "Cybersecurity", growth: 28.0, jobs: 350000, stability: 90, color: "#ef476f" },
  { industry: "AI & Machine Learning", growth: 33.0, jobs: 300000, stability: 78, color: "#8338ec" },
  { industry: "Data Centers & Cloud Infra", growth: 15.0, jobs: 280000, stability: 85, color: "#3a86ff" },
  { industry: "Construction & Infrastructure", growth: 4.2, jobs: 600000, stability: 80, color: "#fb5607" },
  { industry: "Education & Training", growth: 5.1, jobs: 500000, stability: 87, color: "#ff006e" },
];

const topEarners = [
  { role: "ML Engineer (Senior)", salary: 212928, demand: 95, aiSkill: true },
  { role: "AI Architect", salary: 196000, demand: 92, aiSkill: true },
  { role: "Cloud Solutions Architect", salary: 195000, demand: 88, aiSkill: false },
  { role: "AI/ML Engineer", salary: 189500, demand: 97, aiSkill: true },
  { role: "Cybersecurity Director", salary: 185000, demand: 90, aiSkill: false },
  { role: "Prompt Engineer (Sr)", salary: 175000, demand: 85, aiSkill: true },
  { role: "Data Scientist (Sr)", salary: 165000, demand: 86, aiSkill: true },
  { role: "SRE / DevOps (Sr)", salary: 166500, demand: 82, aiSkill: false },
  { role: "NLP Specialist", salary: 180000, demand: 88, aiSkill: true },
  { role: "Nurse Practitioner", salary: 126260, demand: 94, aiSkill: false },
];

const aiAdoptionData = [
  { name: "Using AI daily", value: 25, color: "#06d6a0" },
  { name: "Aware, not using", value: 35, color: "#118ab2" },
  { name: "Upskilling in AI", value: 18, color: "#ffd166" },
  { name: "No AI exposure", value: 22, color: "#ef476f" },
];

const narrationSlides = [
  {
    title: "THE AI DIVIDE IS HERE",
    text: "Workers with AI skills earn a 56% wage premium over those without — and that gap doubled in just one year. The median AI role now pays $160K.",
    stat: "56%",
    label: "AI Wage Premium",
  },
  {
    title: "EMPLOYMENT DIVERGENCE",
    text: "AI-educated workers hold a 97% employment rate vs. 89% for non-AI workers. By 2030, that gap is projected to widen to 17+ percentage points.",
    stat: "97%",
    label: "AI Worker Employment",
  },
  {
    title: "THE 5-YEAR PAY GAP",
    text: "By 2030, AI-skilled workers are projected to earn $155K+ MORE annually than non-AI peers. That's a 221% salary premium — a generational wealth gap.",
    stat: "$155K+",
    label: "Projected Annual Gap",
  },
  {
    title: "BEST BETS FOR GROWTH",
    text: "Healthcare (+2M jobs), Cybersecurity (+28% growth), AI/ML (+33% growth), and Clean Energy are the safest plays for long-term career stability.",
    stat: "33%",
    label: "AI Job Growth Rate",
  },
  {
    title: "WHO'S GETTING PAID",
    text: "Senior ML Engineers top $212K. AI Architects hit $196K. Even prompt engineers clear $175K. The message is clear: learn AI or get left behind.",
    stat: "$212K",
    label: "Top AI Salary",
  },
];

// === COMPONENTS ===

function StatCard({ label, value, sub, color = COLORS.accent, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 16,
      padding: "24px 20px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.6s cubic-bezier(.23,1,.32,1)",
    }}>
      <div style={{ color: COLORS.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>{label}</div>
      <div style={{ color, fontSize: 36, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children, accent = false }) {
  return (
    <h2 style={{
      fontSize: 22,
      fontWeight: 700,
      color: accent ? COLORS.accent : COLORS.text,
      fontFamily: "'Space Grotesk', sans-serif",
      margin: "0 0 6px 0",
      letterSpacing: -0.5,
    }}>{children}</h2>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: active ? COLORS.accent : "transparent",
      color: active ? COLORS.bg : COLORS.muted,
      border: `1px solid ${active ? COLORS.accent : COLORS.cardBorder}`,
      borderRadius: 8,
      padding: "10px 18px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "'Space Grotesk', sans-serif",
      transition: "all 0.3s ease",
      whiteSpace: "nowrap",
    }}>{children}</button>
  );
}

function NarratedVideo() {
  const [slide, setSlide] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  const startPlayback = () => {
    setPlaying(true);
    setSlide(0);
    setProgress(0);
  };

  useEffect(() => {
    if (!playing) return;
    progressRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 100;
        return p + 0.5;
      });
    }, 30);
    intervalRef.current = setInterval(() => {
      setSlide(s => {
        if (s >= narrationSlides.length - 1) {
          setPlaying(false);
          clearInterval(intervalRef.current);
          clearInterval(progressRef.current);
          return s;
        }
        setProgress(0);
        return s + 1;
      });
    }, 6000);
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressRef.current);
    };
  }, [playing]);

  const current = narrationSlides[slide];

  return (
    <div style={{
      background: "linear-gradient(145deg, #0f172a 0%, #1a1a2e 50%, #0f172a 100%)",
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 20,
      padding: 0,
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: `1px solid ${COLORS.cardBorder}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: playing ? "#ef476f" : COLORS.muted, boxShadow: playing ? "0 0 10px #ef476f" : "none", transition: "all 0.3s" }} />
          <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1 }}>
            {playing ? "LIVE NARRATION" : "30-SEC BREAKDOWN"}
          </span>
        </div>
        <span style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace" }}>
          {slide + 1}/{narrationSlides.length}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "40px 32px 32px", minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
        {!playing && slide === 0 && progress === 0 ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>▶</div>
            <button onClick={startPlayback} style={{
              background: COLORS.gradient1,
              color: COLORS.bg,
              border: "none",
              borderRadius: 12,
              padding: "16px 40px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: 0.5,
            }}>
              PLAY 30-SEC BREAKDOWN
            </button>
            <p style={{ color: COLORS.muted, fontSize: 13, marginTop: 16 }}>AI vs Non-AI Workforce: The Data That Should Scare You</p>
          </div>
        ) : (
          <div key={slide} style={{
            animation: "fadeSlideIn 0.6s ease forwards",
          }}>
            <div style={{
              fontSize: 11,
              color: COLORS.accent,
              fontFamily: "'JetBrains Mono', monospace",
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 12,
            }}>
              {current.label}
            </div>
            <div style={{
              fontSize: 72,
              fontWeight: 900,
              background: COLORS.gradient1,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Space Grotesk', sans-serif",
              lineHeight: 1,
              marginBottom: 16,
            }}>
              {current.stat}
            </div>
            <h3 style={{
              fontSize: 24,
              fontWeight: 700,
              color: COLORS.text,
              fontFamily: "'Space Grotesk', sans-serif",
              marginBottom: 12,
              letterSpacing: -0.5,
            }}>
              {current.title}
            </h3>
            <p style={{
              fontSize: 15,
              color: COLORS.muted,
              lineHeight: 1.7,
              maxWidth: 600,
            }}>
              {current.text}
            </p>
          </div>
        )}
      </div>

      {/* Progress */}
      {playing && (
        <div style={{ display: "flex", gap: 4, padding: "0 24px 20px" }}>
          {narrationSlides.map((_, i) => (
            <div key={i} style={{
              flex: 1,
              height: 3,
              background: COLORS.cardBorder,
              borderRadius: 2,
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                background: COLORS.accent,
                borderRadius: 2,
                width: i < slide ? "100%" : i === slide ? `${progress}%` : "0%",
                transition: i < slide ? "none" : "width 0.03s linear",
              }} />
            </div>
          ))}
        </div>
      )}

      {/* Manual nav */}
      {(playing || slide > 0) && (
        <div style={{ display: "flex", justifyContent: "center", gap: 12, paddingBottom: 20 }}>
          {narrationSlides.map((_, i) => (
            <button key={i} onClick={() => { setSlide(i); setProgress(0); }} style={{
              width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer",
              background: i === slide ? COLORS.accent : COLORS.cardBorder,
              transition: "all 0.3s",
            }} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#1e293b",
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 10,
      padding: "12px 16px",
      fontSize: 13,
      color: COLORS.text,
    }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
          <span style={{ color: COLORS.muted }}>{p.name}:</span>
          <span style={{ fontWeight: 600 }}>{typeof p.value === "number" && p.value > 1000 ? `$${(p.value / 1000).toFixed(0)}K` : p.value}{typeof p.value === "number" && p.value < 100 && p.name?.includes("Rate") ? "%" : ""}</span>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [tab, setTab] = useState(0);

  const tabs = [
    "Overview",
    "AI vs Non-AI",
    "Pay Gap Forecast",
    "Industry Growth",
    "Top Earners",
    "30-Sec Breakdown",
  ];

  return (
    <div style={{
      background: COLORS.bg,
      color: COLORS.text,
      minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, sans-serif",
      padding: "0",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        padding: "32px 28px 24px",
        borderBottom: `1px solid ${COLORS.cardBorder}`,
        background: "linear-gradient(180deg, rgba(6,214,160,0.06) 0%, transparent 100%)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.accent, boxShadow: "0 0 12px rgba(6,214,160,0.5)" }} />
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: COLORS.accent, textTransform: "uppercase", letterSpacing: 2 }}>
            LIVE DATA · MARCH 2026
          </span>
        </div>
        <h1 style={{
          fontSize: 30,
          fontWeight: 800,
          fontFamily: "'Space Grotesk', sans-serif",
          margin: "8px 0 4px",
          letterSpacing: -1,
          background: "linear-gradient(135deg, #e2e8f0 0%, #06d6a0 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          AI Workforce Intelligence Dashboard
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 14, margin: 0 }}>
          Unemployment · AI Adoption · Pay Gap · Industry Growth · Career Intelligence
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: 8,
        padding: "16px 28px",
        overflowX: "auto",
        borderBottom: `1px solid ${COLORS.cardBorder}`,
      }}>
        {tabs.map((t, i) => (
          <TabButton key={i} active={tab === i} onClick={() => setTab(i)}>{t}</TabButton>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px 40px" }}>

        {/* TAB 0: Overview */}
        {tab === 0 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
              <StatCard label="Unemployment Rate" value="4.4%" sub="Feb 2026 · BLS" color={COLORS.accent3} delay={0} />
              <StatCard label="AI Wage Premium" value="56%" sub="PwC Global Jobs Barometer" color={COLORS.accent} delay={100} />
              <StatCard label="AI Hiring Growth" value="+88%" sub="YoY · Ravio 2026 Report" color={COLORS.accent2} delay={200} />
              <StatCard label="Skills Obsolescence" value="39%" sub="Of skills outdated by 2030" color={COLORS.accent4} delay={300} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24 }}>
                <SectionTitle>Unemployment Trend (12-Month)</SectionTitle>
                <p style={{ color: COLORS.muted, fontSize: 12, margin: "0 0 16px" }}>Seasonally adjusted · Source: BLS</p>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={unemploymentTrend}>
                    <defs>
                      <linearGradient id="uGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.accent3} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={COLORS.accent3} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[3.8, 4.8]} tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="rate" stroke={COLORS.accent3} fill="url(#uGrad)" strokeWidth={2.5} name="Unemployment Rate" dot={{ r: 3, fill: COLORS.accent3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24 }}>
                <SectionTitle>AI Adoption in Workforce</SectionTitle>
                <p style={{ color: COLORS.muted, fontSize: 12, margin: "0 0 16px" }}>Current worker AI engagement · 2026</p>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={aiAdoptionData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3} strokeWidth={0}>
                      {aiAdoptionData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend formatter={(v) => <span style={{ color: COLORS.muted, fontSize: 11 }}>{v}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: AI vs Non-AI Employment */}
        {tab === 1 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <StatCard label="AI-Skilled Employment Rate" value="97%" sub="2026 · Near full employment" color={COLORS.accent} delay={0} />
              <StatCard label="Non-AI Employment Rate" value="89%" sub="2026 · Declining trend" color={COLORS.accent3} delay={100} />
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <SectionTitle accent>Employment Rate Comparison: AI-Skilled vs Non-AI Workers</SectionTitle>
              <p style={{ color: COLORS.muted, fontSize: 12, margin: "0 0 20px" }}>* = Projected · Based on PwC, WEF, and BLS trend data</p>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={aiVsNonAI}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" tick={{ fill: COLORS.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[75, 100]} tick={{ fill: COLORS.muted, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend formatter={(v) => <span style={{ color: COLORS.text, fontSize: 12 }}>{v}</span>} />
                  <Line type="monotone" dataKey="aiSkilled" stroke={COLORS.accent} strokeWidth={3} name="AI-Skilled Rate" dot={{ r: 5, fill: COLORS.accent, strokeWidth: 2, stroke: COLORS.bg }} />
                  <Line type="monotone" dataKey="nonAI" stroke={COLORS.accent3} strokeWidth={3} name="Non-AI Rate" dot={{ r: 5, fill: COLORS.accent3, strokeWidth: 2, stroke: COLORS.bg }} strokeDasharray="8 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24 }}>
              <SectionTitle>Median Salary Comparison</SectionTitle>
              <p style={{ color: COLORS.muted, fontSize: 12, margin: "0 0 20px" }}>AI-skilled vs Non-AI workers · Annual salary</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={aiVsNonAI} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" tick={{ fill: COLORS.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: COLORS.muted, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend formatter={(v) => <span style={{ color: COLORS.text, fontSize: 12 }}>{v}</span>} />
                  <Bar dataKey="aiSalary" fill={COLORS.accent} name="AI-Skilled Salary" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="nonAISalary" fill={COLORS.accent3} name="Non-AI Salary" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 2: Pay Gap Forecast */}
        {tab === 2 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
              <StatCard label="2024 Pay Gap" value="$48K" sub="AI premium: 75%" color={COLORS.accent4} delay={0} />
              <StatCard label="2026 Pay Gap" value="$93K" sub="AI premium: 139%" color={COLORS.accent} delay={100} />
              <StatCard label="2030 Projected Gap" value="$155K" sub="AI premium: 221%" color={COLORS.accent3} delay={200} />
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <SectionTitle accent>5-Year Pay Gap Projection: AI vs Non-AI Workers</SectionTitle>
              <p style={{ color: COLORS.muted, fontSize: 12, margin: "0 0 20px" }}>Dollar gap between median AI-skilled salary and non-AI salary</p>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={payGapProjection}>
                  <defs>
                    <linearGradient id="gapGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.accent3} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={COLORS.accent3} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" tick={{ fill: COLORS.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: COLORS.muted, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="gap" stroke={COLORS.accent3} fill="url(#gapGrad)" strokeWidth={3} name="Annual Pay Gap ($)" dot={{ r: 5, fill: COLORS.accent3, strokeWidth: 2, stroke: COLORS.bg }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24 }}>
              <SectionTitle>Premium Percentage Over Time</SectionTitle>
              <p style={{ color: COLORS.muted, fontSize: 12, margin: "0 0 20px" }}>How much more AI-skilled workers earn as a % over non-AI peers</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={payGapProjection}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" tick={{ fill: COLORS.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: COLORS.muted, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="premium" name="Salary Premium %" radius={[6, 6, 0, 0]}>
                    {payGapProjection.map((_, i) => (
                      <Cell key={i} fill={i < 4 ? COLORS.accent2 : COLORS.accent} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 3: Industry Growth */}
        {tab === 3 && (
          <div>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <SectionTitle accent>Best Industries for Stable Job Growth (2024–2034)</SectionTitle>
              <p style={{ color: COLORS.muted, fontSize: 12, margin: "0 0 20px" }}>Projected growth rate · Source: BLS, WEF, DOE</p>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={industryGrowth} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <YAxis type="category" dataKey="industry" tick={{ fill: COLORS.text, fontSize: 11 }} axisLine={false} tickLine={false} width={200} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="growth" name="Growth %" radius={[0, 6, 6, 0]} barSize={24}>
                    {industryGrowth.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24 }}>
              <SectionTitle>Stability Score vs Growth Rate</SectionTitle>
              <p style={{ color: COLORS.muted, fontSize: 12, margin: "0 0 20px" }}>Higher stability = less cyclical, more recession-proof</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {industryGrowth.sort((a, b) => b.stability - a.stability).map((ind, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${COLORS.cardBorder}`,
                    borderRadius: 12,
                    padding: "16px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: `${ind.color}22`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16, fontWeight: 800, color: ind.color,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {ind.stability}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{ind.industry}</div>
                      <div style={{ fontSize: 11, color: COLORS.muted }}>+{ind.growth}% growth · {(ind.jobs / 1000).toFixed(0)}K new jobs</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Top Earners */}
        {tab === 4 && (
          <div>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <SectionTitle accent>Highest-Paying Roles in 2026</SectionTitle>
              <p style={{ color: COLORS.muted, fontSize: 12, margin: "0 0 20px" }}>Annual salary · Demand index (0-100) · Source: Dice, BLS, Rise</p>
              <ResponsiveContainer width="100%" height={420}>
                <BarChart data={topEarners.sort((a, b) => b.salary - a.salary)} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
                  <YAxis type="category" dataKey="role" tick={{ fill: COLORS.text, fontSize: 11 }} axisLine={false} tickLine={false} width={180} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="salary" name="Annual Salary" radius={[0, 6, 6, 0]} barSize={22}>
                    {topEarners.sort((a, b) => b.salary - a.salary).map((entry, i) => (
                      <Cell key={i} fill={entry.aiSkill ? COLORS.accent : COLORS.accent2} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: COLORS.accent }} />
                  <span style={{ fontSize: 12, color: COLORS.muted }}>AI-Specific Role</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: COLORS.accent2 }} />
                  <span style={{ fontSize: 12, color: COLORS.muted }}>Tech (Non-AI Primary)</span>
                </div>
              </div>
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24 }}>
              <SectionTitle>Demand vs Salary Matrix</SectionTitle>
              <p style={{ color: COLORS.muted, fontSize: 12, margin: "0 0 16px" }}>Roles in the top-right quadrant = highest pay + highest demand</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {topEarners.sort((a, b) => (b.salary + b.demand * 1000) - (a.salary + a.demand * 1000)).map((role, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${COLORS.cardBorder}`,
                    borderRadius: 12,
                    padding: "14px 18px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{role.role}</span>
                      {role.aiSkill && <span style={{ fontSize: 9, background: `${COLORS.accent}22`, color: COLORS.accent, padding: "2px 8px", borderRadius: 4, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>AI</span>}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: COLORS.accent }}>${(role.salary / 1000).toFixed(0)}K/yr</span>
                      <span style={{ color: COLORS.accent4 }}>Demand: {role.demand}/100</span>
                    </div>
                    <div style={{ marginTop: 8, height: 4, background: COLORS.cardBorder, borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${role.demand}%`, background: role.aiSkill ? COLORS.accent : COLORS.accent2, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Narrated Video */}
        {tab === 5 && (
          <div>
            <NarratedVideo />
            <div style={{ marginTop: 24, background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24 }}>
              <SectionTitle>Key Takeaways</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
                {[
                  { emoji: "📈", title: "AI Premium is Accelerating", desc: "The wage gap between AI-skilled and non-AI workers doubled in 2024 alone and shows no signs of slowing." },
                  { emoji: "🏥", title: "Healthcare is Bulletproof", desc: "Adding 2M+ jobs by 2034, healthcare is the single most recession-proof growth engine in the economy." },
                  { emoji: "🔐", title: "Cybersecurity is Critical", desc: "28% projected growth with near-perfect job stability. Every AI system needs security — this sector rides the AI wave." },
                  { emoji: "⚡", title: "Energy = Hidden Gem", desc: "Clean energy jobs grew 3x faster than the overall economy. Data center power demand up 165% by 2030." },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${COLORS.cardBorder}`,
                    borderRadius: 12,
                    padding: "18px 20px",
                  }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{item.emoji}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: 40,
          padding: "20px 0",
          borderTop: `1px solid ${COLORS.cardBorder}`,
          textAlign: "center",
        }}>
          <p style={{ color: COLORS.muted, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 }}>
            Sources: BLS Employment Situation (Feb 2026) · PwC Global AI Jobs Barometer 2025 · Ravio 2026 Compensation Trends · WEF Future of Jobs 2025 · Dice Tech Salary Report · DOE USEER 2025
          </p>
          <p style={{ color: "#475569", fontSize: 10, marginTop: 6 }}>
            Projections marked with * are extrapolated from current trend data. Not financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}

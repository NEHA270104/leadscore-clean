// src/components/Home.jsx
import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Link } from "react-router-dom";
import "../styles.css";

// Dashboard summary (from screenshot)
const DASH_SUMMARY = {
  avg: 61,
  hotLeads: 4,
  recent: 6,
  updated: "Sep 21, 2025",
  retrain: "weekly",
};

// Small distribution used in the donut (High / Medium / Low)
const donutDistribution = [
  { name: "High", value: 4 },
  { name: "Medium", value: 4 },
  { name: "Low", value: 3 },
];
const DONUT_COLORS = ["#ec4899", "#8b5cf6", "#10b981"];

// Score distribution by numeric buckets
const bucketDistribution = [
  { range: "0–20", value: 1 },
  { range: "21–40", value: 2 },
  { range: "41–60", value: 3 },
  { range: "61–80", value: 3 },
  { range: "81–100", value: 2 },
];

// Top sources data
const topSources = [
  { name: "Website", value: 45 },
  { name: "Email", value: 30 },
  { name: "Referrals", value: 25 },
];
const TOP_COLORS = ["#ec4899", "#8b5cf6", "#10b981"];

export default function Home() {
  const totalBuckets = bucketDistribution.reduce((s, b) => s + b.value, 0);

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-left">
            <h1 className="hero-title">LeadScore Lite: Tiny AI, Big Impact</h1>
            <div className="hero-description-unique">
              <p>
                Prioritize incoming leads instantly with a lightweight,
                explainable scoring model. Submit a pitch, get a score, and
                focus your team on high-value opportunities.
              </p>
            </div>
          </div>
          <div className="hero-right" aria-hidden />
        </div>
      </section>

      {/* DASHBOARD PREVIEW GRID */}
      <section className="container dashboard-preview" style={{ marginTop: 28 }}>
        {/* Main dashboard snapshot (donut + stats) */}
        <div
          className="dashboard-card"
          role="button"
          onClick={() => (window.location.href = "/dashboard")}
        >
          <div className="card-top">
            <div className="card-icon">L</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800 }}>LeadScore Dashboard</div>
              <div className="small-muted">Demo • Quick insights</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 18,
              alignItems: "center",
              marginTop: 12,
            }}
          >
            {/* Donut */}
            <div style={{ position: "relative", width: 140, height: 140 }}>
              <PieChart width={140} height={140}>
                <Pie
                  data={donutDistribution}
                  dataKey="value"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={6}
                >
                  {donutDistribution.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={DONUT_COLORS[i % DONUT_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>

              {/* Center label */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 900 }}>
                    {DASH_SUMMARY.avg}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>avg</div>
                </div>
              </div>
            </div>

            {/* Mini stats */}
            <div style={{ display: "flex", gap: 12 }}>
              <div className="mini-stat-block">
                <div className="mini-value">{DASH_SUMMARY.avg}</div>
                <div className="mini-label">Avg score</div>
              </div>
              <div className="mini-stat-block">
                <div className="mini-value">{DASH_SUMMARY.hotLeads}</div>
                <div className="mini-label">Hot leads</div>
              </div>
              <div className="mini-stat-block">
                <div className="mini-value">{DASH_SUMMARY.recent}</div>
                <div className="mini-label">Recent</div>
              </div>
            </div>
          </div>

          <div className="donut-legend" style={{ marginTop: 12 }}>
            <span className="dot p3" /> High &nbsp;
            <span className="dot p2" /> Medium &nbsp;
            <span className="dot p1" /> Low
          </div>
        </div>

        {/* Score Distribution */}
        <div
          className="dashboard-card"
          role="button"
          onClick={() => (window.location.href = "/dashboard")}
        >
          <h3>Score Distribution</h3>
          <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
            {bucketDistribution.map((b) => {
              const percentage = Math.round((b.value / totalBuckets) * 100);
              return (
                <div
                  key={b.range}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <div style={{ width: 84 }}>
                    <strong>{b.range}</strong>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>
                      {b.value} leads
                    </div>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      background: "#f3f4f6",
                      height: 12,
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${percentage}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                        borderRadius: 8,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      width: 46,
                      textAlign: "right",
                      fontWeight: 700,
                    }}
                  >
                    {percentage}%
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{ marginTop: 14, color: "var(--muted)", fontSize: 13 }}
          >
            <em>Interpretation:</em> Most leads fall in mid-range scores
            (41–80). Use filters in the full dashboard to discover
            high-value leads.
          </div>
        </div>

        {/* Top Sources */}
        <div
          className="dashboard-card"
          role="button"
          onClick={() => (window.location.href = "/dashboard")}
        >
          <h3>Top Sources</h3>
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <div style={{ width: 140 }}>
              <PieChart width={140} height={140}>
                <Pie
                  data={topSources}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={30}
                  outerRadius={56}
                  paddingAngle={4}
                >
                  {topSources.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={TOP_COLORS[i % TOP_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>

            <div style={{ flex: 1 }}>
              {topSources.map((s, i) => (
                <div
                  key={s.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 6,
                      background: TOP_COLORS[i % TOP_COLORS.length],
                      boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>{s.name}</div>
                      <div style={{ fontWeight: 800 }}>{s.value}%</div>
                    </div>
                    <div
                      style={{
                        height: 8,
                        background: "#f3f4f6",
                        borderRadius: 6,
                        marginTop: 6,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${s.value}%`,
                          height: "100%",
                          background:
                            "linear-gradient(90deg,#ec4899,#8b5cf6)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{ marginTop: 12, color: "var(--muted)", fontSize: 13 }}
          >
            <em>Tip:</em> Click a source to filter leads by origin in the
            full dashboard.
          </div>
        </div>

        {/* Recent Submissions */}
        <div
          className="dashboard-card"
          role="button"
          onClick={() => (window.location.href = "/dashboard")}
        >
          <h3>Recent Submissions</h3>
          <p className="small-muted">
            Alice — Acme (72) • Bob — Beta (55) • Cara — CorpX (89)
          </p>
          <div
            style={{ marginTop: 8, color: "var(--muted)", fontSize: 13 }}
          >
            No leads yet? <Link to="/get-started">Get Started</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import LeadForm from "./components/LeadForm";
import LeadsTable from "./components/LeadsTable";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      {/* NAVBAR */}
      <header className="header">
        <div className="header-inner container">
          <Link to="/" className="logo" aria-label="LeadScore Lite home">
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(90deg,#ec4899,#8b5cf6)",
                color: "#fff",
                fontWeight: 800,
              }}
            >
              LS
            </div>
            <div style={{ marginLeft: 10, fontWeight: 800 }}>LeadScore</div>
          </Link>

          <nav className="nav-links">
            <Link to="/" className="nav-button">Home</Link>
            <Link to="/about" className="nav-button">About</Link>
            <Link to="/get-started" className="nav-button">Get Started</Link>
            <Link to="/dashboard" className="nav-button">Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* PAGES */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/about"
            element={About ? <About /> : <div style={{ padding: 32 }}>About (placeholder)</div>}
          />
          <Route
            path="/get-started"
            element={LeadForm ? <LeadForm /> : <div style={{ padding: 32 }}>Get Started (placeholder)</div>}
          />
          <Route
            path="/dashboard"
            element={LeadsTable ? <LeadsTable /> : <div style={{ padding: 32 }}>Dashboard (placeholder)</div>}
          />
        </Routes>
      </main>

      {/* GLOBAL FOOTER — single instance for all pages */}
      <Footer />
    </Router>
  );
}

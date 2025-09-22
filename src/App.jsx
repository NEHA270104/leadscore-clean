// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import LeadForm from "./components/LeadForm";
import LeadsTable from "./components/LeadsTable";
import SignUp from "./components/SignUp";
import "./styles.css";

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
            <Link to="/signup" className="nav-button">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* PAGES */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/get-started" element={<LeadForm />} />
          <Route path="/dashboard" element={<LeadsTable />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </Router>
  );
}

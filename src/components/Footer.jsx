import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        {/* Company Info */}
        <div className="footer-about">
          <h3>LeadScore Lite</h3>
          <p>
            LeadScore Lite helps teams quickly prioritize incoming leads with
            AI-powered scoring, an intuitive dashboard, and easy API integration.
            Lightweight, explainable, and designed for modern sales workflows.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-nav">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/get-started" className="footer-link">Get Started</Link>
          <Link to="/dashboard" className="footer-link">Dashboard</Link>
        </div>
      </div>

      {/* Bottom line */}
      <div className="container footer-bottom">
        © 2025 LeadScore Lite. All rights reserved.
      </div>
    </footer>
  );
}

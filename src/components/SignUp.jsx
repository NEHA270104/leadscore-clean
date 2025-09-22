// src/components/SignUp.jsx
import React, { useState, useEffect } from "react";
import "../styles.css";

export default function SignUp() {
  const [step, setStep] = useState("form");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [timer, setTimer] = useState(0);

  // Countdown for resend
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  // Send verification code
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.ok) {
        setMessage(`Code sent to ${email}. Check your inbox.`);
        setStep("verify");
        setTimer(30);
      } else {
        setError("❌ Failed to send email. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Server not reachable. Start backend first.");
    }
  };

  // Verify code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError(null);

    if (!/^\d{6}$/.test(code)) {
      setError("Enter a valid 6-digit code.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();

      if (data.ok) {
        setMessage("✅ Verified! Redirecting to dashboard...");
        // you can store token here: localStorage.setItem("token", data.token);
      } else {
        setError("❌ Invalid code. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Server not reachable. Start backend first.");
    }
  };

  return (
    <div className="container">
      <section className="form-card" style={{ maxWidth: 480, margin: "40px auto" }}>
        <h1 className="about-headline">Create Account</h1>

        {/* Step 1: Form */}
        {step === "form" && (
          <form onSubmit={handleSendCode}>
            <div style={{ display: "grid", gap: 12 }}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Email *</label>
                <input
                  type="email"
                  className="input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Password (optional)</label>
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <div className="field-error">{error}</div>}
            {message && <div style={{ color: "green", marginTop: 8 }}>{message}</div>}

            <button type="submit" className="btn-submit" style={{ marginTop: 20 }}>
              Send Verification Code
            </button>
          </form>
        )}

        {/* Step 2: Verify Code */}
        {step === "verify" && (
          <form onSubmit={handleVerifyCode}>
            <p>We sent a 6-digit code to <strong>{email}</strong></p>
            <input
              type="text"
              className="input"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              style={{ letterSpacing: "8px", fontSize: 20, textAlign: "center" }}
            />

            {error && <div className="field-error">{error}</div>}
            {message && <div style={{ color: "green", marginTop: 8 }}>{message}</div>}

            <button type="submit" className="btn-submit" style={{ marginTop: 20 }}>
              Verify Code
            </button>

            <button
              type="button"
              className="btn-ghost"
              style={{ marginTop: 12 }}
              disabled={timer > 0}
              onClick={handleSendCode}
            >
              {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

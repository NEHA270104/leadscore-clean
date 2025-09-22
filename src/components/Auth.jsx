// client/src/components/Auth.jsx
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Auth({ onToken }) {
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signIn"); // or 'register'
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (!user) { onToken(null); return; }
    // get ID token and pass to parent
    user.getIdToken().then((t) => onToken(t)).catch(() => onToken(null));
    // refresh token on change
  }, [user, onToken]);

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
      alert("Google sign in failed");
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (mode === "signIn") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Auth error");
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    onToken(null);
  };

  if (loading) return <div>Checking authentication...</div>;

  return (
    <div className="card-elevated" style={{ padding: 16 }}>
      {!user ? (
        <>
          <div style={{ marginBottom: 8 }}>
            <button className="btn-gradient" onClick={handleGoogle}>Sign in with Google</button>
          </div>
          <div style={{ margin: "10px 0", fontSize: 13, color: "var(--muted)" }}>or</div>

          <form onSubmit={handleEmailAuth} className="form-grid" style={{ gap: 8 }}>
            <div style={{ gridColumn: "span 2" }}>
              <label className="small-muted">Email</label>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <label className="small-muted">Password</label>
              <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </div>

            <div style={{ gridColumn: "span 2", display: "flex", gap: 8 }}>
              <button type="submit" className="btn-gradient">{mode === "signIn" ? "Sign in" : "Create account"}</button>
              <button type="button" className="btn-ghost" onClick={() => setMode(mode === "signIn" ? "register" : "signIn")}>
                {mode === "signIn" ? "Switch to Register" : "Switch to Sign in"}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 800 }}>{user.displayName || user.email}</div>
            <div className="small-muted">Signed in</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-ghost" onClick={handleSignOut}>Sign out</button>
          </div>
        </div>
      )}
      {error && <div style={{ color: "red", marginTop: 8 }}>{error.message}</div>}
    </div>
  );
}

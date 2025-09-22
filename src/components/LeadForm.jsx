import React, { useState } from "react";

/**
 * Usage:
 *  - Place <LeadForm /> somewhere in your app.
 *  - Ensure REACT_APP_API_URL is set (e.g. http://127.0.0.1:5000)
 *
 * Response expected from backend:
 *   { score: <number|null>, reasons: [<string>], ... }
 */

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

export default function LeadForm() {
  const [lead, setLead] = useState({ name: "", email: "", company: "", pitch: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { score, reasons }
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    setLead(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs = {};
    if (!lead.pitch || lead.pitch.trim().length < 10) errs.pitch = "Pitch must be at least 10 characters.";
    if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errs.email = "Invalid email.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const errs = validate();
    if (Object.keys(errs).length) {
      setTouched({ name: true, email: true, company: true, pitch: true });
      setError(Object.values(errs).join(" "));
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(`${API_URL}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Server returned ${resp.status}: ${text}`);
      }

      const data = await resp.json();
      // Normalize a few cases
      const score = data?.score ?? null;
      const reasons = Array.isArray(data?.reasons) ? data.reasons : [];

      setResult({ score, reasons });
    } catch (err) {
      console.error(err);
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const renderSkeleton = () => (
    <div className="skeleton mt-4 p-4 border rounded animate-pulse bg-gray-50">
      <div className="h-6 w-3/5 bg-gray-200 mb-3 rounded" />
      <div className="h-4 w-2/3 bg-gray-200 mb-2 rounded" />
      <div className="h-3 w-1/2 bg-gray-200 rounded" />
    </div>
  );

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="score-card mt-4 p-4 border rounded bg-white shadow-sm">
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-semibold">Lead Score</h3>
          <span className="text-3xl font-bold text-indigo-600">{result.score ?? "N/A"}</span>
        </div>

        <div className="mt-3">
          <h4 className="font-medium">Reasons</h4>
          {result.reasons.length ? (
            <ul className="list-disc ml-5 mt-2">
              {result.reasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mt-1">No reasons provided.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Submit a Lead</h2>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            value={lead.name}
            onChange={handleChange}
            onBlur={() => setTouched(t => ({ ...t, name: true }))}
            className="w-full p-2 border rounded"
            placeholder="Full name (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={lead.email}
            onChange={handleChange}
            onBlur={() => setTouched(t => ({ ...t, email: true }))}
            className="w-full p-2 border rounded"
            placeholder="name@example.com (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Company</label>
          <input
            name="company"
            value={lead.company}
            onChange={handleChange}
            onBlur={() => setTouched(t => ({ ...t, company: true }))}
            className="w-full p-2 border rounded"
            placeholder="Company (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Pitch</label>
          <textarea
            name="pitch"
            value={lead.pitch}
            onChange={handleChange}
            onBlur={() => setTouched(t => ({ ...t, pitch: true }))}
            className="w-full p-2 border rounded h-28"
            placeholder="Write a short pitch or message (required)"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-indigo-600"}`}
            disabled={loading}
          >
            {loading ? "Scoring lead..." : "Get score"}
          </button>
        </div>
      </form>

      {/* UI states */}
      {loading && renderSkeleton()}

      {error && (
        <div className="mt-4 p-3 border rounded bg-red-50 text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result ? renderResult() : !loading && (
        <div className="mt-4 p-3 border rounded bg-gray-50 text-gray-600">
          Submit a lead to see its score.
        </div>
      )}
    </div>
  );
}

// client/src/components/LeadForm.jsx
import React, { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

export default function LeadForm() {
  const [lead, setLead] = useState({ name: "", email: "", company: "", pitch: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => setLead(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server ${res.status}: ${text}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl mb-4 font-bold">Submit a Lead</h2>
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="company" placeholder="Company" onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="pitch" required placeholder="Pitch" onChange={handleChange} className="w-full p-2 border rounded h-28" />
        <button type="submit" disabled={loading} className={`w-full py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-indigo-600"}`}>
          {loading ? "Scoring..." : "Get score"}
        </button>
      </form>

      {loading && (
        <div className="mt-4 p-4 border rounded animate-pulse bg-gray-100">Scoring lead…</div>
      )}

      {error && (
        <div className="mt-4 p-3 border rounded bg-red-50 text-red-700">Error: {error}</div>
      )}

      {result && (
        <div className="mt-4 p-4 border rounded bg-white shadow-sm">
          <div className="flex justify-between items-baseline">
            <h3 className="text-xl font-semibold">Lead Score</h3>
            <span className="text-3xl font-bold text-indigo-600">{result.score ?? "N/A"}</span>
          </div>

          <div className="mt-3">
            <h4 className="font-medium">Reasons</h4>
            {Array.isArray(result.reasons) && result.reasons.length ? (
              <ul className="list-disc ml-5 mt-2">
                {result.reasons.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 mt-1">No reasons provided.</p>
            )}
          </div>
        </div>
      )}

      {!result && !loading && !error && (
        <div className="mt-4 p-3 border rounded bg-gray-50 text-gray-600">Submit a lead to see the score here.</div>
      )}
    </div>
  );
}

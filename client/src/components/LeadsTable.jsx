// client/src/components/LeadsTable.jsx
import React from "react";

export default function LeadsTable() {
  const sample = [
    { id: 1, name: "Lead A", score: 85 },
    { id: 2, name: "Lead B", score: 72 },
  ];

  return (
    <div className="leads-table">
      <h3>Leads</h3>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Score</th></tr>
        </thead>
        <tbody>
          {sample.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.name}</td>
              <td>{l.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

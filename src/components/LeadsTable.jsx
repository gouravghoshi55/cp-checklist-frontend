import React from "react";

export default function LeadsTable({ leads, onMarkDone, loading }) {
  if (loading) {
    return (
      <div className="table-loading">
        <div className="loading-pulse"></div>
        <p>Loading leads...</p>
      </div>
    );
  }

  if (!leads || leads.length === 0) {
    return (
      <div className="table-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
        <p>No pending leads found</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="leads-table">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Doer</th>
            <th>Planned</th>
            <th>Channel Partner</th>
            <th>Freq</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, idx) => (
            <tr key={`${lead.taskId}-${idx}`}>
              <td className="cell-task-id">{lead.taskId}</td>
              <td className="cell-name">{lead.name}</td>
              <td className="cell-planned">{formatPlanned(lead.planned)}</td>
              <td className="cell-cp">{lead.task}</td>
              <td className="cell-freq">
                <span className="freq-badge">{lead.freq}</span>
              </td>
              <td className="cell-phone">{lead.phoneNumber}</td>
              <td className="cell-status">
                <span className="status-pending">Pending</span>
              </td>
              <td className="cell-action">
                <button className="btn-mark-done" onClick={() => onMarkDone(lead)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Done
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        Showing {leads.length} pending lead{leads.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}

function formatPlanned(dateStr) {
  if (!dateStr) return "—";
  // Try to make it cleaner: "28/04/2026 00:00:00" → "28 Apr 2026"
  const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (match) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${match[1]} ${months[parseInt(match[2], 10) - 1]} ${match[3]}`;
  }
  return dateStr.replace(/, 00:00:00$/, "").replace(/ 00:00:00$/, "");
}
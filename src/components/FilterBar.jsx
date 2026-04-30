import React from "react";

export default function FilterBar({ filters, onFilterChange, channelPartners, onRefresh }) {
  const handleToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;
    onFilterChange({ ...filters, from: dateStr, to: dateStr });
  };

  const isToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;
    return filters.from === dateStr && filters.to === dateStr;
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label className="filter-label">Channel Partner</label>
        <div className="select-wrapper">
          <select
            className="filter-select"
            value={filters.cp}
            onChange={(e) => onFilterChange({ ...filters, cp: e.target.value })}
          >
            <option value="">All Partners</option>
            {channelPartners.map((cp) => (
              <option key={cp} value={cp}>
                {cp}
              </option>
            ))}
          </select>
          <svg className="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">From</label>
        <input
          type="date"
          className="filter-date"
          value={filters.from}
          onChange={(e) => onFilterChange({ ...filters, from: e.target.value })}
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">To</label>
        <input
          type="date"
          className="filter-date"
          value={filters.to}
          onChange={(e) => onFilterChange({ ...filters, to: e.target.value })}
        />
      </div>

      <div className="filter-actions">
        <button
          className={`btn-today ${isToday() ? "btn-today-active" : ""}`}
          onClick={handleToday}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <circle cx="12" cy="16" r="2" />
          </svg>
          Today
        </button>
        <button
          className="btn-reset"
          onClick={() => onFilterChange({ cp: "", from: "", to: "" })}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Reset
        </button>
        <button className="btn-refresh" onClick={onRefresh}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M21 21v-5h-5" />
          </svg>
          Refresh
        </button>
      </div>
    </div>
  );
}
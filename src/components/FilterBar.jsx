import React from "react";

export default function FilterBar({ filters, onFilterChange, channelPartners, onRefresh }) {
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
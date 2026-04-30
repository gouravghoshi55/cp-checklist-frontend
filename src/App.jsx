import React, { useState, useEffect, useCallback } from "react";
import FilterBar from "./components/FilterBar";
import LeadsTable from "./components/LeadsTable";
import ChecklistModal from "./components/ChecklistModal";
import { fetchLeads, markDone, fetchChannelPartners } from "./api";
import "./App.css";

function App() {
  const [leads, setLeads] = useState([]);
  const [channelPartners, setChannelPartners] = useState([]);
  const [filters, setFilters] = useState({ cp: "", from: "", to: "" });
  const [loading, setLoading] = useState(true);
  const [modalLead, setModalLead] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Load leads
  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchLeads(filters);
      setLeads(res.leads || []);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
      showToast("Failed to load leads. Check server connection.", "error");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Load channel partners on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchChannelPartners();
        setChannelPartners(res.partners || []);
      } catch (err) {
        console.error("Failed to fetch channel partners:", err);
      }
    })();
  }, []);

  // Load leads when filters change
  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  // Handle mark done
  const handleMarkDone = async (payload) => {
    setIsSubmitting(true);
    try {
      await markDone(payload);
      showToast(`Task ${payload.taskId} marked as Done!`, "success");
      setModalLead(null);
      loadLeads(); // refresh table
    } catch (err) {
      console.error("Failed to mark done:", err);
      showToast("Failed to mark as done. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toast
  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <div className="header-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <h1 className="header-title">Channel Partner Follow-up</h1>
            <p className="header-subtitle">Dashboard</p>
          </div>
        </div>
        <div className="header-right">
          <span className="lead-count-badge">
            {loading ? "..." : leads.length} Pending
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          channelPartners={channelPartners}
          onRefresh={loadLeads}
        />
        <LeadsTable
          leads={leads}
          loading={loading}
          onMarkDone={(lead) => setModalLead(lead)}
        />
      </main>

      {/* Modal */}
      {modalLead && (
        <ChecklistModal
          lead={modalLead}
          onClose={() => setModalLead(null)}
          onSubmit={handleMarkDone}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;
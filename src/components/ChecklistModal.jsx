import React, { useState } from "react";

export default function ChecklistModal({
  lead,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const [remark, setRemark] = useState("");
  const [leadDetails, setLeadDetails] = useState("");

  const handleSubmit = () => {
    onSubmit({
      taskId: lead.taskId,
      remark,
      leadDetails,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <h2 className="modal-title">Checklist Form</h2>
          <button className="modal-close" onClick={onClose}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Lead Info Summary */}
        <div className="modal-lead-info">
          <div className="lead-info-row">
            <span className="lead-info-label">Task ID</span>
            <span className="lead-info-value">{lead.taskId}</span>
          </div>
          <div className="lead-info-row">
            <span className="lead-info-label">Channel Partner</span>
            <span className="lead-info-value">{lead.task}</span>
          </div>
          <div className="lead-info-row">
            <span className="lead-info-label">Doer</span>
            <span className="lead-info-value">{lead.name}</span>
          </div>
          <div className="lead-info-row">
            <span className="lead-info-label">Planned</span>
            <span className="lead-info-value">{lead.planned}</span>
          </div>
          <div className="lead-info-row">
            <span className="lead-info-label">Phone Number</span>
            <span className="lead-info-value">{lead.phoneNumber}</span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="modal-form">
          <div className="form-group">
            <label className="form-label">Remark</label>
            <textarea
              className="form-textarea"
              placeholder="Enter your remark..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Any Lead Details</label>
            <textarea
              className="form-textarea"
              placeholder="Enter lead details if any..."
              value={leadDetails}
              onChange={(e) => setLeadDetails(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="modal-actions">
          <button
            className="btn-cancel"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className="btn-done"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="btn-loading">
                <svg
                  className="spinner"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="31.4"
                    strokeLinecap="round"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              "Mark as Done"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

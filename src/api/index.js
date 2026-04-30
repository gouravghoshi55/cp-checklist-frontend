import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({ baseURL: API_BASE });

/**
 * Fetch pending leads with optional filters
 * @param {Object} filters - { cp, from, to }
 */
export async function fetchLeads(filters = {}) {
  const params = {};
  if (filters.cp) params.cp = filters.cp;
  if (filters.from) params.from = filters.from;
  if (filters.to) params.to = filters.to;
  const { data } = await api.get("/leads", { params });
  return data;
}

/**
 * Mark lead as done
 * @param {Object} payload - { taskId, remark, leadDetails }
 */
export async function markDone(payload) {
  const { data } = await api.post("/leads/done", payload);
  return data;
}

/**
 * Get list of channel partners for filter dropdown
 */
export async function fetchChannelPartners() {
  const { data } = await api.get("/channel-partners");
  return data;
}

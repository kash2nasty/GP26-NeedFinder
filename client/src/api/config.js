const API_BASE = import.meta.env.VITE_API_URL || '';

export const api = {
  analyzeEligibility: `${API_BASE}/api/eligibility/analyze`,
  shareResults: `${API_BASE}/api/share`,
  getSharedResults: (id) => `${API_BASE}/api/share/${id}`,
  getResources: `${API_BASE}/api/resources`,
  getNearbyResources: `${API_BASE}/api/resources/nearby`,
};

export const BASE_URL = process.env.REACT_APP_API_URL || '';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const getHeaders = (hasBody = false) => {
  const headers = { ...getAuthHeaders() };
  if (hasBody) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

// Operations Controller
export const markNotificationAsRead = (id) => 
  fetch(`${BASE_URL}/api/operations/notifications/${id}/read`, { method: 'PUT', headers: getHeaders() });

export const verifyDocument = (documentId) => 
  fetch(`${BASE_URL}/api/operations/documents/${documentId}/verify`, { method: 'PUT', headers: getHeaders() });

export const updateCheckStatus = (checkId, status, result) => {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (result) params.append('result', result);
  return fetch(`${BASE_URL}/api/operations/background-checks/${checkId}/status?${params.toString()}`, { 
    method: 'PUT', 
    headers: getHeaders() 
  });
};

export const getVehicle = (applicationId) => 
  fetch(`${BASE_URL}/api/operations/vehicles/${applicationId}`, { headers: getHeaders() });

export const registerVehicle = (applicationId, data) => 
  fetch(`${BASE_URL}/api/operations/vehicles/${applicationId}`, { method: 'POST', headers: getHeaders(true), body: JSON.stringify(data) });

export const getDocuments = (applicationId) => 
  fetch(`${BASE_URL}/api/operations/documents/${applicationId}`, { headers: getHeaders() });

export const uploadDocument = (applicationId, data) => 
  fetch(`${BASE_URL}/api/operations/documents/${applicationId}`, { method: 'POST', headers: getHeaders(true), body: JSON.stringify(data) });

export const getBackgroundChecks = (applicationId) => 
  fetch(`${BASE_URL}/api/operations/background-checks/${applicationId}`, { headers: getHeaders() });

export const initiateCheck = (applicationId, data) => 
  fetch(`${BASE_URL}/api/operations/background-checks/${applicationId}`, { method: 'POST', headers: getHeaders(true), body: JSON.stringify(data) });

export const getMyPerformance = () => 
  fetch(`${BASE_URL}/api/operations/performance/my-stats`, { headers: getHeaders() });

export const getMyUnreadNotifications = () => 
  fetch(`${BASE_URL}/api/operations/notifications/unread`, { headers: getHeaders() });

export const getAuditLogs = () => 
  fetch(`${BASE_URL}/api/operations/audit-logs`, { headers: getHeaders() });

// API Controller
export const updateApplicationStatus = (id, status) => 
  fetch(`${BASE_URL}/api/biketaxi/${id}/status?status=${status}`, { method: 'PUT', headers: getHeaders() });

export const addBiketaxi = (data) => 
  fetch(`${BASE_URL}/addBiketaxi`, { method: 'POST', headers: getHeaders(true), body: JSON.stringify(data) });

export const getAllBiketaxi = () => 
  fetch(`${BASE_URL}/getAllBiketaxi`, { headers: { 'Content-Type': 'application/json', ...getAuthHeaders() } });

export const getBiketaxiById = (id) => 
  fetch(`${BASE_URL}/api/biketaxi/${id}`, { headers: getHeaders() });

export const getBiketaxisByStatus = (status) => 
  fetch(`${BASE_URL}/api/biketaxi/status/${status}`, { headers: getHeaders() });

export const deleteBiketaxi = (id) => 
  fetch(`${BASE_URL}/api/biketaxi/${id}`, { method: 'DELETE', headers: getHeaders() });

// Auth Controller
export const register = (data) => 
  fetch(`${BASE_URL}/api/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

export const login = (data) => 
  fetch(`${BASE_URL}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

export const getProfile = () => 
  fetch(`${BASE_URL}/api/auth/profile`, { headers: getHeaders() });

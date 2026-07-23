import api from './api';

// Student dashboard - gets own applications summary
export const getStudentDashboard = async () => {
  const response = await api.get('/applications/my');
  return response.data;
};

// Admin dashboard - gets KPI summary
export const getAdminDashboard = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

// Admin - get category stats
export const getCategoryStats = async () => {
  const response = await api.get('/admin/stats/category');
  return response.data;
};

export default {
  getStudentDashboard,
  getAdminDashboard,
  getCategoryStats
};
import api from './api';

// Admin - get all awards
export const getAllAwards = async () => {
  const response = await api.get('/awards');
  return response.data;
};

// Student - get own awards
export const getMyAwards = async () => {
  const response = await api.get('/awards/my');
  return response.data;
};

// Get award by application
export const getAwardByApplication = async (applicationId) => {
  const response = await api.get(`/awards/application/${applicationId}`);
  return response.data;
};

// Get award by ID
export const getAwardById = async (id) => {
  const response = await api.get(`/awards/${id}`);
  return response.data;
};

// Admin - issue award
export const issueAward = async (applicationId, note) => {
  const response = await api.post(`/awards?applicationId=${applicationId}&note=${note || ''}`);
  return response.data;
};

export default {
  getAllAwards,
  getMyAwards,
  getAwardByApplication,
  getAwardById,
  issueAward
};
import api from './api';

export const applyForScholarship = async (payload) => {
  const response = await api.post('/applications', payload);
  return response.data;
};

// Fixed - uses /applications/my not /applications/student/:id
export const getMyApplications = async () => {
  const response = await api.get('/applications/my');
  return response.data;
};

// Fixed - gets all applications by status
export const getAllApplications = async (status = 'SUBMITTED') => {
  const response = await api.get(`/applications/status/${status}`);
  return response.data;
};

export const getApplicationById = async (id) => {
  const response = await api.get(`/applications/${id}`);
  return response.data;
};

// Fixed - status as query param not body
export const updateApplicationStatus = async (id, status) => {
  const response = await api.put(`/applications/${id}/status?status=${status}`);
  return response.data;
};

export const withdrawApplication = async (id) => {
  const response = await api.delete(`/applications/${id}/withdraw`);
  return response.data;
};

export const getApplicationsByScholarship = async (scholarshipId) => {
  const response = await api.get(`/applications/scholarship/${scholarshipId}`);
  return response.data;
};

export default {
  applyForScholarship,
  getMyApplications,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  withdrawApplication,
  getApplicationsByScholarship
};
import api from './api';

// Get my submitted reviews
export const getMyReviews = async () => {
  const response = await api.get('/reviews/my');
  return response.data;
};

// Get applications waiting for review
export const getApplicationsForReview = async () => {
  const response = await api.get('/applications/status/UNDER_REVIEW');
  return response.data;
};

// Alias used by ReviewList.jsx
export const getReviewList = async () => {
  return getMyReviews();
};

// Get application details for review
export const getApplicationForReview = async (applicationId) => {
  const response = await api.get(`/applications/${applicationId}`);
  return response.data;
};

// Get all reviews for a specific application
export const getReviewsByApplication = async (applicationId) => {
  const response = await api.get(`/reviews/application/${applicationId}`);
  return response.data;
};

// Get average score for an application
export const getAverageScore = async (applicationId) => {
  const response = await api.get(`/reviews/application/${applicationId}/average`);
  return response.data;
};

// Submit a review
export const submitReview = async (payload) => {
  const response = await api.post('/reviews', payload);
  return response.data;
};

// Get review by ID
export const getReviewById = async (id) => {
  const response = await api.get(`/reviews/${id}`);
  return response.data;
};

export default {
  getMyReviews,
  getReviewList,
  getApplicationsForReview,
  getApplicationForReview,
  getReviewsByApplication,
  getAverageScore,
  getReviewById,
  submitReview,
};
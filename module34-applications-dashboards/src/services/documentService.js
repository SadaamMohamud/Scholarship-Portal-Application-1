import api from './api';

// Fixed - gets documents by applicationId not studentId
export const getDocumentsByApplication = async (applicationId) => {
  const response = await api.get(`/documents/application/${applicationId}`);
  return response.data;
};

// Added to support DocumentList.jsx
export const getMyDocuments = async (applicationId) => {
  return getDocumentsByApplication(applicationId);
};

// Fixed - uploads to /documents not /documents/upload
// Also sends applicationId and documentType as separate params
export const uploadDocument = async (applicationId, documentType, file) => {
  const formData = new FormData();

  formData.append('applicationId', applicationId);
  formData.append('documentType', documentType);
  formData.append('file', file);

  const response = await api.post('/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Get document by ID
export const getDocumentById = async (id) => {
  const response = await api.get(`/documents/${id}`);
  return response.data;
};

// Delete document
export const deleteDocument = async (id) => {
  const response = await api.delete(`/documents/${id}`);
  return response.data;
};

export default {
  getDocumentsByApplication,
  getMyDocuments,
  uploadDocument,
  getDocumentById,
  deleteDocument,
};
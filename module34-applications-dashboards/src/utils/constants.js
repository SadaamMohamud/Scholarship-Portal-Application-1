// Qiimaha guud ee looga baahan yahay meelo badan oo App-ka ka mid ah

export const APPLICATION_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const USER_ROLES = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  REVIEWER: 'REVIEWER',
};

export const EDUCATION_LEVELS = ['Undergraduate', 'Master', 'PhD'];

export const SCHOLARSHIP_CATEGORIES = ['Undergraduate', 'Master', 'PhD'];

export const SCHOLARSHIP_LOCATIONS = ['Mogadishu', 'Hargeisa', 'Garowe', 'International'];

export const SCHOLARSHIP_TYPES = ['Full Funded', 'Partial Funded'];

export const DOCUMENT_TYPES = {
  TRANSCRIPT: 'TRANSCRIPT',
  CERTIFICATE: 'CERTIFICATE',
  PASSPORT: 'PASSPORT',
  RECOMMENDATION_LETTER: 'RECOMMENDATION_LETTER',
  OTHER: 'OTHER',
};

export default {
  APPLICATION_STATUS,
  USER_ROLES,
  EDUCATION_LEVELS,
  SCHOLARSHIP_CATEGORIES,
  SCHOLARSHIP_LOCATIONS,
  SCHOLARSHIP_TYPES,
  DOCUMENT_TYPES,
};

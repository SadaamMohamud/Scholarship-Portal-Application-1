// Hawlaha ku saabsan token-ka iyo xogta isticmaalaha ee ku kaydsan localStorage
// Fure isku mid ah ('authToken') ayaa lagu isticmaalaa meel kasta (api.js, AuthContext.jsx, iwm.)

const TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
};

export const setStoredUser = (user) => {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeStoredUser = () => localStorage.removeItem(USER_KEY);

export const isAuthenticated = () => Boolean(getToken());

export const clearSession = () => {
  removeToken();
  removeStoredUser();
};

export default {
  getToken,
  setToken,
  removeToken,
  getStoredUser,
  setStoredUser,
  removeStoredUser,
  isAuthenticated,
  clearSession,
};

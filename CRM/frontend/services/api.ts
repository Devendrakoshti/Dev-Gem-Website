import axios from 'axios';
import { API_BASE_URL } from '../config/appConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Inject Token
api.interceptors.request.use((config) => {
  const sessionStr = localStorage.getItem('nexus_auth_session');
  if (sessionStr) {
    try {
      const session = JSON.parse(sessionStr);
      if (session.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
      }
    } catch (e) {
      // Invalid session
    }
  }
  return config;
});

export default api;

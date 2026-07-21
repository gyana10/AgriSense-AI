import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Access Token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('agrisense_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response Interceptor: Automatic Refresh Token handle
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('agrisense_refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post(`${API.defaults.baseURL}/auth/refresh`, {
            refresh_token: refreshToken,
          });
          const { access_token, refresh_token } = res.data;
          localStorage.setItem('agrisense_access_token', access_token);
          localStorage.setItem('agrisense_refresh_token', refresh_token);
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return API(originalRequest);
        } catch (refreshErr) {
          localStorage.removeItem('agrisense_access_token');
          localStorage.removeItem('agrisense_refresh_token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;

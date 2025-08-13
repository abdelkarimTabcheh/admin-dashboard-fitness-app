import axios from 'axios';

let onUnauthorized = () => {};

// This will be called from main.jsx
export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      onUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default API;

export const fetchHomeConfig = () => API.get('/home-config');
export const updateHomeConfig = (config) => API.put('/home-config', config);

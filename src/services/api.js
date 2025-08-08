// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
export const fetchHomeConfig = () => API.get('/home-config');
export const updateHomeConfig = (config) => API.put('/home-config', config);

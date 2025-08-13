// src/services/userService.js
import API from './api';

export const fetchUsers = () => API.get('/admin/users');
export const createUser = (userData) => API.post('/admin/users', userData);
export const updateUser = (id, userData) => API.put(`/admin/users/${id}`, userData);
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);

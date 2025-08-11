// src/services/baseService.js
import API from './api';

class BaseService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async getAll() {
    const response = await API.get(this.endpoint);
    return response.data;
  }

  async getById(id) {
    const response = await API.get(`${this.endpoint}/${id}`);
    return response.data;
  }

  async create(data) {
    const response = await API.post(this.endpoint, data);
    return response.data;
  }

  async update(id, data) {
    const response = await API.put(`${this.endpoint}/${id}`, data);
    return response.data;
  }

  async delete(id) {
    await API.delete(`${this.endpoint}/${id}`);
    return id;
  }
}

export default BaseService;
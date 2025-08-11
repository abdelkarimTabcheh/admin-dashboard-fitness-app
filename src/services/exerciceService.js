// src/services/exerciseService.js
import BaseService from './baseService';

class ExerciseService extends BaseService {
  constructor() {
    super('/exercises');
  }

  // Add exercise-specific methods
  async getByCategory(category) {
    const response = await API.get(`${this.endpoint}/category/${category}`);
    return response.data;
  }

  async uploadImage(id, formData) {
    const response = await API.post(`${this.endpoint}/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
}

export default new ExerciseService();
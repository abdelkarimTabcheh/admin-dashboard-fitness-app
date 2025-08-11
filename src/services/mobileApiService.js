// src/services/mobileApiService.js
import API from './api';

class MobileApiService {
  // User Authentication for Mobile
  async mobileLogin(credentials) {
    const response = await API.post('/mobile/auth/login', credentials);
    return response.data;
  }

  async mobileRegister(userData) {
    const response = await API.post('/mobile/auth/register', userData);
    return response.data;
  }

  // Mobile-specific workout data
  async getMobileWorkouts(userId) {
    const response = await API.get(`/mobile/workouts/${userId}`);
    return response.data;
  }

  async getMobileExercises(filters = {}) {
    const response = await API.get('/mobile/exercises', { params: filters });
    return response.data;
  }

  // Push notification management
  async registerPushToken(userId, token) {
    const response = await API.post('/mobile/push-tokens', { userId, token });
    return response.data;
  }

  async sendPushNotification(data) {
    const response = await API.post('/mobile/notifications/send', data);
    return response.data;
  }

  // Analytics for mobile app
  async logUserActivity(activityData) {
    const response = await API.post('/mobile/analytics/activity', activityData);
    return response.data;
  }
}

export default new MobileApiService();
// src/services/websocketService.js
class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect(token) {
    this.socket = new WebSocket(`ws://localhost:3001?token=${token}`);
    
    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };
    
    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      // Auto-reconnect logic
      setTimeout(() => this.connect(token), 5000);
    };
  }

  handleMessage(data) {
    const listeners = this.listeners.get(data.type) || [];
    listeners.forEach(callback => callback(data.payload));
  }

  subscribe(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(callback);
  }

  unsubscribe(type, callback) {
    const listeners = this.listeners.get(type) || [];
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  send(type, payload) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }));
    }
  }
}

export default new WebSocketService();
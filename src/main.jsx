// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { logout } from './redux/authSlice.js';
import { setUnauthorizedHandler } from './services/api.js'; // <-- new import

// Set up a handler for 401 errors
setUnauthorizedHandler(() => {
  store.dispatch(logout());
  window.location.href = '/login';
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

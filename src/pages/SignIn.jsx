// src/pages/SignIn.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { Navigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from 'react-bootstrap';

export default function SignIn() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  // Redirect if logged in
  if (user && user.role === 'admin') {
    return <Navigate to="/home" replace />;
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
      }}
    >
      <Card
        style={{ width: '100%', maxWidth: '400px', borderRadius: '16px' }}
        className="p-4 shadow-lg bg-white"
      >
        <Card.Body>
          <div className="text-center mb-4">
            {/* Optional logo */}
            {/* <img src="/logo.png" alt="Logo" width="60" className="mb-3" /> */}
            <h2 className="fw-bold text-primary">Admin Login</h2>
            <p className="text-muted">Access your dashboard</p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <>
                    <Spinner animation="border" size="sm" /> Logging in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

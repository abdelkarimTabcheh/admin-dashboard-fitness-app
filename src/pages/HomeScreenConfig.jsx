// src/pages/HomeScreenConfig.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeConfig, updateHomeConfig } from '../redux/homeConfigSlice';
import { Alert, Form, Button } from 'react-bootstrap';

export default function HomeScreenConfig() {
  const dispatch = useDispatch();
  const { config, loading, error } = useSelector((state) => state.homeConfig);

  const [form, setForm] = useState({
    featuredWorkouts: '',
    bannerText: '',
  });

  useEffect(() => {
    dispatch(fetchHomeConfig());
  }, [dispatch]);

  useEffect(() => {
    if (config) {
      setForm({
        featuredWorkouts: config.featuredWorkouts || '',
        bannerText: config.bannerText || '',
      });
    }
  }, [config]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateHomeConfig(form));
  };

  return (
    <div className="p-4">
      <h1>Home Screen Configuration</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
        <Form.Group className="mb-3" controlId="featuredWorkouts">
          <Form.Label>Featured Workouts (JSON or comma separated)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="featuredWorkouts"
            value={form.featuredWorkouts}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="bannerText">
          <Form.Label>Banner Text</Form.Label>
          <Form.Control
            type="text"
            name="bannerText"
            value={form.bannerText}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary">Save Configuration</Button>
      </Form>
    </div>
  );
}

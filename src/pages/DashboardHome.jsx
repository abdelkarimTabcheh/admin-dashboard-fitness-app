// src/pages/DashboardHome.jsx (Enhanced)
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../redux/dashboardSlice';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardHome() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(() => {
      dispatch(fetchDashboardStats());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <Row className="g-4 mb-5">
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body className="text-center">
              <div className="text-primary fs-1">👥</div>
              <h5 className="card-title text-muted">Total Users</h5>
              <p className="display-6 text-primary">{stats?.totalUsers || 0}</p>
              <small className="text-success">+{stats?.newUsersToday || 0} today</small>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body className="text-center">
              <div className="text-warning fs-1">💪</div>
              <h5 className="card-title text-muted">Total Exercises</h5>
              <p className="display-6 text-warning">{stats?.totalExercises || 0}</p>
              <small className="text-info">Across {stats?.categories || 0} categories</small>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body className="text-center">
              <div className="text-success fs-1">📱</div>
              <h5 className="card-title text-muted">Active Sessions</h5>
              <p className="display-6 text-success">{stats?.activeSessions || 0}</p>
              <small className="text-muted">Last 24h</small>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body className="text-center">
              <div className="text-danger fs-1">🔥</div>
              <h5 className="card-title text-muted">Workouts Today</h5>
              <p className="display-6 text-danger">{stats?.workoutsToday || 0}</p>
              <small className="text-success">↗️ +12% vs yesterday</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row>
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5>User Activity (Last 7 Days)</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats?.userActivity || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5>Popular Exercises</h5>
            </Card.Header>
            <Card.Body>
              {stats?.popularExercises?.map((exercise, index) => (
                <div key={exercise.id} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{exercise.name}</span>
                  <span className="badge bg-primary">{exercise.count}</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
// src/pages/Notifications.jsx
import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Table, Alert } from 'react-bootstrap';
import mobileApiService from '../services/mobileApiService';

export default function Notifications() {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState({
    title: '',
    body: '',
    targetUsers: 'all',
    scheduledAt: ''
  });

  const handleSendNotification = async (e) => {
    e.preventDefault();
    try {
      await mobileApiService.sendPushNotification(notification);
      alert('Notification sent successfully!');
      setNotification({ title: '', body: '', targetUsers: 'all', scheduledAt: '' });
    } catch (error) {
      alert('Failed to send notification');
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Push Notifications</h2>
      
      <Card className="mb-4">
        <Card.Header>Send New Notification</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSendNotification}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={notification.title}
                onChange={(e) => setNotification({...notification, title: e.target.value})}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notification.body}
                onChange={(e) => setNotification({...notification, body: e.target.value})}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Target Audience</Form.Label>
              <Form.Select
                value={notification.targetUsers}
                onChange={(e) => setNotification({...notification, targetUsers: e.target.value})}
              >
                <option value="all">All Users</option>
                <option value="active">Active Users Only</option>
                <option value="inactive">Inactive Users</option>
              </Form.Select>
            </Form.Group>
            
            <Button type="submit" variant="primary">Send Notification</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
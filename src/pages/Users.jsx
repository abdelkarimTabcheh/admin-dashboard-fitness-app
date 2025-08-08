import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, editUser, deleteUser } from '../redux/userSlice';
import { Table, Button, Form, Alert, Spinner, Row, Col } from 'react-bootstrap';

export default function Users() {
  const dispatch = useDispatch();
  const { list: users, status, error } = useSelector(state => state.users);

  const [form, setForm] = useState({ name: '', role: 'user' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers());
  }, [dispatch, status]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (isEditing) {
      dispatch(editUser({ id: editId, user: form }));
    } else {
      dispatch(addUser(form));
    }
    setForm({ name: '', role: 'user' });
    setIsEditing(false);
  };

  const handleEdit = user => {
    setForm({ name: user.name, role: user.role });
    setIsEditing(true);
    setEditId(user._id);
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure?')) dispatch(deleteUser(id));
  };

  return (
    <div className="p-3">
      <h2 className="mb-4">Users Management</h2>

      {status === 'loading' && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="g-2">
          <Col xs={12} md={5}>
            <Form.Control
              placeholder="User Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </Col>
          <Col xs={12} md={3}>
            <Form.Select
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="coach">Coach</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={4}>
            <Button type="submit" className="w-100">
              {isEditing ? 'Update User' : 'Add User'}
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th style={{ minWidth: '120px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                No users found.
              </td>
            </tr>
          ) : (
            users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(u)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(u._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

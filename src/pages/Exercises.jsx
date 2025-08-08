// src/pages/Exercises.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchExercises,
  addExercise,
  editExercise,
  deleteExercise,
} from '../redux/exerciseSlice';
import { Table, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';

export default function Exercises() {
  const dispatch = useDispatch();
  const { list: exercises, status, error } = useSelector(state => state.exercises);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExercise, setCurrentExercise] = useState({ name: '', description: '' });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExercises());
    }
  }, [dispatch, status]);

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentExercise({ name: '', description: '' });
    setShowModal(true);
  };

  const openEditModal = (exercise) => {
    setIsEditing(true);
    setCurrentExercise(exercise);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    setCurrentExercise({ ...currentExercise, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(editExercise({ id: currentExercise._id, exercise: currentExercise }));
    } else {
      dispatch(addExercise(currentExercise));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      dispatch(deleteExercise(id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Exercises Management</h2>

      {status === 'loading' && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={openAddModal} className="mb-3">
        Add Exercise
      </Button>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((ex) => (
            <tr key={ex._id}>
              <td>{ex.name}</td>
              <td>{ex.description}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => openEditModal(ex)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(ex._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {exercises.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center">
                No exercises found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Exercise' : 'Add Exercise'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exerciseName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                required
                value={currentExercise.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exerciseDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows={3}
                value={currentExercise.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? 'Save Changes' : 'Add Exercise'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

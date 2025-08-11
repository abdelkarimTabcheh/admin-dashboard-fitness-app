//src/components/EditUser.jsx

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Alert,
} from '@mui/material';

export default function EditUser({ open, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: '',
    isAdmin: false,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        name: user.name || '',
        role: user.role || '',
        isAdmin: user.isAdmin || false,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.email) {
      setError('Email is required');
      return;
    }
    setError(null);
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            disabled
          />
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isAdmin}
                onChange={handleChange}
                name="isAdmin"
              />
            }
            label="Admin"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

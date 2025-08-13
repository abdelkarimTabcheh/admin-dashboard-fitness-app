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

  const [originalData, setOriginalData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const userData = {
        email: user.email || '',
        name: user.name || '',
        role: user.role || '',
        isAdmin: user.isAdmin || false,
      };
      setFormData(userData);
      setOriginalData(userData); // Store original data for comparison
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Check if any changes were made
  const hasChanges = () => {
    return (
      formData.name !== originalData.name ||
      formData.role !== originalData.role ||
      formData.isAdmin !== originalData.isAdmin
    );
  };

  const handleSubmit = () => {
    if (!formData.email) {
      setError('Email is required');
      return;
    }

    // Check if no changes were made
    if (!hasChanges()) {
      setError('No changes detected. Please modify at least one field.');
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

        <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            disabled
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root': {
                transform: 'translate(14px, -9px) scale(0.75)', // Keep label positioned correctly
                backgroundColor: 'white',
                padding: '0 4px',
              },
              '& .MuiInputLabel-root.Mui-disabled': {
                color: 'rgba(0, 0, 0, 0.6)', // Better disabled color
              }
            }}
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
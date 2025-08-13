import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, editUser, addUser } from '../redux/userSlice';
import EditUser from '../components/EditUser';
import CreateUser from '../components/CreateUser';

export default function Users() {
  const dispatch = useDispatch();
  const { list: users, status, error } = useSelector((state) => state.users);
  const token = useSelector((state) => state.auth.token); // <- get token from Redux

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    if (status === 'idle' && token) { // <- wait for token before fetching
      dispatch(fetchUsers());
    }
  }, [dispatch, status, token]);

  // --- CREATE ---
  const handleCreateClick = () => setCreateDialogOpen(true);
  const handleCreateClose = () => setCreateDialogOpen(false);
  const handleCreateSave = (newUserData) => {
    dispatch(addUser(newUserData))
      .unwrap()
      .then(() => {
        setSnackbar({ open: true, message: 'User created successfully', severity: 'success' });
        handleCreateClose();
      })
      .catch(() => {
        setSnackbar({ open: true, message: 'Failed to create user', severity: 'error' });
      });
  };

  // --- EDIT ---
  const handleEditClick = (user) => {
    setUserToEdit(user);
    setEditDialogOpen(true);
  };
  const handleEditClose = () => {
    setEditDialogOpen(false);
    setUserToEdit(null);
  };
  const handleEditSave = (updatedData) => {
    dispatch(editUser({ id: userToEdit._id, user: updatedData }))
      .unwrap()
      .then(() => {
        setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
        handleEditClose();
      })
      .catch(() => {
        setSnackbar({ open: true, message: 'Failed to update user', severity: 'error' });
      });
  };

  // --- DELETE ---
  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setDeleteConfirmOpen(true);
  };
  const handleDeleteConfirm = () => {
    dispatch(deleteUser(userToDelete))
      .unwrap()
      .then(() => {
        setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
      })
      .catch(() => {
        setSnackbar({ open: true, message: 'Failed to delete user', severity: 'error' });
      });
    setDeleteConfirmOpen(false);
    setUserToDelete(null);
  };
  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setUserToDelete(null);
  };
  const handleSnackbarClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

  if (status === 'loading') {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>Loading users...</Typography>
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box textAlign="center" mt={5}>
        <Alert severity="error">Error loading users: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>Users</Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
        onClick={handleCreateClick}
      >
        Create User
      </Button>

      {users.length === 0 ? (
        <Typography>No users found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="Users Table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name || '-'}</TableCell>
                  <TableCell>{user.role || '-'}</TableCell>
                  <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEditClick(user)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDeleteClick(user._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CreateUser open={createDialogOpen} onClose={handleCreateClose} onCreate={handleCreateSave} />
      <EditUser open={editDialogOpen} onClose={handleEditClose} user={userToEdit} onSave={handleEditSave} />

      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

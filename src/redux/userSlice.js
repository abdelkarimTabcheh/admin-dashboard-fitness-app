// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/userService';

// Async thunks
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await api.fetchUsers();
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
  const response = await api.createUser(user);
  return response.data;
});

export const editUser = createAsyncThunk('users/editUser', async ({ id, user }) => {
  const response = await api.updateUser(id, user);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await api.deleteUser(id);
  return id;
});

// Initial state
const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.list.findIndex(user => user._id === action.payload._id);
        if (index >= 0) state.list[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(user => user._id !== action.payload);
      });
  }
});

export default userSlice.reducer;

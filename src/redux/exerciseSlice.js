// src/redux/exerciseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../services/api';

export const fetchExercises = createAsyncThunk('exercises/fetchExercises', async () => {
  const response = await API.get('/exercises');
  return response.data;
});

export const addExercise = createAsyncThunk('exercises/addExercise', async (exercise) => {
  const response = await API.post('/exercises', exercise);
  return response.data;
});

export const editExercise = createAsyncThunk('exercises/editExercise', async ({ id, exercise }) => {
  const response = await API.put(`/exercises/${id}`, exercise);
  return response.data;
});

export const deleteExercise = createAsyncThunk('exercises/deleteExercise', async (id) => {
  await API.delete(`/exercises/${id}`);
  return id;
});

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addExercise.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editExercise.fulfilled, (state, action) => {
        const index = state.list.findIndex(e => e._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        state.list = state.list.filter(e => e._id !== action.payload);
      });
  },
});

export default exerciseSlice.reducer;

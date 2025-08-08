// src/redux/homeConfigSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

export const fetchHomeConfig = createAsyncThunk('homeConfig/fetch', async () => {
  const response = await api.fetchHomeConfig();
  return response.data;
});

export const updateHomeConfig = createAsyncThunk('homeConfig/update', async (config) => {
  const response = await api.updateHomeConfig(config);
  return response.data;
});

const homeConfigSlice = createSlice({
  name: 'homeConfig',
  initialState: {
    config: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeConfig.fulfilled, (state, action) => {
        state.config = action.payload;
        state.loading = false;
      })
      .addCase(fetchHomeConfig.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateHomeConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHomeConfig.fulfilled, (state, action) => {
        state.config = action.payload;
        state.loading = false;
      })
      .addCase(updateHomeConfig.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default homeConfigSlice.reducer;

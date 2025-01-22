import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFollowers = createAsyncThunk(
  'follow/fetchFollowers',
  async (id) => {
    const response = await axios.get(`/user/${id}/followers`);
    return response.data.followers;
  }
);

export const fetchFollowing = createAsyncThunk(
  'follow/fetchFollowing',
  async (id) => {
    const response = await axios.get(`/user/${id}/following`);
    return response.data.following;
  }
);

const followSlice = createSlice({
  name: 'follow',
  initialState: {
    followers: [],
    following: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFollowing.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.following = action.payload;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {  } = followSlice.actions;
export default followSlice.reducer;

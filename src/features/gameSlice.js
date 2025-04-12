// src/features/gameSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGames } from '../services/rawgApi';

export const getGames = createAsyncThunk(
  'games/getGames',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState().games;
      const data = await fetchGames(filters, filters.page, filters.search);

      // ✅ Guard: if no results (e.g., { detail: "Not found" }), handle gracefully
      if (!Array.isArray(data?.results)) {
        return rejectWithValue(data?.detail || 'Games not found.');
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || err.message || 'Unknown error');
    }
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    count: 0,
    loading: false,
    error: null,
    filters: {
      page: 1,
      search: '',
      genres: [],
      tags: [],
      platforms: [],
      ordering: '',
      year: '',
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        page: 1,
        search: '',
        genres: [],
        tags: [],
        platforms: [],
        ordering: '',
        year: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload.results;
        state.count = action.payload.count;
      })
      .addCase(getGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch games.';
        state.games = []; // Clear games if error happens
        state.count = 0;
      });
  },
});

export const { setPage, setFilters, resetFilters } = gamesSlice.actions;
export default gamesSlice.reducer;

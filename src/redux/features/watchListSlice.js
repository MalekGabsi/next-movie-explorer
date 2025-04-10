import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  watchlist: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('watchlist')) || [] : [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      const exists = state.watchlist.find((m) => m.id === action.payload.id);
      if (!exists) {
        state.watchlist.push(action.payload);
        localStorage.setItem('watchlist', JSON.stringify(state.watchlist)); 
      }
    },
    removeMovie: (state, action) => {
      state.watchlist = state.watchlist.filter((m) => m.id !== action.payload);
      localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    },
  },
});

export const { addMovie, removeMovie } = watchlistSlice.actions;
export default watchlistSlice.reducer;

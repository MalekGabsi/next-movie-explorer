import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from './features/watchListSlice';

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
  },
});

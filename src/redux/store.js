import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from './features/watchListSlice';
import authReducer from './features/authSlice';
export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    auth: authReducer, 
  },
});

import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from '../features/github/githubApi.js';
import userReducer from '../features/user/userSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});
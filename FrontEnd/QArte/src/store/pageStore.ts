import { configureStore } from '@reduxjs/toolkit';
import userReducer from './pageSlice';

export const pageStore = configureStore({
    reducer: {
      // Add the user slice reducer under the 'user' key
      user: userReducer,
    },
  });
  
  export type RootState = ReturnType<typeof pageStore.getState>;
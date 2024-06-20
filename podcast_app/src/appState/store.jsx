import { configureStore } from '@reduxjs/toolkit';
import { podcastsReducer } from './reducers/podcastsReducer';
export const store = configureStore({
  reducer: {
    podcastsReducer: podcastsReducer,
  },
});

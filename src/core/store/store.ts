import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './features/projects/projects-slice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

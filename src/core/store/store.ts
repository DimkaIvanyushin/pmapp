import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './features/projects/projects-slice';
import milestonesReducer from './features/projects/milestones-slice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    milestones: milestonesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

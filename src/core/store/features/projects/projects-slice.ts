import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, Status, StateIds } from '../../../models';
import { RootState } from '../../store';
import * as API from '../../../common/api';

export interface ProjectsState {
  projects: StateIds<Project>;
  status: Status;
}

const initialState: ProjectsState = {
  projects: {
    byId: {},
    allIds: [],
  },
  status: Status.LOADING,
};

export const getProjectsAsync = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await API.getProjects();
  return response.data;
});

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, { payload: project }: PayloadAction<Project>) => {
      state.projects.allIds = [...state.projects.allIds, project.id];
      state.projects.byId[project.id] = project;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProjectsAsync.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getProjectsAsync.fulfilled, (state, { payload: projects }) => {
        state.status = Status.SUCCESS;
        state.projects.allIds = [
          ...state.projects.allIds,
          ...projects.map((project) => project.id),
        ];
        projects.forEach((project) => {
          state.projects.byId[project.id] = project;
        });
      })
      .addCase(getProjectsAsync.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const { addProject } = projectsSlice.actions;
export const selectProjects = (state: RootState) =>
  Object.values(state.projects.projects.byId).sort((a, b) => b.id - a.id);
export const selectProjectsStatus = (state: RootState) => state.projects.status;

export default projectsSlice.reducer;

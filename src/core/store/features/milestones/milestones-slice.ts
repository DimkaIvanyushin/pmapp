import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Milestone, Status, StateIds, Pagination } from '../../../models';
import * as API from '../../../common/api';
import { RootState } from '../../store';

export interface MilestonesState {
  milestones: StateIds<Milestone>;
  status: Status;
}

const initialState: MilestonesState = {
  milestones: {
    byId: {},
    allIds: [],
  },
  status: Status.LOADING,
};

export const getMilestonesAsync = createAsyncThunk(
  'milestones/fetchMilestone',
  async ({ projectId, pagination }: { projectId: number; pagination: Pagination }) => {
    const response = await API.getMilestones(projectId, pagination);
    return response.data;
  },
);

export const createMilestoneAsync = createAsyncThunk(
  'milestones/createMilestone',
  async ({ projectId, milestone }: { projectId: number; milestone: Milestone }) => {
    const response = await API.createMilestone(projectId, milestone);
    return response.data;
  },
);

export const editMilestoneAsync = createAsyncThunk(
  'milestones/editMilestone',
  async ({ projectId, milestone }: { projectId: number; milestone: Milestone }) => {
    const response = await API.editMilestone(projectId, milestone);
    return response.data;
  },
);

export const milestonesSlice = createSlice({
  name: 'milestones',
  initialState,
  reducers: {
    addMilestone: (state, { payload: milestone }: PayloadAction<Milestone>) => {
      state.milestones.allIds = [...state.milestones.allIds, milestone.id];
      state.milestones.byId[milestone.id] = milestone;
      state.status = Status.SUCCESS;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMilestonesAsync.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getMilestonesAsync.fulfilled, (state, { payload: milestones }) => {
        state.status = Status.SUCCESS;
        state.milestones.allIds = [
          ...state.milestones.allIds,
          ...milestones.map((milestone) => milestone.id),
        ];

        milestones.forEach((milestone) => {
          state.milestones.byId[milestone.id] = milestone;
        });
      })
      .addCase(getMilestonesAsync.rejected, (state) => {
        state.status = Status.FAILED;
      })
      .addCase(createMilestoneAsync.fulfilled, (state, { payload: milestone }) => {
        state.milestones.allIds = [...state.milestones.allIds, milestone.id];
        state.milestones.byId[milestone.id] = milestone;
      })
      .addCase(editMilestoneAsync.fulfilled, (state, { payload: milestone }) => {
        state.milestones.byId[milestone.id] = milestone;
      });
  },
});

export const { addMilestone } = milestonesSlice.actions;

export const selectMilestones = (projectId: number) => (state: RootState) =>
  Object.values(state.milestones.milestones.byId)
    .filter((milestone) => milestone.project_id === projectId)
    .sort((a, b) => b.id - a.id);

export const selectMilestonesStatus = (state: RootState) => state.milestones.status;

export default milestonesSlice.reducer;

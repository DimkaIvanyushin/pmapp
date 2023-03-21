import { Milestone, Status, StateIds } from '../../../models';

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

import { Milestone } from '../../../models/Milestone';

export type MilestonesProps = {
  projectId: number;
};

export type MilestonesState = {
  loading?: boolean;
  milestones: Milestone[];
};

export type MilestoneState = {
  isVisible: boolean;
  milestone?: Milestone | null;
};

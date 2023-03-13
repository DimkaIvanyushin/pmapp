import { Ids } from './ids';

export enum MilestoneState {
  ACTIVE = 'active',
  CLOSED = 'closed',
}

export interface Milestone extends Ids {
  project_id: number;
  title: string;
  description: string;
  state: MilestoneState;
  created_at: string;
  updated_at: string;
  due_date: string;
  start_date: string;
}

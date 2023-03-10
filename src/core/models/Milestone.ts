import { Ids } from './Ids';

export interface Milestone extends Ids {
  project_id: number;
  title: string;
  description: string;
  state: 'active';
  created_at: string;
  updated_at: string;
  due_date: string;
  start_date: string;
}

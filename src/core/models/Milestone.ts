import { Ids } from './Ids';

export interface Milestone extends Ids {
  project_id: number;
  title: string;
  description: string;
  state: 'active';
  created_at: string | Date;
  updated_at: string | Date;
  due_date: string;
  start_date: string;
}

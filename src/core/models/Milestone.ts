import { Ids } from './Ids';
import { Issue } from './Issue';

export interface Milestone extends Ids {
  project_id: number;
  title: string;
  description: string;
  state: 'active';
  created_at: string | Date;
  updated_at: string | Date;
  due_date: string | Date;
  start_date: string | Date;
  issues: Issue[];
}

import { Ids } from './Ids';
import { User } from './User';

export interface Issue extends Ids {
  title: string;
  description: string;
  state: 'opened' | 'closed';
  labels: string[];
  assignees: User[];
  assignee: User;
  author: User;
}

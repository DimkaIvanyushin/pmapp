import { Ids } from './ids';
import { User } from './user';

export enum IssueStateEnum {
  OPENED = 'opened',
  CLOSED = 'closed',
}

export interface Issue extends Ids {
  title: string;
  description: string;
  state: IssueStateEnum;
  labels: string[];
  assignees: User[];
  assignee: User;
  author: User;
}

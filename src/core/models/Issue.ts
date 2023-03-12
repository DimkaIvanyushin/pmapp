import { Ids } from './Ids';
import { User } from './User';

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

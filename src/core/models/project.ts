import { Ids } from './ids';

export interface Project extends Ids {
  name: string;
  description: string;
  path_with_namespace: string;
  created_at: string | Date;
  tag_list: string[];
  avatar_url: string;
  forks_count: number;
  star_count: number;
  open_issues_count: number;
  last_activity_at: string | Date;
}

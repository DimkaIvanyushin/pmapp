import { Ids } from './ids';

export interface User extends Ids {
  name: string;
  username: string;
  state: 'active';
  avatar_url: string;
  web_url: string;
}

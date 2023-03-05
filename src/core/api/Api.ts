import axios from 'axios';
import { Milestone } from '../models/Milestone';

const apiUrl = 'http://localhost:3000';

export const getMilestones = (projectId: number): Promise<{ data: Milestone[] }> => {
  console.log(projectId);
  return axios.get(`${apiUrl}/req.json`);
};

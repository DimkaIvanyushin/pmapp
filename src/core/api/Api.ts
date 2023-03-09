import axios from 'axios';
import { Issue } from '../models/Issue';
import { Milestone } from '../models/Milestone';

const apiUrl = 'http://gitlab.vitebsk.energo.net';
const token = '-7fdpi5x1xwPy8WWsy-G';

const config = {
  headers: {
    'PRIVATE-TOKEN': token,
  },
};

export function getMilestones(projectId: number): Promise<{ data: Milestone[] }> {
  return axios.get(`${apiUrl}/api/v4/projects/${projectId}/milestones`, config);
}

export function getIssues(projectId: number, milestoneId: number): Promise<{ data: Issue[] }> {
  return axios.get(
    `${apiUrl}/api/v4/projects/${projectId}/milestones/${milestoneId}/issues?per_page=100`,
    config,
  );
}

import axios from 'axios';
import { Issue } from '../models/Issue';
import { Milestone } from '../models/Milestone';
import { Pagination } from '../models/Pagination';

const apiUrl = 'http://gitlab.vitebsk.energo.net';
const token = '-7fdpi5x1xwPy8WWsy-G';

const config = {
  headers: {
    'PRIVATE-TOKEN': token,
  },
};

/**
 * Получить список этапов (спринтов)
 * @param projectId ID проекта
 * @param { perPage, page } Пагинация
 * @returns milestones[] список этапов
 */
export function getMilestones(
  projectId: number,
  { perPage, page }: Pagination,
): Promise<{ data: Milestone[] }> {
  return axios.get(`${apiUrl}/api/v4/projects/${projectId}/milestones`, {
    params: { per_page: perPage, page },
    ...config,
  });
}

/**
 * Редактировать этап
 * @param projectId ID проекта
 * @param milestoneRequest Этап
 * @returns
 */
export function editMilestone(projectId: number, milestoneRequest: Milestone) {
  return axios.put(
    `${apiUrl}/api/v4/projects/${projectId}/milestones/${milestoneRequest.id}`,
    milestoneRequest,
    config,
  );
}

/**
 * Создать этап
 * @param projectId ID этапа
 * @param milestoneRequest Этап
 * @returns
 */
export function createMilestone(
  projectId: number,
  milestoneRequest: Milestone,
): Promise<{ data: Milestone }> {
  return axios.post(`${apiUrl}/api/v4/projects/${projectId}/milestones`, milestoneRequest, config);
}

/**
 * Получить список задач на этап
 * @param projectId ID проекта
 * @param milestoneId ID этапа
 * @returns issues[] список задач
 */
export function getIssues(projectId: number, milestoneId: number): Promise<{ data: Issue[] }> {
  return axios.get(
    `${apiUrl}/api/v4/projects/${projectId}/milestones/${milestoneId}/issues?per_page=100`,
    config,
  );
}

/**
 * Создать задачу
 * @param projectId ID проекта
 * @param issue Задача
 * @returns Созданная задача
 */
export function createIssue(
  projectId: number,
  milestoneId: number,
  issue: Issue,
): Promise<{ data: Issue }> {
  return axios.post(
    `${apiUrl}/api/v4/projects/${projectId}/issues`,
    { milestone_id: milestoneId, ...issue },
    config,
  );
}

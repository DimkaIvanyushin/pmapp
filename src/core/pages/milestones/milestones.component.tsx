import * as React from 'react';
import { Milestones } from './components/milestones/milestones.component';
import { useQuery } from '../../common';
import './milestones.component.scss';

export default function ProjectMilestones() {
  const query = useQuery();
  const projectId = Number(query.get('projectId'));
  return projectId ? <Milestones projectId={projectId} /> : <h3>Проект не найден</h3>;
}

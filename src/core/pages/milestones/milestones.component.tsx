import * as React from 'react';
import { Milestones } from './components/milestones/milestones.component';
import image from '../../../assets/images/bg.svg';
import './milestones.component.scss';

const PROJECT_ID = 261; //180 261

export const ProjectMilestones = () => {
  return (
    <div className='project-contents' style={{ backgroundImage: `url(${image})` }}>
      <h1>Руководитель проекта</h1>
      <p>Создайте новый этап или просмотри существующий</p>
      <Milestones projectId={PROJECT_ID} />
    </div>
  );
};

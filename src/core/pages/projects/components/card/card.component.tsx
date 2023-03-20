import React, { useMemo } from 'react';
import { Project } from '../../../../models';
import bookIcon from '../../../../../assets/images/book.svg';
import starIcon from '../../../../../assets/images/star.svg';
import forkIcon from '../../../../../assets/images/fork.svg';
import cardsIcon from '../../../../../assets/images/cards.svg';
import { timeSince } from '../../../../common/utils';
import './card.component.scss';

type ProjectCardProps = {
  project: Project;
  onClick: (projectId: number) => void;
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const dateString = useMemo(
    () => `${timeSince(new Date(project.last_activity_at))} назад`,
    [project],
  );

  return (
    <div className='project-card' onClick={() => onClick(project.id)}>
      <div className='project-card-row'>
        <div className='title'>
          <img src={bookIcon} alt='book svg' />
          {project.name}
        </div>
        <div className='actions'>
          <div className='item'>
            <img src={starIcon} alt='star' /> {project.star_count}
          </div>
          <div className='item'>
            <img src={forkIcon} alt='fork' /> {project.forks_count}
          </div>
          <div className='item'>
            <img src={cardsIcon} alt='card' /> {project.open_issues_count}
          </div>
        </div>
      </div>
      <div className='project-card-row'>
        <div className='description'>{project.description}</div>
      </div>
      <div className='project-card-row'>
        <div className='group'>{project.path_with_namespace}</div>
        <div className='date'> {dateString}</div>
      </div>
    </div>
  );
}

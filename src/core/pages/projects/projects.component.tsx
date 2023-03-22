import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from '../../common/routes';
import { Status } from '../../models';
import { ProjectCard } from './components/card/card.component';
import { LoadingIcon } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getProjectsAsync,
  selectProjects,
  selectProjectsStatus,
} from '../../store/features/projects/projects-slice';
import './projects.component.scss';

export default function Projects() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const projectsStatus = useAppSelector(selectProjectsStatus);
  const projects = useAppSelector(selectProjects);

  useEffect(() => {
    if (!projects.length) {
      dispatch(getProjectsAsync());
    }
  }, []);

  function handleOnClick(projectId: number) {
    navigate(generateUrl(projectId));
  }

  return (
    <div className='project-contents'>
    
      {projectsStatus === Status.LOADING && <LoadingIcon />}

      {projects.map((project) => (
        <ProjectCard key={project.id} onClick={handleOnClick} project={project} />
      ))}
    </div>
  );
}

function generateUrl(projectId: number) {
  return {
    pathname: RoutesPath.HOME + RoutesPath.MILESTONE,
    search: `projectId=${projectId}`,
  };
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from '../../common/routes';
import { Project } from '../../models';
import { ProjectCard } from './components/card/card.component';
import './projects.component.scss';
import { LoadingIcon } from '../../components';
import { getProjects } from '../../api/api';

function generateUrl(projectId: number) {
  return {
    pathname: RoutesPath.HOME + RoutesPath.MILESTONE,
    search: `projectId=${projectId}`,
  };
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    setLoading(true);

    getProjects(signal)
      .then((projectResponse) => setProjects(projectResponse.data))
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, []);

  function handleOnClick(projectId: number) {
    navigate(generateUrl(projectId));
  }

  return (
    <div className='project-contents'>
      {loading && <LoadingIcon />}

      {projects.map((project) => (
        <ProjectCard key={project.id} onClick={handleOnClick} project={project} />
      ))}
    </div>
  );
}

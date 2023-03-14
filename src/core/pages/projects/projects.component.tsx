import * as React from 'react';
import { Link } from 'react-router-dom';
import { RoutesPath } from '../../common/routes';

function generateUrl(projectId: number) {
  return {
    pathname: RoutesPath.HOME + RoutesPath.MILESTONE,
    search: `projectId=${projectId}`,
  };
}

export default function Projects() {
  return (
    <div className='project-contents'>
      <h2>Projects</h2>
      <ul>
        <li>
          <Link to={generateUrl(117)}>Doxit</Link>
        </li>
        <li>
          <Link to={generateUrl(180)}>ИАС</Link>
        </li>
      </ul>
    </div>
  );
}

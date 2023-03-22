import { Project } from '../../../models';
import { Status } from '../../../models/status';
import projectsReducer, { addProject, ProjectsState } from './projects-slice';

describe('Projects reducer', () => {
  const initialState: ProjectsState = {
    projects: {
      allIds: [],
      byId: {},
    },
    status: Status.LOADING,
  };

  it('add project', () => {
    const project: Partial<Project> = { id: 1, name: 'Project 1' };
    const actual = projectsReducer(initialState, addProject(project as Project));
    expect(actual.status).toEqual(Status.SUCCESS);
    expect(actual.projects.allIds.length).toEqual(1);
    expect(actual.projects.byId[(project as Project).id].name).toEqual('Project 1');
  });
});

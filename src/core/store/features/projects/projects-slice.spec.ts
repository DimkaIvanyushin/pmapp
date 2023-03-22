import { Project } from '../../../models';
import { Status } from '../../../models/status';
import projectsReducer, { addProject, getProjectsAsync, ProjectsState } from './projects-slice';

describe('Projects reducer', () => {
  const initialState: ProjectsState = {
    projects: {
      allIds: [],
      byId: {},
    },
    status: Status.LOADING,
  };

  it('get projects', () => {
    const projectsPartial: Partial<Project>[] = [
      { id: 1, name: 'Project 1' },
      { id: 2, name: 'Project 2' },
    ];
    const projects = projectsPartial as Project[];

    const getProjectsAction = getProjectsAsync.fulfilled(projects, '');
    const actual = projectsReducer({ ...initialState }, getProjectsAction);
    expect(actual.status).toEqual(Status.SUCCESS);
    expect(actual.projects.allIds.length).toEqual(2);
    expect(actual.projects.byId[projects[0].id].name).toEqual(projects[0].name);
  });

  it('add project', () => {
    const project: Partial<Project> = { id: 1, name: 'Project 1' };
    const actual = projectsReducer(initialState, addProject(project as Project));
    expect(actual.status).toEqual(Status.SUCCESS);
    expect(actual.projects.allIds.length).toEqual(1);
    expect(actual.projects.byId[(project as Project).id].name).toEqual('Project 1');
  });
});

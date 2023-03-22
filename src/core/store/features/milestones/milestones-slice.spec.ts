import { Milestone, Project } from '../../../models';
import { Status } from '../../../models/status';
import milestonesReducer, {
  addMilestone,
  createMilestoneAsync,
  editMilestoneAsync,
  getMilestonesAsync,
  MilestonesState,
} from './milestones-slice';

describe('Milestones reducer', () => {
  const projectPartial: Partial<Project> = { id: 1, name: 'Project 1' };
  const project = projectPartial as Project;
  const initialState: MilestonesState = {
    milestones: {
      allIds: [],
      byId: {},
    },
    status: Status.LOADING,
  };

  it('get milestones', () => {
    const milestonesPartial: Partial<Milestone>[] = [
      { id: 1, title: 'Title 1' },
      { id: 2, title: 'Title 2' },
    ];
    const milestones = milestonesPartial as Milestone[];

    const getMilestonesAction = getMilestonesAsync.fulfilled(milestones, '', {
      projectId: project.id,
      pagination: { page: 1, perPage: 5 },
    });

    const actual = milestonesReducer({ ...initialState }, getMilestonesAction);
    expect(actual.milestones.allIds.length).toEqual(2);
    expect(actual.milestones.byId[milestones[0].id].title).toEqual(milestones[0].title);
    expect(actual.milestones.byId[milestones[1].id].title).toEqual(milestones[1].title);
    expect(actual.status).toEqual(Status.SUCCESS);
  });

  it('add milestone', () => {
    const milestone: Partial<Milestone> = { id: 1, title: 'Title' };
    const actual = milestonesReducer({ ...initialState }, addMilestone(milestone as Milestone));
    expect(actual.status).toEqual(Status.SUCCESS);
    expect(actual.milestones.allIds.length).toEqual(1);
    expect(actual.milestones.byId[(milestone as Milestone).id].title).toEqual('Title');
  });

  it('create milestone', async () => {
    const milestonePartial: Partial<Milestone> = { id: 2, title: 'Title 2' };
    const milestone = milestonePartial as Milestone;

    const createMilestoneAction = createMilestoneAsync.fulfilled(milestone, '', {
      projectId: project.id,
      milestone,
    });

    const actual = milestonesReducer({ ...initialState }, createMilestoneAction);
    expect(actual.milestones.allIds.length).toEqual(1);
  });

  it('edit milestone', async () => {
    const milestonePartial: Partial<Milestone> = { id: 1, title: 'Title' };
    const milestone = milestonePartial as Milestone;

    const state: MilestonesState = {
      milestones: {
        byId: {
          [milestone.id]: milestone,
        },
        allIds: [milestone.id],
      },
      status: Status.SUCCESS,
    };

    const editMilestoneAction = editMilestoneAsync.fulfilled(
      { ...milestone, title: 'New title' },
      '',
      {
        projectId: project.id,
        milestone,
      },
    );

    const actual = milestonesReducer({ ...state }, editMilestoneAction);
    expect(actual.milestones.allIds.length).toEqual(1);
    expect(actual.milestones.byId[milestone.id].title).toEqual('New title');
  });
});

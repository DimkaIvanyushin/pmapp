import React, { useEffect, useState, useMemo } from 'react';
import { Progress } from '../../dumb/progress/Progress';
import { Avatar } from '../../dumb/avatar/Avatar';
import { AvatarGroup } from '../../dumb/avatarGroup/AvatarGroup';
import * as Model from '../../../models/Milestone';
import { User } from '../../../models/User';
import { Issue } from '../../../models/Issue';
import { Collapse } from '../../dumb/collapse/Collapse';
import { Boards } from '../../dumb/boards/Boards';
import { Board } from '../../dumb/board/Board';
import { getIssues } from '../../../api/Api';
import './Milestone.scss';

type MilestoneProps = {
  projectId: number;
  milestone: Model.Milestone;
};

type MilestoneHeaderProps = {
  issues: MilestoneBodyProps;
  milestone: Model.Milestone;
};

type MilestoneBodyProps = {
  openIssues: Issue[];
  testsIssues: Issue[];
  closedIssues: Issue[];
};

export function Milestone({ milestone, projectId }: MilestoneProps) {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    getIssues(projectId, milestone.id).then((response) => setIssues(response.data));
  }, [milestone]);

  const issuesProps = useMemo(() => {
    return {
      openIssues: issues.filter((issue) => issue.labels.includes('To Do')),
      testsIssues: issues.filter(
        (issue) => issue.labels.includes('Testing') && issue.state !== 'closed',
      ),
      closedIssues: issues.filter((issue) => issue.state === 'closed'),
    } as MilestoneBodyProps;
  }, [issues]);

  return (
    <Collapse>
      <MilestoneHeader issues={issuesProps} milestone={milestone} />
      <MilestoneBody issues={issuesProps} />
    </Collapse>
  );
}

export function MilestoneHeader({
  issues: { closedIssues = [], openIssues = [], testsIssues = [] },
  milestone,
}: MilestoneHeaderProps) {
  const allIssues = [...closedIssues, ...openIssues, ...testsIssues];
  const percent = Math.round((closedIssues.length / allIssues.length || 0) * 100);
  const assignees = useMemo(() => getUniqUsers(allIssues), [allIssues]);
  const usersAvatar = assignees.map((user) => <Avatar key={user.id} src={user.avatar_url} />);

  return (
    <div className='milestone-header'>
      <div className='milestone-header-first'>
        <span className='title'>{milestone?.title}</span>
      </div>
      <div className='milestone-header-last'>
        <AvatarGroup max={3}>{usersAvatar}</AvatarGroup>
        <Progress percent={percent}>
          <TasksLabel close={closedIssues.length} all={allIssues.length} />
        </Progress>
      </div>
    </div>
  );
}

function MilestoneBody({
  issues: { closedIssues, openIssues, testsIssues },
}: {
  issues: MilestoneBodyProps;
}) {
  return (
    <div className='milestone-body'>
      <Boards>
        <Board title='Открытые' issues={openIssues} />
        <Board title='Тестирование' type={'debug'} issues={testsIssues} />
        <Board title='Выполненные' type={'success'} issues={closedIssues} />
      </Boards>
    </div>
  );
}

function TasksLabel({ close, all }: { close: number; all: number }) {
  return (
    <span>
      Задачи:&nbsp;
      <span className='bold'>
        {close}/{all}
      </span>
    </span>
  );
}

function getUniqUsers(issues: Issue[]): User[] {
  const usersMap = new Map<number, User>();
  issues.forEach((issue) => usersMap.set(issue.assignee.id, issue.assignee));
  return [...usersMap].map(([, value]) => value);
}

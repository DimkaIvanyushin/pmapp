import React, { useEffect, useState } from 'react';
import { Progress } from '../progress/Progress';
import { Avatar } from '../avatar/Avatar';
import { AvatarGroup } from '../avatarGroup/AvatarGroup';
import * as Model from '../../../models/Milestone';
import { User } from '../../../models/User';
import { Issue } from '../../../models/Issue';
import { Collapse } from '../collapse/Collapse';
import { Boards } from '../boards/Boards';
import { Board } from '../board/Board';
import { getIssues } from '../../../api/Api';
import './Milestone.scss';

type MilestoneProps = {
  projectId: number;
  milestone: Model.Milestone;
};

type MilestoneHeaderProps = {
  issues: Issue[];
  milestone: Model.Milestone;
};

export function Milestone({ milestone, projectId }: MilestoneProps) {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    getIssues(projectId, milestone.id).then((response) => {
      setIssues(response.data);
    });
  }, [milestone]);

  return (
    <Collapse>
      <MilestoneHeader issues={issues} milestone={milestone} />
      <MilestoneBody issues={issues} />
    </Collapse>
  );
}


export function MilestoneHeader({ issues, milestone }: MilestoneHeaderProps) {
  const closedIssue = issues.filter((issue) => issue.state === 'closed');

  const percent = (closedIssue.length / issues.length) * 100;
  const assignees = getUniqUsers(issues);
  const usersAvatar = assignees.map((user) => <Avatar key={user.id} src={user.avatar_url} />);

  return (
    <div className='milestone-header'>
      <div className='milestone-header-first'>
        <Progress percent={percent} type='circle' />
        <span className='title'>{milestone?.title}</span>
      </div>
      <div className='milestone-header-last'>
        <AvatarGroup max={3}>{usersAvatar}</AvatarGroup>
        <Progress percent={percent}>
          <TasksLabel close={closedIssue.length} all={issues.length} />
        </Progress>
      </div>
    </div>
  );
}

function MilestoneBody({ issues }: { issues: Issue[] }) {
  const openIssues = issues.filter((issue) => issue.labels.includes('To Do'));
  const testsIssues = issues.filter((issue) => issue.labels.includes('Testing'));
  const closedIssues = issues.filter((issue) => issue.state === 'closed');

  return (
    <div className='milestone-body'>
      <Boards>
        <Board title='Открытые' issues={openIssues} />
        <Board title='Тестирование' type={'debug'} issues={testsIssues} />
        <Board title='Выполненые' type={'success'} issues={closedIssues} />
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

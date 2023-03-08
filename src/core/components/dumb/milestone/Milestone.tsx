import React, { useEffect, useState } from 'react';
import './Milestone.scss';
import { Progress } from '../progress/Progress';
import { Avatar } from '../avatar/Avatar';
import { AvatarGroup } from '../avatarGroup/AvatarGroup';
import iconPlus from '../../../../assets/images/plus.svg';
import * as Model from '../../../models/Milestone';
import { User } from '../../../models/User';
import { Issue } from '../../../models/Issue';
import { Collapse } from '../collapse/Collapse';
import { Boards } from '../boards/Boards';
import { Board } from '../board/Board';

type MilestoneProps = {
  type?: 'create' | 'default';
  milestone?: Model.Milestone;
};

type MilstoneHeaderProps = {
  closedIssue: Issue[];
  milestone: Model.Milestone;
};

export function Milestone({ milestone, type = 'default' }: MilestoneProps) {
  if (type === 'create' && !milestone) {
    return (
      <div className='milestone-header create'>
        <div className='milestone-header-first'>
          <img src={iconPlus} alt='icon' />
          <span className='title'>Создать новый этап</span>
        </div>
      </div>
    );
  }
  if (!milestone) return <div>Этапа нет!</div>;

  const issues = milestone?.issues || [];
  const closedIssue = issues.filter((issue) => issue.state === 'closed');

  return (
    <Collapse>
      <MilestoneHeader closedIssue={closedIssue} milestone={milestone} />
      <MilestoneBody milestone={milestone} />
    </Collapse>
  );
}

function MilestoneHeader({ closedIssue, milestone }: MilstoneHeaderProps) {
  const percent = (closedIssue.length / milestone.issues.length) * 100;
  const assignees = getUniqUsers(milestone.issues);
  const usersAvatar = assignees.map((user) => <Avatar key={user.id} src={user.avatar_url} />);

  return (
    <div className='milestone-header'>
      <div className='milestone-header-first'>
        <Progress percent={percent} type='circle' />
        <span className='title'>{milestone?.title}</span>
      </div>
      <div className='milestone-header-last'>
        <AvatarGroup>{usersAvatar}</AvatarGroup>
        <Progress percent={percent}>
          <TasksLabel close={closedIssue.length} all={milestone.issues.length} />
        </Progress>
      </div>
    </div>
  );
}

function MilestoneBody({ milestone }: { milestone: Model.Milestone }) {
  const openIssues = milestone.issues.filter((issue) => issue.labels.includes('To Do'));
  const testsIssues = milestone.issues.filter((issue) => issue.labels.includes('Testing'));
  const closedIssues = milestone.issues.filter((issue) => issue.state === 'closed');

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

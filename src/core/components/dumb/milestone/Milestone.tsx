import React, { useEffect, useState } from 'react';
import './Milestone.scss';
import { Progress } from '../progress/Progress';
import { Avatar } from '../avatar/Avatar';
import { AvatarGroup } from '../avatar-group/AvatarGroup';
import iconPlus from '../../../../assets/images/plus.svg';
import * as Model from '../../../models/Milestone';
import { User } from '../../../models/User';
import { Issue } from '../../../models/Issue';

type MilestoneProps = {
  type?: 'create' | 'default';
  milestone?: Model.Milestone;
};

const getUniqUsers = (issues: Issue[]): User[] => {
  const usersMap = new Map<number, User>();
  issues.forEach((issue) => {
    usersMap.set(issue.assignee.id, issue.assignee);
  });

  return [...usersMap].map(([key, value]) => value);
};

export function Milestone({ milestone, type = 'default' }: MilestoneProps) {
  if (type === 'create') {
    return (
      <div className='milestone create'>
        <div className='milestone-first'>
          <img src={iconPlus} alt='icon' />
          <span className='title'>Создать новый этап</span>
        </div>
      </div>
    );
  }

  const issues = milestone?.issues || [];
  const closedIssue = issues.filter((issue) => issue.state === 'closed');
  const percent = (closedIssue.length / issues.length) * 100;
  const assignees = getUniqUsers(issues);

  const usersAvatar = assignees.map((user) => <Avatar key={user.id} src={user.avatar_url} />);

  return (
    <div className='milestone'>
      <div className='milestone-first'>
        <Progress percent={percent} type='circle' />
        <span className='title'>{milestone?.title}</span>
      </div>
      <div className='milestone-last'>
        <AvatarGroup>{usersAvatar}</AvatarGroup>

        <Progress percent={percent}>
          <TasksLabel close={closedIssue.length} all={issues.length} />
        </Progress>
      </div>
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

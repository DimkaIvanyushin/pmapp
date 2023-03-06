import React, { useEffect, useState } from 'react';
import './Milestone.scss';
import { Progress } from '../progress/Progress';
import { Avatar } from '../avatar/Avatar';
import { AvatarGroup } from '../avatar-group/AvatarGroup';
import iconPlus from '../../../../assets/images/plus.svg';
import * as Model from '../../../models/Milestone';
import { User } from '../../../models/User';
import { Issue } from '../../../models/Issue';
import { Collapse } from '../collapse/Collapse';
import { Card } from '../card/Card';

type MilestoneProps = {
  type?: 'create' | 'default';
  milestone?: Model.Milestone;
};

const getUniqUsers = (issues: Issue[]): User[] => {
  const usersMap = new Map<number, User>();
  issues.forEach((issue) => usersMap.set(issue.assignee.id, issue.assignee));
  return [...usersMap].map(([, value]) => value);
};

export function Milestone({ milestone, type = 'default' }: MilestoneProps) {
  if (type === 'create') {
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

function MilestoneHeader({
  closedIssue,
  milestone,
}: {
  closedIssue: Issue[];
  milestone: Model.Milestone;
}) {
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
  return (
    <div>
      <Card
        text={
          'Разнообразный и богатый опыт реализация намеченных плановых заданий требуют определения и уточнения новых предложений. Не следует, однако забывать'
        }
        id='1425'
        avatarSrc={'https://joesch.moe/api/v1/random?key=3'}
        type={'success'}
        date={'05.02.2023'}
      />
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

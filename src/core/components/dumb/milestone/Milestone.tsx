import * as React from 'react';
import './Milestone.scss';
import { Progress } from '../progress/Progress';
import { Avatar } from '../avatar/Avatar';
import { AvatarGroup } from '../avatar-group/AvatarGroup';
import iconPlus from '../../../../assets/images/plus.svg';

type MilestoneProps = {
  type?: 'create' | 'default';
  title?: string;
  percent?: number;
};

export const Milestone = ({ type = 'default', percent = 0, title }: MilestoneProps) => {
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

  return (
    <div className='milestone'>
      <div className='milestone-first'>
        <Progress percent={percent} type='circle' />
        <span className='title'>{title}</span>
      </div>
      <div className='milestone-last'>
        <AvatarGroup>
          <Avatar src='https://joesch.moe/api/v1/random?key=3' />
          <Avatar src='https://joesch.moe/api/v1/random?key=4' />
          <Avatar src='https://joesch.moe/api/v1/random?key=5' />
        </AvatarGroup>

        <Progress percent={percent}>
          <span>Задачи: 30</span>
        </Progress>
      </div>
    </div>
  );
};

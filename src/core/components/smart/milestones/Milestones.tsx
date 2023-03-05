import * as React from 'react';
import './Milestones.scss';
import { Milestone } from '../../dumb/milestone/Milestone';

export const Milestones = () => {
  return (
    <div className='milestones'>
      <Milestone type='create' />
      <Milestone title='v_1.41' percent={30} />
      <Milestone title='v_1.42'percent={100} />
    </div>
  );
};

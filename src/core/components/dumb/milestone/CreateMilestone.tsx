import React from 'react';
import iconPlus from '../../../../assets/images/plus.svg';
import './Milestone.scss';

export function CreateMilestone() {
  return (
    <div className='milestone-header create'>
      <div className='milestone-header-first'>
        <img src={iconPlus} alt='icon' />
        <span className='title'>Создать новый этап</span>
      </div>
    </div>
  );
}

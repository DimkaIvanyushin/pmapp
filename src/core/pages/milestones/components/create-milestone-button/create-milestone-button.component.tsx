import React from 'react';
import iconPlus from '../../../../../assets/images/plus.svg';
import { Strings } from '../../../../common';

type CreateMilestoneProps = {
  onClick: () => void;
};

export function CreateMilestoneButton({ onClick }: CreateMilestoneProps) {
  return (
    <div className='milestone-header create' onClick={onClick}>
      <div className='milestone-header-first'>
        <img src={iconPlus} alt='icon' />
        <span className='title'>{Strings.createMilestone}</span>
      </div>
    </div>
  );
}

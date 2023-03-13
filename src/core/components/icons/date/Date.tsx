import React from 'react';
import dateStartIcon from '../../../../assets/images/date-start.svg';
import dateEndIcon from '../../../../assets/images/date-end.svg';
import './Date.scss';

type DateIconProps = {
  text?: string;
  type?: 'start' | 'end';
};

export function DateIcon({ text, type = 'start' }: DateIconProps) {
  return (
    <div className='pm-icon date'>
      <img src={type === 'start' ? dateStartIcon : dateEndIcon} alt='date icon' />
      {text && <span>{text}</span>}
    </div>
  );
}

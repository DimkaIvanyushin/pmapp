import React from 'react';
import emptyImage from '../../../../assets/images/empty.svg';
import './Empty.scss';

type EmptryProps = {
  text?: string;
};

export function Empty({ text = 'Нет записей' }: EmptryProps) {
  return (
    <div className='empty'>
      <img src={emptyImage} alt='empty' />
      <span>{text}</span>
    </div>
  );
}

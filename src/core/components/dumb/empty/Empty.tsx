import React from 'react';
import emptyImage from '../../../../assets/images/empty.svg';
import './Empty.scss';

type EmptyProps = {
  text?: string;
};

export function Empty({ text = 'Нет записей' }: EmptyProps) {
  return (
    <div className='empty'>
      <img src={emptyImage} alt='empty' />
      <span>{text}</span>
    </div>
  );
}

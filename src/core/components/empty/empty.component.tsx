import React from 'react';
import emptyImage from '../../../assets/images/empty.svg';
import './empty.component.scss';
import { Strings } from '../../common';

type EmptyProps = {
  text?: string;
};

export function Empty({ text = Strings.empty }: EmptyProps) {
  return (
    <div className='empty'>
      <img src={emptyImage} alt='empty' />
      <span>{text}</span>
    </div>
  );
}

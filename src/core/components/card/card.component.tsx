import React from 'react';
import { Avatar } from '../avatar/avatar.component';
import successIcon from '../../../assets/images/success-glif.svg';
import debugIcon from '../../../assets/images/debug-glif.svg';
import dateIcon from '../../../assets/images/date-glif.svg';
import './card.component.scss';

type CardProps = {
  text: string;
  id?: number;
  date?: string;
  type?: 'debug' | 'success';
  avatarSrc?: string;
};

export function Card({ avatarSrc, id, date, text, type }: CardProps) {
  return (
    <div className='card'>
      <div className='body'>{text}</div>
      <div className='footer'>
        <div className='left bold'>#{id}</div>
        <div className='right'>
          {date && <DateCard date={date} />}
          {avatarSrc && <Avatar src={avatarSrc} />}
        </div>
      </div>

      {type && <IconTypeCard type={type} />}
    </div>
  );
}

function DateCard({ date }: { date: string }) {
  return (
    <div className='date-card'>
      <img src={dateIcon} alt='date glif' />
      {date}
    </div>
  );
}

function IconTypeCard({ type }: { type: 'debug' | 'success' }) {
  const iconType = {
    debug: debugIcon,
    success: successIcon,
  };

  return (
    <div className='glif'>
      <img src={iconType[type]} alt='glif' />
    </div>
  );
}

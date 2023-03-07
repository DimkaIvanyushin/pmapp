import React from 'react';
import { Avatar } from '../avatar/Avatar';
import './Card.scss';

import successGlif from '../../../../assets/images/success-glif.svg';
import debugGlif from '../../../../assets/images/debug-glif.svg';
import dateGlif from '../../../../assets/images/date-glif.svg';

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

      {type && <GlifCard type={type} />}
    </div>
  );
}

function DateCard({ date }: { date: string }) {
  return (
    <div className='dateCard'>
      <img src={dateGlif} alt='date glif' />
      {date}
    </div>
  );
}

function GlifCard({ type }: { type: 'debug' | 'success' }) {
  const glifType = {
    debug: debugGlif,
    success: successGlif,
  };

  return (
    <div className='glif'>
      <img src={glifType[type]} alt='glif' />
    </div>
  );
}

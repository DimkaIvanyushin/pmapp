import * as React from 'react';
import './Avatar.scss';

type AvatarProps = {
  src: string;
};

export const Avatar = ({ src }: AvatarProps) => {
  return (
    <div className='avatar'>
      <img src={src} alt='avatar' />
    </div>
  );
};

import * as React from 'react';
import './Avatar.scss';
import userIcon from '../../../../assets/images/user.svg';

type AvatarProps = {
  src?: string;
  text?: string;
  backgroundColor?: string;
  color?: string;
};

export const Avatar = ({ src, text, backgroundColor = '#e1e4e', color = '#fff' }: AvatarProps) => {
  return (
    <div className='avatar' style={{ backgroundColor, color }}>
      {text ? (
        <span>{text}</span>
      ) : (
        <img
          src={src}
          alt='avatar'
          onError={({ currentTarget }) => (currentTarget.src = userIcon)}
        />
      )}
    </div>
  );
};

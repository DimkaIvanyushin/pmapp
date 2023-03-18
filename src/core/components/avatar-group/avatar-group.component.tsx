import * as React from 'react';
import './avatar-group.component.scss';
import { Avatar } from '../avatar/avatar.component';

type AvatarGroupProps = {
  children: JSX.Element[];
  max?: number;
};

export const AvatarGroup = ({ children, max = 3 }: AvatarGroupProps) => {
  const isMore = children.length > max;
  return (
    <div className='avatar-group'>
      {children.slice(0, max)}{' '}
      {isMore && <Avatar text={`${children.length}`} backgroundColor={'#0366D6'} />}
    </div>
  );
};

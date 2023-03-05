import * as React from 'react';
import './AvatarGroup.scss';

type AvatarGroupProps = {
  children: JSX.Element[];
};

export const AvatarGroup = ({ children }: AvatarGroupProps) => {
  return <div className='avatar-group'>{children}</div>;
};

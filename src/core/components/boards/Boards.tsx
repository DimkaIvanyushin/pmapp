import React from 'react';
import './Boards.scss';

type BoardsProps = {
  children: JSX.Element[];
};

export function Boards({ children }: BoardsProps) {
  return <div className='boards'>{children}</div>;
}

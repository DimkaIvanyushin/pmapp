import React from 'react';
import './Row.scss';

type RowProps = {
  children: JSX.Element[] | JSX.Element;
};

export function Row({ children }: RowProps) {
  return <div className='row'>{children}</div>;
}

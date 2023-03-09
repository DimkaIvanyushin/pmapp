import * as React from 'react';
import './Progress.scss';

type ProgressProps = {
  percent: number;
  children?: JSX.Element;
};

export const Progress = ({ children, percent = 0 }: ProgressProps) => {
  return (
    <div className='progress-container'>
      <div
        className={`progress ${percent === 100 && 'complete'}`}
        style={{ width: `${percent}%` }}
      ></div>
      <div className='description'>
        <div className='content'>{children}</div>
        <div className='percent'>
          <span>{percent}%</span>
        </div>
      </div>
    </div>
  );
};

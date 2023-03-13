import * as React from 'react';
import './progress.component.scss';

type ProgressProps = {
  percent: number;
  extraPercent?: number;
  children?: JSX.Element;
};

export const Progress = ({ children, percent = 0, extraPercent = 70 }: ProgressProps) => {
  return (
    <div className='progress-container'>
      <div className={`progress complete`} style={{ width: `${percent}%` }}></div>
      <div className={`progress extra-percent`} style={{ width: `${extraPercent}%` }}></div>

      <div className='description'>
        {children}
        <div className='percent bold'>
          <span>{percent}%</span>
        </div>
      </div>
    </div>
  );
};

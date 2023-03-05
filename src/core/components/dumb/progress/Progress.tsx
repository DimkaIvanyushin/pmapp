import * as React from 'react';
import './Progress.scss';
import successIcon from '../../../../assets/images/success.svg';

type ProgressProps = {
  percent: number;
  children?: JSX.Element;
  type?: 'circle' | 'inline';
};

export const Progress = ({ children, percent = 0, type = 'inline' }: ProgressProps) => {
  if (type === 'circle') {
    if (percent === 100) {
      return <img src={successIcon} alt='success icon' />;
    }

    return <span></span>;
  }

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

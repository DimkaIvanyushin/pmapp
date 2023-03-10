import React, { useState } from 'react';
import './Tooltip.scss';

type TooltipProps = {
  text: string;
  children: JSX.Element;
};

export function Tooltip({ text, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className='tooltip-container'>
      {visible && (
        <div className='tooltip'>
          <div className='message'>{text}</div>
        </div>
      )}

      <div
        className='content'
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>
    </div>
  );
}

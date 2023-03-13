import React, { useState } from 'react';

type CollapseProps = {
  children: [JSX.Element, JSX.Element];
};

export function Collapse({ children }: CollapseProps) {
  const [show, setShow] = useState(false);

  function handleClick() {
    setShow(!show);
  }

  return (
    <div className='collapse'>
      <div className='header' onClick={handleClick}>
        {children[0]}
      </div>
      {show && <div className='body'>{children[1]}</div>}
    </div>
  );
}

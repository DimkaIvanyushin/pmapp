import React from 'react';
import './form-group.component.scss';

type FormGroupProps = {
  children: JSX.Element[] | JSX.Element;
};

export function FormGroup({ children }: FormGroupProps) {
  return <div className='form-group'>{children}</div>;
}

import React from 'react';
import './Input.scss';
import { InputProps } from './Input';

type TextAreaProps = {
  rows?: number;
} & InputProps;

export function TextArea({ placeholder, name, rows = 3 }: TextAreaProps) {
  return <textarea rows={rows} name={name} className='pm-input' placeholder={placeholder} />;
}

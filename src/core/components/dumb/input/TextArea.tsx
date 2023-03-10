import React from 'react';
import './Input.scss';
import { InputProps } from './Input';
import { useAutoFocus } from '../../../src/AutoFocus';

type TextAreaProps = {
  rows?: number;
} & InputProps;

export function TextArea({ placeholder, name, rows = 3, autofocus }: TextAreaProps) {
  const inputElement = useAutoFocus<HTMLTextAreaElement>(autofocus || false);

  return (
    <textarea
      rows={rows}
      name={name}
      className='pm-input'
      placeholder={placeholder}
      ref={inputElement}
    />
  );
}

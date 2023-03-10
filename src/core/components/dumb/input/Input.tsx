import React from 'react';
import { useAutoFocus } from '../../../src/AutoFocus';
import './Input.scss';

export type InputProps = {
  name?: string;
  placeholder?: string;
  autofocus?: boolean;
};

export function Input({ placeholder, name, autofocus }: InputProps) {
  const inputElement = useAutoFocus<HTMLInputElement>(autofocus || false);

  return (
    <input
      name={name}
      className='pm-input'
      type='text'
      placeholder={placeholder}
      ref={inputElement}
    />
  );
}

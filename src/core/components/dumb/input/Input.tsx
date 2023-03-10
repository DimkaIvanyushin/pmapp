import React from 'react';
import { useAutoFocus } from '../../../src/AutoFocus';
import './Input.scss';

export type InputProps = {
  name?: string;
  placeholder?: string;
  autofocus?: boolean;
  required?: boolean;
  defaultValue?: string;
};

export function Input(props: InputProps) {
  const inputElement = useAutoFocus<HTMLInputElement>(props.autofocus || false);

  return (
    <input
      name={props.name}
      required={props.required}
      defaultValue={props?.defaultValue}
      className='pm-input'
      type='text'
      placeholder={props.placeholder}
      ref={inputElement}
    />
  );
}

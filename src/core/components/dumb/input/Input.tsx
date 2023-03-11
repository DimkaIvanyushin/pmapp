import React from 'react';
import { useAutoFocus } from '../../../src/AutoFocus';
import './Input.scss';

export type InputProps = {
  name?: string;
  placeholder?: string;
  autofocus?: boolean;
  value?: string;
  required?: boolean;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement  | HTMLTextAreaElement>;
};

export function Input(props: InputProps) {
  const inputElement = useAutoFocus<HTMLInputElement>(props.autofocus || false);

  return (
    <input
      onChange={props.onChange}
      name={props.name}
      value={props.value}
      required={props.required}
      defaultValue={props?.defaultValue}
      className='pm-input'
      type='text'
      placeholder={props.placeholder}
      ref={inputElement}
    />
  );
}

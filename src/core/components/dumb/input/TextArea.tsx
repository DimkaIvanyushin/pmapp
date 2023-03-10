import React from 'react';
import './Input.scss';
import { InputProps } from './Input';
import { useAutoFocus } from '../../../src/AutoFocus';

type TextAreaProps = {
  rows?: number;
} & InputProps;

export function TextArea(props: TextAreaProps) {
  const inputElement = useAutoFocus<HTMLTextAreaElement>(props.autofocus || false);
  return (
    <textarea
      rows={props?.rows ?? 3}
      name={props.name}
      defaultValue={props?.defaultValue}
      required={props.required}
      className='pm-input'
      placeholder={props.placeholder}
      ref={inputElement}
    />
  );
}

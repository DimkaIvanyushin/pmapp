import React from 'react';
import './input.component.scss';
import { InputProps } from './input.component';
import { useAutoFocus } from '../../common/auto-focus';

type TextAreaProps = {
  rows?: number;
} & InputProps;

export function TextArea(props: TextAreaProps) {
  const inputElement = useAutoFocus<HTMLTextAreaElement>(props.autofocus || false);
  return (
    <textarea
      onChange={props?.onChange}
      value={props?.value}
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

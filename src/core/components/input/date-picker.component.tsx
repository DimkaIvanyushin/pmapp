import React from 'react';
import './input.component.scss';
import { InputProps } from './input.component';

export type DatePickerProps = {
  min?: string; // Формат'2018-01-01'
  max?: string;
} & InputProps;

export function DatePicker(props: DatePickerProps) {
  return (
    <input
      name={props.name}
      className='pm-input'
      type='date'
      id='start'
      value={props.value}
      onChange={props.onChange}
      min={props.min}
      max={props.max}
      defaultValue={props.defaultValue}
    />
  );
}

import React from 'react';
import './Input.scss';
import { InputProps } from './Input';

export type DatePickerProps = {
  min?: string; // Формат'2018-01-01'
  max?: string;
} & InputProps;

export function DatePicker({ name, min, max }: DatePickerProps) {
  return <input name={name} className='pm-input' type='date' id='start' min={min} max={max} />;
}

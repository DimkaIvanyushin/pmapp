import React from 'react';
import './Input.scss';

export type InputProps = {
  name?: string;
  placeholder?: string;
};

export function Input({ placeholder, name }: InputProps) {
  return <input name={name} className='pm-input' type='text' placeholder={placeholder} />;
}


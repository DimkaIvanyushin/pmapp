import React from 'react';
import './Input.scss';

type InputProps = {
  placeholder?: string;
};

export function Input({ placeholder }: InputProps) {
  return <input className='pm-input' type='text' placeholder={placeholder} />;
}

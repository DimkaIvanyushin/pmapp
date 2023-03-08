import React from 'react';
import './Label.scss';

type LabelProps = {
  children?: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
};

export function Label({ required, children, htmlFor }: LabelProps) {
  const classList = `${required && 'required'}`;
  return (
    <label className={classList} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

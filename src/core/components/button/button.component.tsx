import React from 'react';
import { LoadingIcon } from '../icons/loading/loading.component';
import './button.component.scss';

type ButtonProps = {
  children?: React.ReactNode;
  type?: 'primary' | 'default' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
};

export function Button({ children, type = 'default', loading, disabled, onClick }: ButtonProps) {
  const className = `pm-button ${type} ${(disabled || loading) && 'disabled'}`;
  return (
    <button className={className} onClick={onClick}>
      {loading && <LoadingIcon />}
      {children}
    </button>
  );
}

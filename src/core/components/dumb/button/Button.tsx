import React from 'react';
import './Button.scss';
import { LoadingIcon } from '../icons/loading/Loading';

type ButtonProps = {
  children?: React.ReactNode;
  type?: 'primary' | 'default' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => Promise<void> | void;
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

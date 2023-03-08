import React from 'react';

type FormGroupProps = {
  children: JSX.Element[] | JSX.Element;
};

export function FormGroup({ children }: FormGroupProps) {
  const styleFormGroup = {
    marginBottom: '15px',
    width: '100%',
  };
  return <div style={styleFormGroup}>{children}</div>;
}

import React, { useState } from 'react';
import './Modal.scss';
import { Button } from '../button/Button';
import { CloseIcon } from '../icons/close/Close';

type ModalProps = {
  children: JSX.Element;
  title?: string | null;
  onClose: () => void;
  onOk?: () => Promise<void>;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function Modal({ title, children, onClose }: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function okHandler() {
    setIsLoading(true);
    await delay(2000);
    setIsLoading(false);
  }

  return (
    <div className='modal-container'>
      <div className='modal'>
        {title && (
          <div className='header'>
            <span>{title}</span>
            <CloseIcon onClick={onClose} />
          </div>
        )}
        <div className='body'>{children}</div>
        <div className='footer'>
          <Button onClick={onClose}>Отмена</Button>
          <Button onClick={okHandler} type='primary' loading={isLoading}>
            Создать
          </Button>
        </div>
      </div>
    </div>
  );
}

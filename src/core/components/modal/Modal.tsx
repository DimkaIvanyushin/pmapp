import React, { useEffect, useState } from 'react';
import './Modal.scss';
import { Button } from '../button/Button';
import { CloseIcon } from '../icons/close/Close';

type ModalProps = {
  children: JSX.Element;
  title: string | null;
  footer?: boolean;
  onClose?: () => void;
  onOk?: () => Promise<void>;
};

export function Modal({ title, children, footer = true, onClose, onOk }: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleEsc, false);
    return () => document.removeEventListener('keydown', handleEsc, false);
  }, []);

  function handleEsc(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        onClose?.();
        break;
    }
  }

  async function okHandler() {
    if (!onOk) return;

    setIsLoading(true);
    await onOk();
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
        {footer && (
          <div className='footer'>
            <Button onClick={onClose}>Отмена</Button>
            <Button onClick={okHandler} type='primary' loading={isLoading}>
              Создать
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

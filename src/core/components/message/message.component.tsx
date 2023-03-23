import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaCheck, FaExclamationCircle, FaExclamationTriangle } from 'react-icons/fa';
import './message.component.scss';

export enum MessageType {
  SUCCESS,
  INFO,
  WARNING,
  DANGER,
}

type MessageProps = {
  message: string;
  type: MessageType;
};

type MessageApi = {
  info: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
  danger: (message: string) => void;
};

type MessageReturn = [MessageApi, JSX.Element];

export function useMessage(): MessageReturn {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageProps>({ message: '', type: MessageType.INFO });

  const visibleMessage = (message: string, type: MessageType) => {
    setMessage({ message, type });
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 2000);
  };

  const messageApi: MessageApi = {
    info: (message: string) => visibleMessage(message, MessageType.INFO),
    danger: (message: string) => visibleMessage(message, MessageType.DANGER),
    success: (message: string) => visibleMessage(message, MessageType.SUCCESS),
    warning: (message: string) => visibleMessage(message, MessageType.WARNING),
  };
  const context: JSX.Element = (
    <>
      {isVisible &&
        createPortal(
          <div className='message-container'>
            <div className='message'>
              {switchIcon(message.type)}
              {message.message}
            </div>
          </div>,
          document.body,
        )}
    </>
  );

  return [messageApi, context];
}

function switchIcon(type: MessageType) {
  const icons: { [key: number]: JSX.Element } = {
    [MessageType.SUCCESS]: <FaCheck color='#28a745' />,
    [MessageType.DANGER]: <FaExclamationCircle color='#ff4d4f' />,
    [MessageType.WARNING]: <FaExclamationTriangle color='#faad14' />,
    [MessageType.INFO]: <FaExclamationCircle color='#0366d6' />,
  };
  return icons[type];
}

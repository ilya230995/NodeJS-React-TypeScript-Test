import { useState } from 'react';
import { IStyles } from '../types/notification';

export const useNotification = (): [
  boolean,
  (toggle: boolean) => void,
  string,
  (newMessage: string) => void,
  IStyles,
  (styles: IStyles) => void,
] => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [styles, setStyles] = useState<IStyles>({});

  const setMessage = (newMessage: string) => setNotificationMessage(newMessage);

  const toggleNotification = (toggle: boolean) => setShowNotification(toggle);

  const setNotificationStyles = (styles: IStyles) => setStyles(styles);

  return [showNotification, toggleNotification, notificationMessage, setMessage, styles, setNotificationStyles];
};

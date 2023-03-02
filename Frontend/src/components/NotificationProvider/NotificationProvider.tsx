import React, { createContext, useContext, useCallback } from 'react';
import Notification from '../../components/Notification/Notification';
import { useNotification } from '../../hooks/useNotification';
import { IStyles } from '../../types/notification';

interface NotificationProviderValuesI {
  handleNotification: (message: string, styles: IStyles) => void;
}

const NotificationContext = createContext<NotificationProviderValuesI>({
  handleNotification: () => undefined,
});

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

interface NotificationProviderI {
  children: JSX.Element;
}
const NotificationProvider: React.FC<NotificationProviderI> = ({ children }) => {
  const [showNotification, toggleNotification, notificationMessage, setMessage, styles, setNotificationStyles] =
    useNotification();

  const handleNotification = useCallback(
    (message: string, styles: IStyles) => {
      setNotificationStyles(styles);
      setMessage(message);
      toggleNotification(true);
    },
    [toggleNotification],
  );

  return (
    <NotificationContext.Provider
      value={{
        handleNotification,
      }}
    >
      {children}
      <Notification
        isOpen={showNotification}
        onClose={() => toggleNotification(false)}
        message={notificationMessage}
        type={styles.type}
        variant={styles.variant}
        hideDuration={styles.hideDuration}
        orientation={{ vertical: 'top', horizontal: 'center' }}
      />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

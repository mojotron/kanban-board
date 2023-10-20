import { useState } from 'react';
import { useNotifications } from './useNotifications';

const Notifications = () => {
  const { newNotificationCount } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) return <p>Open</p>;

  return <div>Notifications {newNotificationCount}</div>;
};

export default Notifications;

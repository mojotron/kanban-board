import { useState } from 'react';

import NotificationsButton from './components/NotificationButton/NotificationsButton';
import NotificationsList from './components/NotificationList/NotificationsList';
import { useGetNotifications } from './hooks/useGetNotifications';

const Notifications = ({
  notificationList,
}: {
  notificationList: string[] | undefined;
}) => {
  const { notification } = useGetNotifications(notificationList);
  const [isOpen, setIsOpen] = useState(false);

  if (!notification) return null;

  const numberOfOpenNotifications = notification.filter(
    (notification) => notification.isOpened === false
  ).length;

  return (
    <div>
      <NotificationsButton
        newNotificationsCount={numberOfOpenNotifications}
        isOpen={isOpen}
        toggleOpen={setIsOpen}
      />
      {isOpen && <NotificationsList notifications={notification} />}
    </div>
  );
};

export default Notifications;

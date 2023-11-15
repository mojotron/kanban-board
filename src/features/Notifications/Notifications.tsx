import { useEffect, useMemo, useState } from 'react';

import NotificationsButton from './components/NotificationButton/NotificationsButton';
import NotificationsList from './components/NotificationList/NotificationsList';
import { useGetNotifications } from './hooks/useGetNotifications';
import { useNotification } from './hooks/useNotification';

const Notifications = ({
  notificationList,
}: {
  notificationList: string[] | undefined;
}) => {
  const { markOpenNotification } = useNotification();
  const { notifications } = useGetNotifications(notificationList);
  const [isOpen, setIsOpen] = useState(false);

  const newNotifications = useMemo(() => {
    if (!notifications) return [];
    return notifications.filter(
      (notification) => notification.isOpened === false
    );
  }, [notifications]);

  useEffect(() => {
    if (notifications === undefined) return;
    if (newNotifications.length < 1) return;
    if (isOpen) {
      markOpenNotification(newNotifications.map((n) => n.id));
    }
  }, [notifications, newNotifications]);

  if (!notifications) return null;

  return (
    <div>
      <NotificationsButton
        newNotificationsCount={newNotifications.length}
        isOpen={isOpen}
        toggleOpen={setIsOpen}
      />
      {isOpen && <NotificationsList notifications={notifications} />}
    </div>
  );
};

export default Notifications;

// hooks
import { useEffect, useMemo, useState } from 'react';
import { useGetNotifications } from './hooks/useGetNotifications';
import { useNotification } from './hooks/useNotification';
// components
import NotificationsButton from './components/NotificationButton/NotificationsButton';
import NotificationsList from './components/NotificationList/NotificationsList';
import NotificationCount from './components/NotificationCount/NotificationCount';
import { useUserData } from '../../context/UserDataContext';

const Notifications = ({ asideOpen }: { asideOpen: boolean }) => {
  const { document: user } = useUserData();
  const { markOpenNotification } = useNotification();
  const { notifications } = useGetNotifications(user?.notifications);
  const [isOpen, setIsOpen] = useState(false);

  const newNotifications = useMemo(() => {
    return notifications?.filter(
      (notification) => notification.isOpened === false
    );
  }, [notifications]);

  useEffect(() => {
    if (notifications === undefined) return;
    if (newNotifications) {
      if (isOpen) {
        markOpenNotification(newNotifications.map((n) => n.id));
      }
    }
  }, [notifications, newNotifications, isOpen]);

  if (!notifications) return null;

  if (asideOpen === false) {
    return (
      <>
        {newNotifications ? (
          <NotificationCount count={newNotifications.length} />
        ) : null}
      </>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <NotificationsButton
        newNotificationsCount={newNotifications?.length || 0}
        isOpen={isOpen}
        toggleOpen={setIsOpen}
      />
      <NotificationsList notifications={notifications} isOpen={isOpen} />
    </div>
  );
};

export default Notifications;

import { useState, useMemo, useEffect } from 'react';
import { useKanbanStore } from '../../../../store';
import { NotificationTypeWithId } from '../../types/typesNotifications';
import { useNotification } from '../../hooks/useNotification';
// components
import NotificationsButton from '../NotificationButton/NotificationsButton';
import NotificationsList from '../NotificationList/NotificationsList';
import NotificationCount from '../NotificationCount/NotificationCount';

type PropsType = {
  notifications: NotificationTypeWithId[];
};

const NotificationContainer = ({ notifications }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const showAside = useKanbanStore((state) => state.showAside);
  const { markOpenNotification } = useNotification();

  const newNotifications = useMemo(() => {
    return notifications.filter(
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

  if (showAside === false) {
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

export default NotificationContainer;

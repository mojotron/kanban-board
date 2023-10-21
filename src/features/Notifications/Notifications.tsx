import { useState } from 'react';
import { useNotifications } from './hooks/useNotifications';
import NotificationsButton from './components/NotificationButton/NotificationsButton';
import NotificationsList from './components/NotificationList/NotificationsList';
import { NotificationTypeWithId } from './types/typesNotifications';
import { Timestamp } from 'firebase/firestore';

const Notifications = () => {
  const { notifications, newNotificationCount } = useNotifications();

  const tempNotifications: NotificationTypeWithId[] = [
    {
      id: 'a',
      createdAt: Timestamp.fromDate(new Date()),
      isOpened: false,
      type: 'project-accept',
      user: { name: 'Mojotron', docId: 'string' },
      project: { name: 'new project', docId: 'string' },
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <NotificationsButton
        newNotificationsCount={newNotificationCount}
        isOpen={isOpen}
        toggleOpen={setIsOpen}
      />
      {isOpen && <NotificationsList notifications={tempNotifications ?? []} />}
    </div>
  );
};

export default Notifications;

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
      id: '1',
      type: 'project-accept',
      name: 'new project',
      link: 'aaaa',
      createdAt: Timestamp.fromDate(new Date()),
      isOpened: false,
    },
    {
      id: '1',
      type: 'project-reject',
      name: 'new project',
      link: 'aaaa',
      createdAt: Timestamp.fromDate(new Date()),
      isOpened: false,
    },
    {
      id: '1',
      type: 'project-leave',
      name: 'new project',
      link: 'aaaa',
      createdAt: Timestamp.fromDate(new Date()),
      isOpened: false,
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

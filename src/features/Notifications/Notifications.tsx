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
      user: {
        userName: 'mojotron',
        docId: '3FH1RTMNasZ2ssaxeSZSdevj6u22',
        imageUrl: 'https://avatars.githubusercontent.com/u/26403607?v=4',
      },
      project: { name: 'new project', docId: 'sOhrd3oScWpTZSKr6ES3' },
    },
    {
      id: 'b',
      createdAt: Timestamp.fromDate(new Date()),
      isOpened: false,
      type: 'project-reject',
      user: {
        userName: 'mojotron',
        docId: '3FH1RTMNasZ2ssaxeSZSdevj6u22',
        imageUrl: 'https://avatars.githubusercontent.com/u/26403607?v=4',
      },
      project: { name: 'new project', docId: 'sOhrd3oScWpTZSKr6ES3' },
    },
    {
      id: 'c',
      createdAt: Timestamp.fromDate(new Date()),
      isOpened: false,
      type: 'project-leave',
      user: {
        userName: 'mojotron',
        docId: '3FH1RTMNasZ2ssaxeSZSdevj6u22',
        imageUrl: 'https://avatars.githubusercontent.com/u/26403607?v=4',
      },
      project: { name: 'new project', docId: 'sOhrd3oScWpTZSKr6ES3' },
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

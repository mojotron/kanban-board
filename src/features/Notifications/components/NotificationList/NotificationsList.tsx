import { useMemo } from 'react';
import { NotificationTypeWithId } from '../../types/typesNotifications';
import NotificationItem from '../NotificationItem/NotificationItem';
import styles from './NotificationList.module.css';

type PropsType = {
  notifications: NotificationTypeWithId[];
  isOpen: boolean;
};

const NotificationsList = ({ notifications, isOpen }: PropsType) => {
  const sortedNotifications = useMemo(() => {
    return notifications.sort(
      (a, b) => b.createdAt.seconds - a.createdAt.seconds
    );
  }, [notifications]);

  return (
    <ul
      className={styles.notificationList}
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      {sortedNotifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </ul>
  );
};

export default NotificationsList;

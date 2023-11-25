import { useMemo } from 'react';
import { NotificationTypeWithId } from '../../types/typesNotifications';
import NotificationItem from '../NotificationItem/NotificationItem';
import styles from './NotificationList.module.css';

type PropsType = {
  notifications: NotificationTypeWithId[];
};

const NotificationsList = ({ notifications }: PropsType) => {
  const sortedNotifications = useMemo(() => {
    return notifications.sort(
      (a, b) => b.createdAt.seconds - a.createdAt.seconds
    );
  }, [notifications]);
  return (
    <ul className={styles.notificationList}>
      {sortedNotifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </ul>
  );
};

export default NotificationsList;

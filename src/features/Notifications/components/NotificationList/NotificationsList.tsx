import { NotificationTypeWithId } from '../../types/typesNotifications';
import NotificationItem from '../NotificationItem/NotificationItem';
import styles from './NotificationList.module.css';

type PropsType = {
  notifications: NotificationTypeWithId[];
};

const NotificationsList = ({ notifications }: PropsType) => {
  return (
    <ul className={styles.notificationList}>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </ul>
  );
};

export default NotificationsList;

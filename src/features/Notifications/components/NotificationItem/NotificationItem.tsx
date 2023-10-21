import { formatTime } from '../../../../utils/formatTime';
import { NotificationTypeWithId } from '../../types/typesNotifications';
import styles from './NotificationItem.module.css';

type PropsType = {
  notification: NotificationTypeWithId;
};

const NotificationItem = ({ notification }: PropsType) => {
  return (
    <li className={styles.notification}>
      <p>{formatTime(notification.createdAt.seconds * 1000)}</p>
    </li>
  );
};

export default NotificationItem;

import { formatTime } from '../../../../utils/formatTime';
import { NotificationTypeWithId } from '../../types/typesNotifications';
import styles from './NotificationItem.module.css';

type PropsType = {
  notification: NotificationTypeWithId;
};

// project-accept => [user] accepted your request to join [project]
// project-reject => [user] rejected your request to join [project]
// project-leave  => [user] have left [project]

const NotificationItem = ({ notification }: PropsType) => {
  return (
    <li className={styles.notification}>
      <p>{formatTime(notification.createdAt.seconds * 1000)}</p>
    </li>
  );
};

export default NotificationItem;

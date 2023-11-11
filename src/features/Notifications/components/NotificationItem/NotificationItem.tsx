import { Link } from 'react-router-dom';
import Avatar from '../../../../components/Avatar/Avatar';
import { formatTime } from '../../../../utils/formatTime';
import {
  NotificationTypeWithId,
  NotificationOptionType,
} from '../../types/typesNotifications';
import styles from './NotificationItem.module.css';
import { AiFillDelete as IconDelete } from 'react-icons/ai';
import Button from '../../../../components/Button/Button';
import { useUserData } from '../../../../context/UserDataContext';
import { useNotification } from '../../hooks/useNotification';

const getText = (option: NotificationOptionType) => {
  switch (option) {
    case 'project/accept-user':
      return 'accepted your request to join';
    case 'project/reject-user':
      return 'rejected your request to join';
    case 'project/leave':
      return 'has left';
    case 'project/send-request':
      return 'requested to join';
    case 'project/cancel-request':
      return 'canceled request to join';
  }
};

type PropsType = {
  notification: NotificationTypeWithId;
};

const NotificationItem = ({ notification }: PropsType) => {
  const { document: user } = useUserData();
  const { deleteNotification } = useNotification();

  const getLinkDestination = () => {
    if (!user) return '';
    const projectId = notification.project.docId;
    const isCollaborating = [
      ...user.managingProjects,
      ...user.collaboratingProjects,
    ].includes(projectId);
    if (isCollaborating) {
      return `/dashboard/${projectId}`;
    } else {
      return `/project/${projectId}`;
    }
  };

  if (!user) return null;

  return (
    <li className={styles.notification}>
      <div className={styles.notificationWrapper}>
        <Link
          to={`/${notification.user.docId}`}
          className={styles.notificationUser}
        >
          <Avatar
            imageUrl={notification.user.imageUrl}
            userName={notification.user.userName}
            size="25"
          />
          <p>{notification.user.userName}</p>
        </Link>
        <span> {getText(notification.type)} </span>
        <Link to={getLinkDestination()} className={styles.notificationProject}>
          {notification.project.name}
        </Link>
      </div>

      <p className={styles.notificationTimestamp}>
        {formatTime(notification.createdAt.seconds * 1000)}
      </p>

      <Button
        handleClick={() => deleteNotification(notification.id, user.uid)}
        className={styles.notificationBtnDelete}
      >
        <IconDelete />
      </Button>
    </li>
  );
};

export default NotificationItem;

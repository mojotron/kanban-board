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

const getText = (option: NotificationOptionType) => {
  switch (option) {
    case 'project-accept':
      return 'accepted your request to join';
    case 'project-reject':
      return 'rejected your request to join';
    case 'project-leave':
      return 'has left';
  }
};

type PropsType = {
  notification: NotificationTypeWithId;
};
// TODO
// link to dashboard if user is on project or to projectDetails

const NotificationItem = ({ notification }: PropsType) => {
  const { document: user } = useUserData();

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

      <Button handleClick={() => {}} className={styles.notificationBtnDelete}>
        <IconDelete />
      </Button>
    </li>
  );
};

export default NotificationItem;

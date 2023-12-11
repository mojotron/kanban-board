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
import { useGetNotificationData } from '../../hooks/useGetNotificationData';
import { UserWithId } from '../../../../types/userType';
import { ProjectWithId } from '../../../../types/projectType';

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
    case 'task/completed':
      return 'marked task as complete in project';
    case 'project/completed':
      return 'has set "Project Complete" to project';
    case 'project/deleted':
      return 'has deleted project';
    case 'project/invite-user':
      return 'invited you to join';
    case 'project/reject-invite':
      return 'rejected invite to join';
    case 'project/accept-invite':
      return 'accepted your invite to join';
    case 'project/cancel-invite':
      return 'rejected invite to join';
    case 'project/send-invite':
      return 'is invited to join';
  }
};

type PropsType = {
  notification: NotificationTypeWithId;
};

const NotificationItem = ({ notification }: PropsType) => {
  const { document: user } = useUserData();
  const { deleteNotification } = useNotification();
  const { data: requestUser } = useGetNotificationData<UserWithId>(
    'users',
    notification.displayUserId
  );
  const { data: requestProject } = useGetNotificationData<ProjectWithId>(
    'projects',
    notification.projectId
  );

  const getLinkDestination = () => {
    if (!user) return '';
    const projectId = notification.projectId;
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

  if (!user || !requestUser || !requestProject) return null;

  return (
    <li className={styles.notification}>
      <div className={styles.notificationWrapper}>
        <Link
          to={`/${notification.userId}`}
          className={styles.notificationUser}
        >
          <Avatar
            imageUrl={requestUser.photoUrl}
            userName={requestUser.userName}
            size="25"
          />
          <p>{requestUser.userName}</p>
        </Link>
        <span> {getText(notification.type)} </span>
        <Link to={getLinkDestination()} className={styles.notificationProject}>
          {requestProject.name}
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

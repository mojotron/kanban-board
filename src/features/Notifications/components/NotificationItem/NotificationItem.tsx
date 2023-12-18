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
    case 'project/leave':
      return 'has left';
    case 'task/completed':
      return 'marked task as complete in project';
    case 'project/completed':
      return 'has set "Project Complete" to project';
    case 'project/deleted':
      return 'has deleted project';
    // REQUESTS
    case 'request/send-user':
      return 'received your request to collaborate on project';
    case 'request/send-admin':
      return 'requested to collaborate on project';
    case 'request/cancel-user':
      return 'received request withdraw for collaboration on project';
    case 'request/cancel-admin':
      return 'revived your withdraw to collaborate on project';
    case 'request/accept-user':
      return 'approved your request to collaborate on project';
    case 'request/accept-admin':
      return 'request approved for project';
    case 'request/reject-user':
      return 'rejected your request to collaboration on project';
    case 'request/reject-admin':
      return 'request rejected by you to join project';
    // INVITES
    case 'invite/send-user':
      return 'invited you to collaborate on project';
    case 'invite/send-admin':
      return 'is invited to collaborate on project';
    case 'invite/cancel-user':
      return 'withdraw invite for collaboration on project';
    case 'invite/cancel-admin':
      return 'revived your withdraw to collaborate on project';
    case 'invite/accept-user':
      return 'received your invite conformation to collaborate on project';
    case 'invite/accept-admin':
      return 'accepted your invite to join project';
    case 'invite/reject-user':
      return 'received your invite rejection for collaboration on project';
    case 'invite/reject-admin':
      return 'rejected your invite to join project';
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
      <Link to={`/${notification.userId}`}>
        <Avatar
          imageUrl={requestUser.photoUrl}
          userName={requestUser.userName}
          size="25"
        />
      </Link>

      <div className={styles.notificationWrapper}>
        <Link
          to={`/${notification.userId}`}
          className={styles.notificationLink}
        >
          {requestUser.userName || 'Anonymous'}
        </Link>
        <span> {getText(notification.type)} </span>
        <Link to={getLinkDestination()} className={styles.notificationLink}>
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

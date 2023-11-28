import type { RequestType } from '../../../types/requestType';

import { useGetRequest } from '../hooks/useGetRequest';

import { useRequests } from '../hooks/useRequests';
import { useNotification } from '../../Notifications/hooks/useNotification';
import Avatar from '../../../components/Avatar/Avatar';
import TimestampPoint from '../../../components/TimestampPoint/TimestampPoint';
import styles from './RequestItem.module.css';
// icons
import {
  HiUserAdd as IconAccept,
  HiUserRemove as IconReject,
} from 'react-icons/hi';
import Button from '../../../components/Button/Button';
import { useProject } from '../../../context/ProjectContext';

type PropsType = {
  request: RequestType;
};

const RequestItem = ({ request }: PropsType) => {
  const { data: user, pending, error } = useGetRequest(request.userId);
  const { project } = useProject();

  const { acceptUser, rejectUser } = useRequests();
  const { createNotification } = useNotification();

  const handleAcceptUser = async () => {
    if (!user || !project) return;
    acceptUser(request.projectId, request.userId);
    createNotification(
      user.uid,
      project.adminUid,
      project.id,
      'project/accept-user'
    );
  };

  const handleRejectUser = async () => {
    if (!user || !project) return;
    rejectUser(request.projectId, request.userId);
    createNotification(
      user.uid,
      project.adminUid,
      project.id,
      'project/reject-user'
    );
  };

  if (error) return <li>Request encountered problem!</li>;
  if (pending) return <li>Loading request...</li>;
  if (!user) return null;

  return (
    <li className={styles.item}>
      <Avatar imageUrl={user.photoUrl} userName={user.userName} size="25" />
      <div className={styles.itemInfo}>
        <h2>{user.userName}</h2>
        <TimestampPoint time={request.createdAt} className={styles.timestamp} />
      </div>

      <div className={styles.itemControls}>
        <Button handleClick={handleAcceptUser} className={styles.itemBtn}>
          <IconAccept className={styles.green} size={18} />
        </Button>
        <Button handleClick={handleRejectUser} className={styles.itemBtn}>
          <IconReject className={styles.red} size={18} />
        </Button>
      </div>
    </li>
  );
};

export default RequestItem;

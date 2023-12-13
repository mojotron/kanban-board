import { RequestType } from '../../../../types/requestType';
import { useGetUserData } from '../../../../hooks/useGetUserData';
import { useProject } from '../../../../context/ProjectContext';
import { useRequests } from '../../../../features/Requests/hooks/useRequests';
import { useNotification } from '../../../../features/Notifications/hooks/useNotification';
import {
  HiUserAdd as IconAccept,
  HiUserRemove as IconReject,
} from 'react-icons/hi';
import Avatar from '../../../../components/Avatar/Avatar';
import Button from '../../../../components/Button/Button';
import TimestampPoint from '../../../../components/TimestampPoint/TimestampPoint';
import styles from './Calls.module.css';
import { InviteType } from '../../../../types/inviteType';
import { useInvites } from '../../../../features/Invites/hooks/useInvites';

type PropsType = {
  type: 'request' | 'invite';
  call: RequestType | InviteType;
};

const Call = ({ call, type }: PropsType) => {
  const { data: user, pending, error } = useGetUserData(call.userId);
  const { project } = useProject();

  const { acceptUser, rejectUser } = useRequests();
  const { inviteCancel } = useInvites();
  const { createNotification } = useNotification();

  const handleAcceptRequest = async () => {
    if (!user || !project) return;
    acceptUser(call.projectId, call.userId);
    createNotification(
      user.uid,
      project.adminUid,
      project.id,
      'project/accept-user'
    );
  };

  const handleRejectRequest = async () => {
    if (!user || !project) return;
    rejectUser(call.projectId, call.userId);
    createNotification(
      user.uid,
      project.adminUid,
      project.id,
      'project/reject-user'
    );
  };

  const handleRejectInvite = async () => {
    if (!user || !project) return;
    inviteCancel(project.id, user.uid);
    createNotification(
      user.id,
      project.adminUid,
      project.id,
      'project/cancel-invite'
    );
  };

  if (error && !user) return <li>Request encountered problem!</li>;
  if (pending && !user) return <li>Loading request...</li>;
  if (!user) return null;

  return (
    <li className={styles.item}>
      <Avatar imageUrl={user.photoUrl} userName={user.userName} size="25" />
      <div className={styles.itemInfo}>
        <h2>{user.userName}</h2>
        <TimestampPoint time={call.createdAt} className={styles.timestamp} />
      </div>

      <div className={styles.itemControls}>
        {type === 'request' ? (
          <>
            <Button
              handleClick={handleAcceptRequest}
              className={styles.itemBtn}
            >
              <IconAccept
                className={styles.green}
                size={18}
                title={`Accept request from ${user.userName}`}
              />
            </Button>
            <Button
              handleClick={handleRejectRequest}
              className={styles.itemBtn}
            >
              <IconReject
                className={styles.red}
                size={18}
                title={`Reject request from ${user.userName}`}
              />
            </Button>
          </>
        ) : null}

        {type === 'invite' ? (
          <Button handleClick={handleRejectInvite} className={styles.itemBtn}>
            <IconReject
              className={styles.red}
              size={18}
              title={`Cancel invite for ${user.userName}`}
            />
          </Button>
        ) : null}
      </div>
    </li>
  );
};

export default Call;

import styles from './ProjectInfo.module.css';
import Button from '../../../../components/Button/Button';
import { useInvites } from '../../../../features/Invites/hooks/useInvites';
import { useNotification } from '../../../../features/Notifications/hooks/useNotification';

type PropsType = {
  userId: string;
  projectId: string;
  adminId: string;
};

const InviteControls = ({ userId, projectId, adminId }: PropsType) => {
  const { inviteAccept, inviteCancel } = useInvites();
  const { createNotification } = useNotification();

  const handleAcceptInvite = () => {
    inviteAccept(projectId);
    createNotification(userId, adminId, projectId, 'invite/accept-user');
    createNotification(adminId, userId, projectId, 'invite/accept-admin');
  };

  const handleRejectInvite = () => {
    inviteCancel(projectId, userId);
    createNotification(userId, adminId, projectId, 'invite/reject-user');
    createNotification(adminId, userId, projectId, 'invite/reject-admin');
  };

  return (
    <div>
      <Button
        handleClick={handleAcceptInvite}
        className={`${styles.btn} ${styles.btnJoin}`}
      >
        Accept Invite
      </Button>
      <Button
        handleClick={handleRejectInvite}
        className={`${styles.btn} ${styles.btnCancel}`}
      >
        Reject Invite
      </Button>
    </div>
  );
};

export default InviteControls;

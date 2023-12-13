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
  const { inviteAccept, inviteReject } = useInvites();
  const { createNotification } = useNotification();

  const handleAcceptInvite = () => {
    inviteAccept(projectId);
    createNotification(userId, userId, projectId, 'project/accept-invite');
    createNotification(userId, adminId, projectId, 'project/accept-invite');
  };

  const handleRejectInvite = () => {
    inviteReject(projectId);
    createNotification(userId, userId, projectId, 'project/reject-invite');
    createNotification(userId, adminId, projectId, 'project/reject-invite');
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

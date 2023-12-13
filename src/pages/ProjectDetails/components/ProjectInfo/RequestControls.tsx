import { RequestType } from '../../../../types/requestType';
import Button from '../../../../components/Button/Button';
import { useRequests } from '../../../../features/Requests/hooks/useRequests';
import { useNotification } from '../../../../features/Notifications/hooks/useNotification';
import styles from './ProjectInfo.module.css';

type PropsType = {
  request: RequestType | undefined;
  isPublic: boolean;
  projectId: string;
  userId: string;
};

const RequestControls = ({
  request,
  isPublic,
  projectId,
  userId,
}: PropsType) => {
  const { applyToProject, cancelRequest } = useRequests();
  const { createNotification } = useNotification();

  const handleApply = () => {
    applyToProject(projectId);
    createNotification(userId, userId, projectId, 'project/send-request');
  };

  const handleCancel = () => {
    cancelRequest(projectId);
    createNotification(userId, userId, projectId, 'project/cancel-request');
  };
  return (
    <div>
      {isPublic && !request && (
        <Button
          handleClick={() => handleApply()}
          className={`${styles.btn} ${styles.btnJoin}`}
        >
          Request join
        </Button>
      )}

      {request && (
        <Button
          handleClick={() => handleCancel()}
          className={`${styles.btn} ${styles.btnCancel}`}
        >
          Cancel Request
        </Button>
      )}
    </div>
  );
};

export default RequestControls;

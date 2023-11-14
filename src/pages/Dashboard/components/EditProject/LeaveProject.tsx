import styles from './LeaveProject.module.css';
import Button from '../../../../components/Button/Button';
import { useState } from 'react';
import ConfirmPopup from '../../../../components/ConfirmPopup/ConfirmPopup';
import { useProject } from '../../../../context/ProjectContext';
import { useNotification } from '../../../../features/Notifications/hooks/useNotification';
import { useUserData } from '../../../../context/UserDataContext';

const LeaveProject = () => {
  const { document: user } = useUserData();
  const { project, leaveProject } = useProject();
  const { createNotification } = useNotification();
  const [openLeavePopup, setLeavePopup] = useState(false);

  const handleLeaveProject = () => {
    if (!user || !project) return;
    leaveProject();
    createNotification(user.uid, project.id, 'project/leave');
  };
  return (
    <>
      {openLeavePopup && (
        <ConfirmPopup
          message="Are you sure"
          onCancel={() => setLeavePopup(false)}
          onConfirm={handleLeaveProject}
        />
      )}
      <Button
        handleClick={() => setLeavePopup(true)}
        className={`${styles.btn} ${styles.btnRed}`}
      >
        Leave Project
      </Button>
    </>
  );
};

export default LeaveProject;

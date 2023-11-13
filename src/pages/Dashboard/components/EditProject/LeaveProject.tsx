import styles from './LeaveProject.module.css';
import Button from '../../../../components/Button/Button';
import { useState } from 'react';
import ConfirmPopup from '../../../../components/ConfirmPopup/ConfirmPopup';

const LeaveProject = () => {
  const [openLeavePopup, setLeavePopup] = useState(false);

  return (
    <>
      {openLeavePopup && (
        <ConfirmPopup
          message="Are you sure"
          onCancel={() => setLeavePopup(false)}
          onConfirm={() => {}}
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

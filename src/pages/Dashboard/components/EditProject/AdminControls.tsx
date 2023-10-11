// hooks
import { useProject } from '../../../../context/ProjectContext';
import { useState } from 'react';
// components
import ConfirmPopup from '../../../../components/ConfirmPopup/ConfirmPopup';
import Button from '../../../../components/Button/Button';
// styles
import styles from './AdminControls.module.css';
// constants
import {
  POPUP_DELETE_PROJECT,
  POPUP_FINISH_PROJECT,
} from '../../../../constants/confirmPopupTexts';

const AdminControls = () => {
  const { project, updateProjectField } = useProject();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openFinishPopup, setOpenFinishPopup] = useState(false);

  if (!project) return null;

  return (
    <div className={styles.controls}>
      {openDeletePopup && (
        <ConfirmPopup
          message={POPUP_DELETE_PROJECT}
          onCancel={() => setOpenDeletePopup(false)}
          onConfirm={() => {}}
        />
      )}
      {openFinishPopup && (
        <ConfirmPopup
          message={POPUP_FINISH_PROJECT}
          onCancel={() => setOpenFinishPopup(false)}
          onConfirm={() => {}}
        />
      )}

      <Button
        handleClick={() => updateProjectField('public', !project.public)}
        className={`${styles.btn} ${styles.btnBlue}`}
      >
        Make Project {project.public ? 'Private' : 'Public'}
      </Button>

      <Button
        handleClick={() => setOpenFinishPopup(true)}
        className={`${styles.btn} ${styles.btnGreen}`}
      >
        Finish Project
      </Button>

      <Button
        handleClick={() => setOpenDeletePopup(true)}
        className={`${styles.btn} ${styles.btnRed}`}
      >
        Delete Project
      </Button>
    </div>
  );
};

export default AdminControls;

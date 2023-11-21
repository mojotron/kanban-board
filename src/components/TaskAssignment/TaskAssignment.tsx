// hooks
import { ReactNode, useMemo, useState } from 'react';
import { useTeam } from '../../context/TeamContext';
import { useProject } from '../../context/ProjectContext';
import { useUserData } from '../../context/UserDataContext';
// style & icons
import { AiOutlineUserAdd as IconAssign } from 'react-icons/ai';
// components
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
// types
import { TaskWithId } from '../../types/taskType';
// constants
import {
  POPUP_ALREADY_ON_TASK,
  POPUP_UNASSIGN_TASK,
} from '../../constants/confirmPopupTexts';
// styles
import styles from './TaskAssignment.module.css';

type PropsType = {
  task: TaskWithId;
  iconSize?: 25 | 35 | 50;
  iconStyle?: 'light' | 'dark';
};

const TaskAssignment = ({
  task,
  iconSize = 35,
  iconStyle = 'light',
}: PropsType) => {
  const { document: user } = useUserData();
  const { getMember } = useTeam();
  const { assignTask, unassignTask, memberHasTask } = useProject();

  const [openPopup, setOpenPopup] = useState(false);

  const collaborator = useMemo(() => {
    return getMember(task.adminUid);
  }, [getMember, task]);

  const assignedTCurrentUser = task.assignToUid === user?.uid;

  const handleAssign = () => {
    if (!user) return;
    const haveTask = memberHasTask(user.uid);

    if (haveTask) {
      setOpenPopup(true);
    } else {
      assignTask(user?.uid, task.id);
      setOpenPopup(false);
    }
  };
  const handleUnassign = async () => {
    unassignTask(task.id);
    setOpenPopup(false);
  };

  if (!user) return null;

  let markdown: ReactNode;
  // unassign task add user icon
  if (task.assignToUid === null && task.stage === 'assignment') {
    markdown = (
      <>
        {openPopup && (
          <ConfirmPopup
            message={POPUP_ALREADY_ON_TASK}
            onCancel={() => setOpenPopup(false)}
            alert={true}
            onConfirm={() => {}} // just prop holder
          />
        )}

        <Button
          handleClick={handleAssign}
          className={`btn--icon ${
            iconStyle === 'dark' ? 'btn--icon--dark' : ''
          } ${iconSize === 50 ? 'btn--icon--big' : ''}`}
        >
          <IconAssign size={iconSize} title="Assign to Task" />
        </Button>
      </>
    );
  }
  // assigned task => user avatar and button for unassign
  if (task.assignToUid !== null && collaborator) {
    markdown = (
      <>
        {openPopup && (
          <ConfirmPopup
            message={POPUP_UNASSIGN_TASK}
            onCancel={() => setOpenPopup(false)}
            onConfirm={handleUnassign}
          />
        )}

        <Avatar
          size="50"
          imageUrl={collaborator.photoUrl}
          userName={collaborator.userName}
        />
        {assignedTCurrentUser && task.stage !== 'finished' && (
          <Button handleClick={() => setOpenPopup(true)} className="btn">
            Unassign
          </Button>
        )}
      </>
    );
  }
  if (task.stage === 'backlog') {
    markdown = <p>Move to assignment stage for members to pick up task!</p>;
  }

  return <div className={styles.task}>{markdown}</div>;
};

export default TaskAssignment;

// hooks
import { ReactNode, useMemo } from 'react';
import { useProject } from '../../context/ProjectContext';
import { useUserData } from '../../context/UserDataContext';
import { useKanbanStore } from '../../store';
import { useTaskMove } from '../../hooks/useTaskMove';
// style & icons
import { AiOutlineUserAdd } from 'react-icons/ai';
// components
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
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
};

const TaskAssignment = ({ task }: PropsType) => {
  const { document: user } = useUserData();
  const { team, tasks } = useProject();
  const { assign, unassign } = useTaskMove();

  const setOpenConfirmModal = useKanbanStore(
    (state) => state.setOpenConfirmModal
  );

  const collaborator = useMemo(() => {
    return team?.find((member) => member.id === task.assignToUid);
  }, [team, task]);

  const handleAssign = async () => {
    const haveTask = tasks?.find(
      (task) => task.assignToUid === user?.uid && task.stage !== 'finished'
    );
    if (!haveTask) {
      await assign(task);
    } else {
      setOpenConfirmModal({
        confirmBox: false,
        text: POPUP_ALREADY_ON_TASK,
        handleConfirm: () => {},
      });
    }
  };
  const handleUnassign = async () => {
    setOpenConfirmModal({
      confirmBox: true,
      text: POPUP_UNASSIGN_TASK,
      handleConfirm: () => unassign(task),
    });
  };

  let markdown: ReactNode;
  if (task.assignToUid === '' && task.stage === 'assignment') {
    markdown = (
      <Button handleClick={handleAssign} className="taskBtn">
        <AiOutlineUserAdd size={25} />
      </Button>
    );
  }
  if (task.assignToUid !== '' && collaborator) {
    markdown = (
      <>
        <Avatar
          size="50"
          imageUrl={collaborator.photoUrl}
          userName={collaborator.userName}
        />
        {task.assignToUid === user?.uid && task.stage !== 'finished' && (
          <Button handleClick={handleUnassign} className="taskBtn">
            unassign
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

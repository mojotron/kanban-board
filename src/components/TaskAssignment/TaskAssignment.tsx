// hooks
import { ReactNode, useMemo } from 'react';
import { useProject } from '../../context/ProjectContext';
import { useUserData } from '../../context/UserDataContext';
import { useKanbanStore } from '../../store';
// style & icons
import { AiOutlineUserAdd } from 'react-icons/ai';
// components
import Avatar from '../Avatar/Avatar';
import { TaskWithId } from '../../types/taskType';
import { useTaskMove } from '../../hooks/useTaskMove';
// constants
import {
  POPUP_ALREADY_ON_TASK,
  POPUP_UNASSIGN_TASK,
} from '../../constants/confirmPopupTexts';

type PropsType = {
  task: TaskWithId;
};

const TaskAssignment = ({ task }: PropsType) => {
  const { document: user } = useUserData();
  const { team, tasks } = useProject();
  const { assign, unassign } = useTaskMove(task);

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
      await assign();
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
      handleConfirm: () => unassign(),
    });
  };

  let markdown: ReactNode;
  if (task.assignToUid === '' && task.stage === 'assignment') {
    markdown = (
      <button onClick={handleAssign}>
        <AiOutlineUserAdd size={50} />
      </button>
    );
  }
  if (task.assignToUid !== '' && collaborator) {
    markdown = (
      <>
        <Avatar
          size="100"
          imageUrl={collaborator.photoUrl}
          userName={collaborator.userName}
        />
        {task.assignToUid === user?.uid && task.stage !== 'finished' && (
          <button onClick={handleUnassign}>unassign</button>
        )}
      </>
    );
  }
  if (task.stage === 'backlog') {
    markdown = <p>Move to assignment stage for members to pick up task!</p>;
  }

  return <div>{markdown}</div>;
};

export default TaskAssignment;

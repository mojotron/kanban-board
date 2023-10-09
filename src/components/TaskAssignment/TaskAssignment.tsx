// hooks
import { ReactNode, useMemo } from 'react';
import { useTeam } from '../../context/TeamContext';
import { useProject } from '../../context/ProjectContext';
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
import { useUserData } from '../../context/UserDataContext';

type PropsType = {
  task: TaskWithId;
};

const TaskAssignment = ({ task }: PropsType) => {
  const { document: user } = useUserData();
  const { getMember } = useTeam();
  const { assignTask, unassignTask } = useProject();

  const collaborator = useMemo(() => {
    return getMember(task.adminUid);
  }, [getMember, task]);

  const assignedTCurrentUser = task.assignToUid === user?.uid;
  // const currentUserIsAdmin = task.adminUid === user?.uid;

  const handleAssign = async () => {
    // const haveTask = tasks?.find(
    //   (task) => task.assignToUid === user?.uid && task.stage !== 'finished'
    // );
    // if (!haveTask) {
    //   await assign(task);
    // } else {
    //   setOpenConfirmModal({
    //     confirmBox: false,
    //     text: POPUP_ALREADY_ON_TASK,
    //     handleConfirm: () => {},
    //   });
    // }
  };
  const handleUnassign = async () => {
    // setOpenConfirmModal({
    //   confirmBox: true,
    //   text: POPUP_UNASSIGN_TASK,
    //   handleConfirm: () => unassign(task),
    // });
  };

  if (!user) return null;

  let markdown: ReactNode;
  // unassign task add user icon
  if (task.assignToUid === null && task.stage === 'assignment') {
    markdown = (
      <Button
        handleClick={() => assignTask(user?.uid, task.id)}
        className="taskBtn"
      >
        <AiOutlineUserAdd size={50} color="white" />
      </Button>
    );
  }
  // assigned task => user avatar and button for unassign
  if (task.assignToUid !== null && collaborator) {
    markdown = (
      <>
        <Avatar
          size="50"
          imageUrl={collaborator.photoUrl}
          userName={collaborator.userName}
        />
        {assignedTCurrentUser && task.stage !== 'finished' && (
          <Button
            handleClick={() => unassignTask(task.id)}
            className={styles.unassignBtn}
          >
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

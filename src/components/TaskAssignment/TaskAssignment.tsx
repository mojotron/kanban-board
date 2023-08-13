// hooks
import { ReactNode, useMemo } from 'react';
import { useProject } from '../../context/ProjectContext';
import { useUserData } from '../../context/UserDataContext';
import { useFirestore } from '../../hooks/useFirestore';
// style & icons
import { AiOutlineUserAdd } from 'react-icons/ai';
// components
import Avatar from '../Avatar/Avatar';

type PropsType = {
  assignTo: string;
  taskStage: string;
  taskDocId: string;
};

const TaskAssignment = ({ assignTo, taskStage, taskDocId }: PropsType) => {
  const { document: user } = useUserData();
  const { team, tasks } = useProject();
  const { updateDocument } = useFirestore();

  const collaborator = useMemo(() => {
    return team?.find((member) => member.id === assignTo);
  }, [team]);

  const handleAssign = async () => {
    // TODO after assignment does not render avatar !!!!!!!!!!!!!!!
    console.log('take task');
    // move task to development stage
    // check if user has currently assign task on the project
    const haveTask = tasks?.find((task) => task.assignToUid === user?.uid);
    if (!haveTask) {
      await updateDocument('tasks', taskDocId, {
        assignToUid: user?.uid,
        stage: 'development',
      });
    } else {
      // TODO better UI
      alert(`You are already assign to another task`);
    }
    // await updateDocument();
    // set assigNTo current user
  };
  const handleUnassign = async () => {
    console.log('abandon task');
    // move to assignment stage
    // clean task assign to property
    await updateDocument('tasks', taskDocId, {
      assignToUid: '',
      stage: 'assignment',
    });
  };

  let markdown: ReactNode;
  if (assignTo === '' && taskStage === 'assignment') {
    markdown = (
      <button onClick={handleAssign}>
        <AiOutlineUserAdd size={50} />
      </button>
    );
  }
  if (assignTo !== '' && collaborator) {
    markdown = (
      <>
        <Avatar
          size="100"
          imageUrl={collaborator.photoUrl}
          userName={collaborator.userName}
        />
        {assignTo === user?.uid && (
          <button onClick={handleUnassign}>unassign</button>
        )}
      </>
    );
  }
  if (taskStage === 'backlog') {
    markdown = <p>Move to assignment stage for members to pick up task!</p>;
  }

  return <div>{markdown}</div>;
};

export default TaskAssignment;

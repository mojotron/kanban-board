// hooks
import { ReactNode, useMemo } from 'react';
import { useProject } from '../../context/ProjectContext';
import { useUserData } from '../../context/UserDataContext';
// style & icons
import { AiOutlineUserAdd } from 'react-icons/ai';
// components
import Avatar from '../Avatar/Avatar';

type PropsType = {
  assignTo: string;
  taskStage: string;
};

const TaskAssignment = ({ assignTo, taskStage }: PropsType) => {
  const { document: user } = useUserData();
  const { project, team } = useProject();

  const collaborator = useMemo(() => {
    return team?.find((member) => member.id === assignTo);
  }, [team]);

  // check if task is assign => display avatar
  // check if task is assignment stage  and not assign => display assign button
  let markdown: ReactNode;

  if (assignTo === '' && taskStage === 'assignment') {
    markdown = (
      <>
        <AiOutlineUserAdd size={50} />
      </>
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
      </>
    );
  }

  if (taskStage === 'backlog') {
    markdown = <p>Move to assignment stage for members to pick up task!</p>;
  }

  return <div>{markdown}</div>;
};

export default TaskAssignment;

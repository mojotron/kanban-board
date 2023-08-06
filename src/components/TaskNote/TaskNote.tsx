import { Note } from '../../types/taskType';
import { useProject } from '../../context/ProjectContext';
import { useMemo } from 'react';
import Avatar from '../Avatar/Avatar';
import { formatTime } from '../../utils/formatTime';

type PropsType = {
  data: Note;
};

const TaskNote = ({ data }: PropsType) => {
  const { team } = useProject();

  const collaborator = useMemo(() => {
    return team?.find((member) => member.id === data.author);
  }, [data]);

  if (!collaborator) return null;

  return (
    <div>
      <Avatar
        imageUrl={collaborator.photoUrl}
        size="25"
        userName={collaborator.userName}
      />
      <p>{data.text}</p>
      <p>{formatTime(data.createdAt.seconds * 1000)}</p>
    </div>
  );
};

export default TaskNote;

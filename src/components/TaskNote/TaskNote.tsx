import { Note } from '../../types/taskType';
import { useProject } from '../../context/ProjectContext';
import { useMemo } from 'react';
import Avatar from '../Avatar/Avatar';
import { formatTime } from '../../utils/formatTime';
import './TaskNote.css';

type PropsType = {
  currentNote: Note;
  handleDeleteNote: (noteId: string) => void;
};

const TaskNote = ({ currentNote, handleDeleteNote }: PropsType) => {
  const { team } = useProject();

  const collaborator = useMemo(() => {
    return team?.find((member) => member.id === currentNote.author);
  }, [currentNote]);

  if (!collaborator) return null;

  return (
    <div className="TaskNote">
      <Avatar
        imageUrl={collaborator.photoUrl}
        size="25"
        userName={collaborator.userName}
      />
      <p>{currentNote.text}</p>
      <p className="TaskNote__createAt">
        {formatTime(currentNote.createdAt.seconds * 1000)}
      </p>
      <button onClick={() => handleDeleteNote(currentNote.id)}>delete</button>
    </div>
  );
};

export default TaskNote;

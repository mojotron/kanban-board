import { Note } from '../../types/taskType';
import { useProject } from '../../context/ProjectContext';
import { useMemo } from 'react';
import Avatar from '../Avatar/Avatar';
import { formatTime } from '../../utils/formatTime';
import './TaskNote.css';
import UpdatableTextValue from '../Updatables/UpdatableTextValue/UpdatableTextValue';
import { TEXT_LENGTHS } from '../../constants/textLengths';

type PropsType = {
  currentNote: Note;
  handleDeleteNote: (noteId: string) => void;
  handleUpdateNote: (noteId: string, newText: string) => void;
};

const TaskNote = ({
  currentNote,
  handleDeleteNote,
  handleUpdateNote,
}: PropsType) => {
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
      <UpdatableTextValue
        displayValue={currentNote.text}
        role="paragraph"
        maxLength={TEXT_LENGTHS.task.note}
        handleUpdate={(value) =>
          handleUpdateNote(currentNote.id, value as string)
        }
      />
      <p className="TaskNote__createAt">
        {formatTime(currentNote.createdAt.seconds * 1000)}
      </p>

      <button onClick={() => handleDeleteNote(currentNote.id)}>delete</button>
    </div>
  );
};

export default TaskNote;

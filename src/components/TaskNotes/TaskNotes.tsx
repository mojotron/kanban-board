import { ChangeEvent, useState } from 'react';
import { Note } from '../../types/taskType';
import { useUserData } from '../../context/UserDataContext';
import { Timestamp } from 'firebase/firestore';
import { useFirestore } from '../../hooks/useFirestore';
import { TEXT_LENGTHS } from '../../constants/textLengths';
import {
  AiFillEdit,
  AiFillCloseCircle,
  AiFillRightCircle,
} from 'react-icons/ai';
import TaskNote from '../TaskNote/TaskNote';

type PropsType = {
  notes: Note[];
  taskDocId: string;
};

const TaskNotes = ({ notes, taskDocId }: PropsType) => {
  const { document: user } = useUserData();
  const { updateDocument } = useFirestore();
  const [newNote, setNewNote] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [newNoteLength, setNoteLength] = useState(0);

  const maxLength = TEXT_LENGTHS.task.note;

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
    setNoteLength(e.target.value.length);
  };

  const handleAddNote = async () => {
    if (!user) return;
    const note: Note = {
      createdAt: Timestamp.fromDate(new Date()),
      author: user.uid,
      text: noteText,
    };
    await updateDocument('tasks', taskDocId, {
      notes: [...notes, note],
    });
    setNewNote(false);
    setNoteText('');
  };

  const handleCancelNote = () => {
    setNoteText('');
    setNoteLength(0);
    setNewNote(false);
  };

  return (
    <div>
      <h3>Notes</h3>

      <button onClick={() => setNewNote(true)}>
        <AiFillEdit size={15} />
      </button>

      {newNote && (
        <div>
          <textarea
            maxLength={maxLength}
            placeholder="add short note for other team members"
            value={noteText}
            onChange={handleTextChange}
          />
          <p>
            {newNoteLength}/{maxLength}
          </p>
          <button onClick={handleCancelNote}>
            <AiFillCloseCircle size={15} />
          </button>
          <button onClick={handleAddNote}>
            <AiFillRightCircle size={15} />
          </button>
        </div>
      )}
      <div>
        {notes.map((note, i) => (
          <TaskNote key={i} data={note} />
        ))}
      </div>
    </div>
  );
};

export default TaskNotes;

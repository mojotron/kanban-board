import { useEffect, useMemo, useState } from 'react';
import { useKanbanStore } from '../../store';
import { useFirestore } from '../../hooks/useFirestore';
// components
import ModalCloseBtn from '../ModalCloseBtn/ModalCloseBtn';
import Avatar from '../Avatar/Avatar';
// utils
import { formatTime, formatLocalDate } from '../../utils/formatTime';
// style
import './Task.css';
import { useProject } from '../../context/ProjectContext';
import { Note, TaskWithId } from '../../types/taskType';
import { Timestamp } from 'firebase/firestore';
import { useUserData } from '../../context/UserDataContext';
import { useOnSnapshotDocument } from '../../hooks/useOnSnapshotDocument';

const Task = () => {
  const currentTaskId = useKanbanStore((state) => state.currentTask);
  const setCurrentTask = useKanbanStore((state) => state.setCurrentTask);
  const closeModal = useKanbanStore((state) => state.setOpenViewTaskModal);

  const { document: user } = useUserData();
  const { updateDocument, pending, error } = useFirestore();

  const { document: currentTask } = useOnSnapshotDocument<TaskWithId>(
    'tasks',
    currentTaskId
  );

  const { team } = useProject();

  const collaborator = useMemo(() => {
    return team?.find((member) => member.id === currentTask?.assignToUid);
  }, [team]);

  console.log('collaborator', collaborator);

  useEffect(() => {}, []);

  // notes
  const [addNote, setAddNote] = useState(false);
  const [noteText, setNoteText] = useState('');

  const handleAddNote = async () => {
    if (!user) return;
    if (!currentTask) return;
    const note: Note = {
      createdAt: Timestamp.fromDate(new Date()),
      author: user.uid,
      text: noteText,
    };
    await updateDocument('tasks', currentTask?.id, {
      notes: [...currentTask?.notes, note],
    });
    setAddNote(false);
    setNoteText('');
  };

  const deadline = useMemo(() => {
    if (!currentTask) return;
    if (currentTask.deadline === null) return;

    return {
      date: formatLocalDate(new Date(currentTask.deadline.seconds * 1000)),
      formatted: formatTime(currentTask.deadline.seconds * 1000),
      overDue: (+new Date() - currentTask.deadline.seconds * 1000) / 1000,
    };
  }, [currentTask]);

  if (!currentTask) return;

  return (
    <div className="overlay">
      <div className="Task">
        <ModalCloseBtn
          handleClose={() => {
            setCurrentTask(null);
            closeModal(false);
          }}
        />

        <header className="Task__header">
          <div className="Task__header__info">
            <h2>{currentTask.title}</h2>
            <p>
              priority:{' '}
              <span className={`priority--${currentTask.priority}`}>
                {currentTask.priority}
              </span>
            </p>
            <p>current stage: {currentTask.stage}</p>
            {deadline && (
              <p>
                deadline: {deadline.date}
                <span
                  className={`deadline-tag deadline-tag--${
                    deadline.overDue > 0 ? 'red' : 'green'
                  }`}
                >
                  {deadline.formatted}
                </span>
              </p>
            )}
          </div>
          <div className="Task__header__avatar">
            {collaborator && (
              <>
                <h3>Assign to: {collaborator.userName}</h3>
                <Avatar
                  imageUrl={collaborator.photoUrl}
                  size="100"
                  userName={collaborator.userName}
                />
              </>
            )}
          </div>
        </header>
        <div className="Task__body">
          <div className="Task__body__description">
            <h3>Description</h3>
            <p>{currentTask.description}</p>
          </div>

          <div className="Task__body__notes">
            <div className="Task__body__notes__header">
              <h3>Notes</h3>
              <button onClick={() => setAddNote(true)}>New Note</button>
            </div>
            {addNote && (
              <div>
                <textarea
                  maxLength={1000}
                  placeholder="add short note for other team members"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
                <button onClick={handleAddNote}>Add</button>
              </div>
            )}
            <div>
              {currentTask.notes.map((note, i) => (
                <p key={i}>{note.text}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;

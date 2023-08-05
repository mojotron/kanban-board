// components
import ModalCloseBtn from '../ModalCloseBtn/ModalCloseBtn';
import Avatar from '../Avatar/Avatar';
import UpdatableTextValue from '../Updatables/UpdatableTextValue/UpdatableTextValue';
import UpdatableDateValue from '../Updatables/UpdatableDateValue/UpdatableDateValue';
import UpdatableSelectValue from '../Updatables/UpdatableSelectValue/UpdatableSelectValue';
import TaskNotes from '../TaskNotes/TaskNotes';
// style & icons
import './Task.css';
// hooks
import { useMemo, useState } from 'react';
import { useKanbanStore } from '../../store';
import { useFirestore } from '../../hooks/useFirestore';
import { useProject } from '../../context/ProjectContext';
import { Note, TaskWithId } from '../../types/taskType';
import { Timestamp } from 'firebase/firestore';
import { useUserData } from '../../context/UserDataContext';
import { useOnSnapshotDocument } from '../../hooks/useOnSnapshotDocument';
// constant
import { TEXT_LENGTHS } from '../../constants/textLengths';
import { PRIORITIES } from '../../constants/priorities';
import { TASK_STAGES } from '../../constants/taskStages';

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
            <UpdatableTextValue
              displayValue={currentTask.title}
              role="heading"
              maxLength={TEXT_LENGTHS.task.title}
              collectionName="tasks"
              docId={currentTask.id}
              property="title"
            />
            <UpdatableSelectValue
              displayValue={currentTask.priority}
              options={PRIORITIES}
              collectionName="tasks"
              docId={currentTask.id}
              property="priority"
            />
            <UpdatableSelectValue
              displayValue={currentTask.stage}
              options={TASK_STAGES}
              collectionName="tasks"
              docId={currentTask.id}
              property="stage"
            />
            {currentTask.deadline !== null && (
              <UpdatableDateValue
                timestamp={currentTask.deadline}
                displayDeadline={true}
                collectionName="tasks"
                docId={currentTask.id}
                property="deadline"
              />
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
            <UpdatableTextValue
              displayValue={currentTask.description}
              role="paragraph"
              maxLength={TEXT_LENGTHS.task.description}
              collectionName="tasks"
              docId={currentTask.id}
              property="description"
            />
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

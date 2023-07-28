import { useEffect, useMemo, useState } from 'react';
import { useKanbanStore } from '../../store';
// components
import ModalCloseBtn from '../ModalCloseBtn/ModalCloseBtn';
import Avatar from '../Avatar/Avatar';
// utils
import { formatTime, formatLocalDate } from '../../utils/formatTime';
// style
import './TaskView.css';
import { useProject } from '../../context/ProjectContext';

const TaskView = () => {
  const currentTask = useKanbanStore((state) => state.currentTask);
  const setCurrentTask = useKanbanStore((state) => state.setCurrentTask);
  const closeModal = useKanbanStore((state) => state.setOpenViewTaskModal);

  const { team } = useProject();

  const collaborator = useMemo(() => {
    return team?.find((member) => member.id === currentTask?.assignToUid);
  }, [team]);

  console.log('collaborator', collaborator);

  useEffect(() => {}, []);

  // notes
  const [addNote, setAddNote] = useState(false);

  if (currentTask === null) return;

  const deadline = useMemo(() => {
    if (currentTask.deadline === null) return;

    return {
      date: formatLocalDate(new Date(currentTask.deadline.seconds * 1000)),
      formatted: formatTime(currentTask.deadline.seconds * 1000),
      overDue: (+new Date() - currentTask.deadline.seconds * 1000) / 1000,
    };
  }, [currentTask.deadline]);

  return (
    <div className="overlay">
      <div className="TaskView">
        <ModalCloseBtn
          handleClose={() => {
            setCurrentTask(null);
            closeModal(false);
          }}
        />

        <header className="TaskView__header">
          <div className="TaskView__header__info">
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
          <div className="TaskView__header__avatar">
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
        <div className="TaskView__body">
          <div className="TaskView__body__description">
            <h3>Description</h3>
            <p>{currentTask.description}</p>
          </div>

          <div className="TaskView__body__notes">
            <div className="TaskView__body__notes__header">
              <h3>Notes</h3>
              <button onClick={() => setAddNote(true)}>New Note</button>
            </div>
            {addNote && (
              <div>
                <textarea maxLength={1000} />
                <button>Add</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskView;

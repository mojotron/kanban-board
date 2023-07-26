import { useEffect, useMemo } from 'react';
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
  const closeModal = useKanbanStore((state) => state.setOpenViewTaskModal);

  const { team } = useProject();

  const collaborator = useMemo(() => {
    return team?.find((member) => member.id === currentTask?.assignToUid);
  }, [team]);

  console.log('collaborator', collaborator);

  useEffect(() => {}, []);

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
        <ModalCloseBtn handleClose={() => closeModal(false)} />

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
          <h3>Description</h3>
          <p>{currentTask.description}</p>

          {currentTask.notes.length > 0 && (
            <>
              <h3>Notes</h3>
              <div></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskView;

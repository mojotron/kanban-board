import { useEffect, useMemo } from 'react';
import { useKanbanStore } from '../../store';
// components
import ModalCloseBtn from '../ModalCloseBtn/ModalCloseBtn';
import Avatar from '../Avatar/Avatar';
// utils
import { formatTime } from '../../utils/formatTime';
// style
import './TaskView.css';
import { TASK_STAGES } from '../../constants/taskStages';

const TaskView = () => {
  const currentTask = useKanbanStore((state) => state.currentTask);
  const closeModal = useKanbanStore((state) => state.setOpenViewTaskModal);

  useEffect(() => {}, []);

  if (currentTask === null) return;

  const deadline = useMemo(() => {
    if (currentTask.deadline === null) return;

    return {
      date: new Date(currentTask.deadline.seconds * 1000).toLocaleDateString(),
      formatted: formatTime(currentTask.deadline.seconds * 1000),
      overDue: (+new Date() - currentTask.deadline.seconds * 1000) / 1000,
    };
  }, [currentTask.deadline]);

  return (
    <div className="overlay">
      <div className="TaskView">
        <ModalCloseBtn handleClose={() => closeModal(false)} />

        <header>
          <h2>{currentTask.title}</h2>
          <p>priority: {currentTask.priority}</p>

          <p>
            current stage:{' '}
            {TASK_STAGES.map((stage) => (
              <span
                key={stage}
                className={stage === currentTask.stage ? 'green' : ''}
              >
                {stage}
              </span>
            ))}
          </p>
          {deadline && (
            <p>
              deadline: {deadline.date} ({deadline.formatted})
            </p>
          )}
        </header>
        <div>
          <p>{currentTask.description}</p>
        </div>
        <div>
          <h3>Notes</h3>
        </div>
      </div>
    </div>
  );
};

export default TaskView;

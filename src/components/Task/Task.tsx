// style & icons
import './Task.css';
import { AiOutlineUserAdd, AiFillEdit, AiFillEye } from 'react-icons/ai';
// types
import { TaskType } from '../../types/taskType';
// components
import Avatar from '../Avatar/Avatar';
// helpers
import { formatTime } from '../../utils/formatTime';
// hooks
import { useProject } from '../../context/ProjectContext';
import { useMemo } from 'react';
import TextBox from '../TextBox/TextBox';
import { useKanbanStore } from '../../store';

type Props = {
  taskData: TaskType & { id: string };
};

const Task = ({ taskData }: Props) => {
  const { team } = useProject();

  const collaborator = useMemo(() => {
    return team?.find((member) => member.id === taskData.assignToUid);
  }, [team]);

  const setCurrentTask = useKanbanStore((state) => state.setCurrentTask);
  const setOpenViewTaskModal = useKanbanStore(
    (state) => state.setOpenViewTaskModal
  );

  const deadline = useMemo(() => {
    if (taskData.deadline === null) return;
    return {
      formatted: formatTime(taskData.deadline.seconds * 1000),
      overDue: (+new Date() - taskData.deadline.seconds * 1000) / 1000,
    };
  }, [taskData.deadline]);

  const handleClickViewTask = () => {
    setCurrentTask(taskData);
    setOpenViewTaskModal(true);
  };

  return (
    <article className="Task">
      <header className={`Task__header priority--${taskData.priority}`}>
        <h3 className="Task__header__heading">{taskData.title}</h3>

        <div className="Task__header__controls">
          <button
            className="Task__btn"
            title="view task"
            onClick={handleClickViewTask}
          >
            <AiFillEye size={25} />
          </button>
          {collaborator ? (
            <Avatar
              imageUrl={collaborator.photoUrl}
              userName={collaborator.userName}
              size="50"
            />
          ) : (
            <button className="Task__btn Task__btn--add" title="pick up task">
              <AiOutlineUserAdd size={35} color={'var(--COLOR-GRAY-500)'} />
            </button>
          )}
        </div>
      </header>
      <main className={`Task__body`}>
        {deadline && (
          <span
            className={`deadline-tag deadline-tag--${
              deadline.overDue > 0 ? 'red' : 'green'
            }`}
          >
            <span className="Task__body__deadline__heading">Deadline:</span>{' '}
            <span>{deadline.formatted}</span>
          </span>
        )}
        <TextBox
          text={taskData.description}
          length={50}
          className="Task__body__description"
        />
      </main>
    </article>
  );
};

export default Task;

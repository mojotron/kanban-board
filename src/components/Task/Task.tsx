import './Task.css';
import { TaskType } from '../../types/taskType';
import Avatar from '../Avatar/Avatar';
import { useOnSnapshotDocument } from '../../hooks/useOnSnapshotDocument';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { UserType } from '../../types/userType';
import { formatTime } from '../../utils/formatTime';
import { useMemo } from 'react';

type Props = {
  taskData: TaskType & { id: string };
};

const Task = ({ taskData }: Props) => {
  // TODO later pass members data
  const { document } = useOnSnapshotDocument<UserType>(
    'users',
    taskData.assignToUid
  );

  const deadline = useMemo(() => {
    if (taskData.deadline === null) return;
    return {
      formatted: formatTime(taskData.deadline.seconds * 1000),
      overDue: (+new Date() - taskData.deadline.seconds * 1000) / 1000,
    };
  }, [taskData.deadline]);
  //

  return (
    <article className="Task">
      <header className={`Task__header priority--${taskData.priority}`}>
        <h3 className="Task__header__heading">{taskData.title}</h3>
        {document ? (
          <Avatar
            imageUrl={document?.photoUrl}
            userName={document?.userName}
            size="50"
          />
        ) : (
          <button className="Task__add-button">
            <AiOutlineUserAdd size={35} color={'var(--COLOR-GRAY-500)'} />
          </button>
        )}
      </header>
      <main className={`Task__body`}>
        {deadline && (
          <p style={{ color: deadline.overDue > 0 ? 'red' : 'green' }}>
            Deadline: {deadline.formatted},{' '}
          </p>
        )}
        <p className="Task__body__description">{taskData.description}</p>
      </main>
    </article>
  );
};

export default Task;

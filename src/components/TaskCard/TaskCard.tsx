// hooks
import { useKanbanStore } from '../../store';
// style & icons
import styles from './TaskCard.module.css';
import { AiFillEye } from 'react-icons/ai';
// types
import { TaskWithId } from '../../types/taskType';
// components
import Button from '../Button/Button';
import Deadline from '../Deadline/Deadline';
import TaskAssignment from '../TaskAssignment/TaskAssignment';
import ExpandedText from '../ExpandedText/ExpandedText';

type Props = {
  taskData: TaskWithId;
};

const TaskCard = ({ taskData }: Props) => {
  const setCurrentTaskId = useKanbanStore((state) => state.setCurrentTaskId);
  const setOpenViewTaskModal = useKanbanStore(
    (state) => state.setOpenViewTaskModal
  );

  const handleClickViewTask = () => {
    setCurrentTaskId(taskData.id);
    setOpenViewTaskModal(true);
  };

  return (
    <article className={styles.task}>
      <header className={`${styles.taskHeader} priority--${taskData.priority}`}>
        <h3>{taskData.title}</h3>
        <div className={styles.taskControls}>
          <Button className="taskBtn" handleClick={handleClickViewTask}>
            <AiFillEye size={25} />
          </Button>
          <TaskAssignment task={taskData} />
        </div>
      </header>

      <main className={styles.taskBody}>
        {taskData.deadline && <Deadline time={taskData.deadline} />}
        <ExpandedText
          text={taskData.description}
          hideWordsLength={10}
          className={styles.taskDescription}
          buttonClassName={styles.expandBtn}
          expandText="&#9654;"
          hideText="&#9664;"
        />
      </main>
    </article>
  );
};

export default TaskCard;

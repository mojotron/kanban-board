// hooks
import { useState } from 'react';
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
import Task from '../Task/Task';

type Props = {
  taskData: TaskWithId;
};

const TaskCard = ({ taskData }: Props) => {
  const [openTaskDetails, setOpenTaskDetails] = useState(false);

  return (
    <article className={styles.task}>
      {openTaskDetails && (
        <Task taskData={taskData} onClose={() => setOpenTaskDetails(false)} />
      )}

      <header className={`${styles.taskHeader} priority--${taskData.priority}`}>
        <h3>{taskData.title}</h3>
        <div className={styles.taskControls}>
          <Button
            className="btn--icon btn--icon--dark"
            handleClick={() => setOpenTaskDetails(true)}
          >
            <AiFillEye size={25} />
          </Button>
          <TaskAssignment task={taskData} iconSize={25} iconStyle="dark" />
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

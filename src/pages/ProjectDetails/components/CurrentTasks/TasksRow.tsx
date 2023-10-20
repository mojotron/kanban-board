import { useMemo } from 'react';
import { Stage, TaskWithId } from '../../../../types/taskType';
import styles from './TasksRow.module.css';

type PropsType = {
  stage: Stage;
  tasks: TaskWithId[];
};

const TasksRow = ({ stage, tasks }: PropsType) => {
  const tasksNumber = useMemo(
    () => tasks.filter((task) => task.stage === stage).length,
    [stage, tasks]
  );
  return (
    <li className={styles.row}>
      <span>{stage}</span>
      <span className={styles.bold}>{tasksNumber}</span>
    </li>
  );
};

export default TasksRow;

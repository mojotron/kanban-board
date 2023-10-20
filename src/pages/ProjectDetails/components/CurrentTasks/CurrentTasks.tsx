import { TASK_STAGES } from '../../../../constants/taskStages';
import { useCollectDocs } from '../../../../hooks/useCollectDocs';
import { TaskWithId } from '../../../../types/taskType';
import TasksRow from './TasksRow';
import styles from './CurrentTasks.module.css';

type PropsType = {
  taskList: string[];
};

const CurrentTasks = ({ taskList }: PropsType) => {
  const { documents: tasks } = useCollectDocs<TaskWithId>(taskList, 'tasks');

  if (!tasks) return null;

  return (
    <div className={styles.tasks}>
      <h3 className={styles.heading}>Current tasks</h3>
      <ul className={styles.tasksList}>
        {TASK_STAGES.map((stage) => (
          <TasksRow key={stage} stage={stage} tasks={tasks} />
        ))}
      </ul>
    </div>
  );
};

export default CurrentTasks;

import { useMemo } from 'react';
import { useProject } from '../../../../context/ProjectContext';
import { useKanbanStore } from '../../../../store';
import TaskCard from '../../../../components/TaskCard/TaskCard';
import { TaskWithId } from '../../../../types/taskType';
import styles from './TasksList.module.css';

const TasksList = () => {
  const { tasks, tasksPending, tasksErr } = useProject();
  const currentTaskStage = useKanbanStore((state) => state.currentTaskStage);

  const filteredStageTasks = useMemo((): TaskWithId[] | undefined => {
    if (!tasks) return undefined;
    return tasks.filter((task) => task.stage === currentTaskStage);
  }, [tasks, currentTaskStage]);

  return (
    <div className={styles.tasksList}>
      {tasksPending && <p>Loading...</p>}
      {tasksErr && <p className="error">{tasksErr}</p>}

      {filteredStageTasks &&
        filteredStageTasks.map((task) => (
          <TaskCard key={task.id} taskData={task} />
        ))}
    </div>
  );
};

export default TasksList;

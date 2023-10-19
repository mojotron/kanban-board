import { TASK_STAGES } from '../../../../constants/taskStages';
import { useCollectDocs } from '../../../../hooks/useCollectDocs';
import { TaskWithId } from '../../../../types/taskType';
import TasksRow from './TasksRow';

type PropsType = {
  taskList: string[];
};

const CurrentTasks = ({ taskList }: PropsType) => {
  const { documents: tasks } = useCollectDocs<TaskWithId>(taskList, 'tasks');

  if (!tasks) return null;

  return (
    <div>
      <h3>Current tasks</h3>
      {TASK_STAGES.map((stage) => (
        <TasksRow key={stage} stage={stage} tasks={tasks} />
      ))}
    </div>
  );
};

export default CurrentTasks;

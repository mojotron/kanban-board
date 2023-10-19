import { useMemo } from 'react';
import { Stage, TaskWithId } from '../../../../types/taskType';

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
    <div>
      <span>{stage}</span>
      <span>{tasksNumber}</span>
    </div>
  );
};

export default TasksRow;

import { useTaskMove } from '../../hooks/useTaskMove';
import { TaskWithId } from '../../types/taskType';

type PropsType = {
  task: TaskWithId;
};

const TaskStages = ({ task }: PropsType) => {
  const { isAdmin, isYourTask, toPlanning, toAssignment } = useTaskMove(task);

  const stage = task.stage;
  const admin = isAdmin();
  const yourTask = isYourTask();

  return (
    <div>
      <h3>Stages {task.stage}</h3>
      {admin && stage === 'backlog' && (
        <button onClick={toAssignment}>move to assignment</button>
      )}
      {admin && stage === 'assignment' && (
        <button onClick={toPlanning}>move to assignment</button>
      )}
    </div>
  );
};

export default TaskStages;

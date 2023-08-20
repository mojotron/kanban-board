import { useTaskMove } from '../../hooks/useTaskMove';
import { Stage, TaskWithId } from '../../types/taskType';
import { TASK_STAGES_COLLABORATES } from '../../constants/taskStages';
import UpdatableSelectValue from '../Updatables/UpdatableSelectValue/UpdatableSelectValue';

type PropsType = {
  task: TaskWithId;
};

const TaskStages = ({ task }: PropsType) => {
  const {
    isAdmin,
    isYourTask,
    toPlanning,
    toAssignment,
    developmentMove,
    toFinish,
  } = useTaskMove();

  const stage = task.stage;
  const admin = isAdmin(task);
  const yourTask = isYourTask(task);

  return (
    <div>
      {admin && stage === 'backlog' && (
        <button onClick={() => toAssignment(task)}>move to assignment</button>
      )}
      {admin && stage === 'assignment' && (
        <button onClick={() => toPlanning(task)}>move to backlog</button>
      )}
      {TASK_STAGES_COLLABORATES.includes(task.stage) && (
        <UpdatableSelectValue
          displayValue={task.stage}
          options={TASK_STAGES_COLLABORATES}
          handleUpdate={async (value) => {
            console.log(value);
            await developmentMove(task, value as Stage);
          }}
        />
      )}
      {admin && stage === 'complete' && (
        <button onClick={() => toFinish(task)}>finish task</button>
      )}
    </div>
  );
};

export default TaskStages;

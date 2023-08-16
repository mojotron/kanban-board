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
  } = useTaskMove(task);

  const stage = task.stage;
  const admin = isAdmin();
  const yourTask = isYourTask();

  return (
    <div>
      {admin && stage === 'backlog' && (
        <button onClick={toAssignment}>move to assignment</button>
      )}
      {admin && stage === 'assignment' && (
        <button onClick={toPlanning}>move to backlog</button>
      )}
      {TASK_STAGES_COLLABORATES.includes(task.stage) && (
        <UpdatableSelectValue
          displayValue={task.stage}
          options={TASK_STAGES_COLLABORATES}
          handleUpdate={async (value) => {
            console.log(value);
            await developmentMove(value as Stage);
          }}
        />
      )}
      {admin && stage === 'complete' && (
        <button onClick={toFinish}>finish task</button>
      )}
    </div>
  );
};

export default TaskStages;

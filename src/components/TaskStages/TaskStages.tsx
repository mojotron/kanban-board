import { useTaskMove } from '../../hooks/useTaskMove';
import { Stage, TaskWithId } from '../../types/taskType';
import { TASK_STAGES_COLLABORATES } from '../../constants/taskStages';
import UpdateSelect from '../../features/UpdateElement/UpdateSelect/UpdateSelect';
import Button from '../Button/Button';
import styles from './TaskStages.module.css';

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
        <Button handleClick={() => toAssignment(task)} className={styles.btn}>
          move to assignment
        </Button>
      )}
      {admin && stage === 'assignment' && (
        <Button handleClick={() => toPlanning(task)} className={styles.btn}>
          move to backlog
        </Button>
      )}
      {TASK_STAGES_COLLABORATES.includes(task.stage) && (
        <UpdateSelect
          currentOption={task.stage}
          options={TASK_STAGES_COLLABORATES}
          onUpdate={async (value) => {
            console.log(value);
            await developmentMove(task, value as Stage);
          }}
        />
      )}
      {admin && stage === 'complete' && (
        <Button handleClick={() => toFinish(task)} className={styles.btn}>
          finish task
        </Button>
      )}
    </div>
  );
};

export default TaskStages;

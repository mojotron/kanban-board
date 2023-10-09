import { Stage, TaskWithId } from '../../types/taskType';
import { TASK_STAGES_COLLABORATES } from '../../constants/taskStages';
import UpdateSelect from '../../features/UpdateElement/UpdateSelect/UpdateSelect';
import Button from '../Button/Button';
import styles from './TaskStages.module.css';
import { useUserData } from '../../context/UserDataContext';
import { useProject } from '../../context/ProjectContext';
import { useTeam } from '../../context/TeamContext';

type PropsType = {
  task: TaskWithId;
};

const TaskStages = ({ task }: PropsType) => {
  const { document: user } = useUserData();
  const { updateTaskField, finishTask } = useProject();
  const { getMember } = useTeam();

  const stage = task.stage;
  const isAdmin = user?.uid === task.adminUid;
  const isDeveloper = user?.uid === task.assignToUid;

  const handleFinishTask = () => {
    if (!task.assignToUid) return;
    const developer = getMember(task.assignToUid);
    if (!developer) return;
    const tasksCompleted = developer.tasksCompleted;
    finishTask(task.id, developer.id, tasksCompleted + 1);
  };

  return (
    <div>
      {isAdmin && stage === 'backlog' && (
        <Button
          handleClick={() => updateTaskField('stage', 'assignment', task.id)}
          className={styles.btn}
        >
          move to assignment
        </Button>
      )}
      {isAdmin && stage === 'assignment' && (
        <Button
          handleClick={() => updateTaskField('stage', 'backlog', task.id)}
          className={styles.btn}
        >
          move to backlog
        </Button>
      )}
      {TASK_STAGES_COLLABORATES.includes(task.stage) && isDeveloper && (
        <UpdateSelect
          currentOption={task.stage}
          options={TASK_STAGES_COLLABORATES}
          onUpdate={(value) => {
            updateTaskField('stage', value as Stage, task.id);
          }}
        />
      )}
      {isAdmin && stage === 'complete' && (
        <Button handleClick={handleFinishTask} className={styles.btn}>
          finish task
        </Button>
      )}
      {stage === 'finished' && <p>Finished</p>}
    </div>
  );
};

export default TaskStages;

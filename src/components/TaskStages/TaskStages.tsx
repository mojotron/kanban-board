import { Stage, TaskWithId } from '../../types/taskType';
import { TASK_STAGES_COLLABORATES } from '../../constants/taskStages';
import UpdateSelect from '../../features/UpdateElement/UpdateSelect/UpdateSelect';
import Button from '../Button/Button';
import { useUserData } from '../../context/UserDataContext';
import { useProject } from '../../context/ProjectContext';
import { useTeam } from '../../context/TeamContext';
import { useNotification } from '../../features/Notifications/hooks/useNotification';

type PropsType = {
  task: TaskWithId;
};

const TaskStages = ({ task }: PropsType) => {
  const { document: user } = useUserData();
  const { project, updateTaskField, finishTask } = useProject();
  const { getMember } = useTeam();
  const { createNotification } = useNotification();

  const stage = task.stage;
  const isAdmin = user?.uid === task.adminUid;
  const isDeveloper = user?.uid === task.assignToUid;

  const handleFinishTask = () => {
    if (!user || !project) return;
    if (!task.assignToUid) return;
    const developer = getMember(task.assignToUid);
    if (!developer) return;
    const tasksCompleted = developer.tasksCompleted;
    finishTask(task.id, developer.id, tasksCompleted + 1);
    createNotification(
      user.uid,
      project.adminUid,
      project.id,
      'task/completed'
    );
  };

  return (
    <div style={{ marginTop: '0.25rem' }}>
      {isAdmin && stage === 'backlog' && (
        <Button
          handleClick={() => updateTaskField('stage', 'assignment', task.id)}
          className="btn"
        >
          Move to Assignment
        </Button>
      )}
      {isAdmin && stage === 'assignment' && (
        <Button
          handleClick={() => updateTaskField('stage', 'backlog', task.id)}
          className="btn"
        >
          Move to Backlog
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
        <Button handleClick={handleFinishTask} className="btn">
          Finish Task
        </Button>
      )}
      {stage === 'finished' && <p>Finished</p>}
    </div>
  );
};

export default TaskStages;

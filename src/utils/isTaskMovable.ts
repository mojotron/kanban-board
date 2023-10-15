import { TASK_STAGES_COLLABORATES as DEV_STAGES } from '../constants/taskStages';
import type { Stage } from '../types/taskType';

export const isTaskMovable = (
  oldStage: Stage,
  newStage: Stage,
  memberHasTask: boolean
) => {
  if (oldStage === 'backlog' && newStage === 'assignment') return true;
  if (oldStage === 'assignment' && newStage === 'backlog') return true;
  if (oldStage === 'assignment' && newStage === 'development') {
    if (memberHasTask) return false;
    else return true;
  }
  if (DEV_STAGES.includes(oldStage) && newStage === 'assignment') return true;
  if (DEV_STAGES.includes(oldStage) && DEV_STAGES.includes(newStage))
    return true;
  if (oldStage === 'complete' && newStage === 'finished') return true;
  if (oldStage === 'finished') return false;
  return false;
};

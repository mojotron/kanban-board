import { TaskWithId, Stage } from '../types/taskType';
import { useUserData } from '../context/UserDataContext';
import { useCallback } from 'react';
import { TASK_STAGES_COLLABORATES } from '../constants/taskStages';

export const useTaskMove = (task: TaskWithId) => {
  // backlog is creation stage => admin can move it to assignment stage
  // assignment is where collaborators pick task to work on
  // development - test - done
  // finish stage can only be added by admin => this stage is unmovable (history)
  const updateTask = useCallback(() => {}, []);

  const moveTask = useCallback(
    (newStage: Stage) => {
      if (task.stage === 'backlog' && newStage === 'assignment') {
      }
      if (task.stage === 'assignment' && newStage === 'backlog') {
      }
      if (task.stage === 'assignment' && newStage === 'development') {
      }
      if (
        TASK_STAGES_COLLABORATES.includes(task.stage) &&
        TASK_STAGES_COLLABORATES.includes(newStage)
      ) {
      }
      if (
        TASK_STAGES_COLLABORATES.includes(task.stage) &&
        newStage === 'assignment'
      ) {
      }
      if (task.stage === 'complete' && newStage === 'finished') {
      }
      if (task.stage === 'finished') {
        alert('Task is finished, make new task!');
        return;
      }
    },
    [task]
  );

  return { moveTask };
};

// hooks
import { useCallback } from 'react';
import { useUserData } from '../context/UserDataContext';
import { useFirestore } from './useFirestore';
// constants
import { TASK_STAGES_COLLABORATES } from '../constants/taskStages';
// types
import { TaskWithId, Stage } from '../types/taskType';

export const useTaskMove = (task: TaskWithId) => {
  const { document: user } = useUserData();
  const { updateDocument } = useFirestore();

  const updateTask = useCallback(async (stage: Stage, assignToUid?: string) => {
    await updateDocument('tasks', task.id, {
      stage: stage,
      ...(assignToUid !== undefined && { assignToUid }),
    });
  }, []);

  const isAdmin = useCallback(() => user?.uid === task.adminUid, [task]);

  const isYourTask = useCallback(() => user?.uid === task.assignToUid, [task]);

  const isMovable = useCallback(
    (newStage: Stage) => {
      if (task.stage === 'backlog' && newStage === 'assignment') {
        // moved by admin => update task stage to assignment
      }
      if (task.stage === 'assignment' && newStage === 'backlog') {
        // moved by admin => update task stage to backlog
      }
      if (task.stage === 'assignment' && newStage === 'development') {
        // moved when collaborator picks task (assign)
        // => update task stage to development, task assignToUid to current user
      }
      if (
        TASK_STAGES_COLLABORATES.includes(task.stage) &&
        newStage === 'assignment'
      ) {
        // moved when collaborator drops task (unassign)
        // => update task stage to assignment, task assignToUid to ""
      }
      if (
        TASK_STAGES_COLLABORATES.includes(task.stage) &&
        TASK_STAGES_COLLABORATES.includes(newStage)
      ) {
        // moved between working stages by collaborator or admin
        // update task stage to new value
      }
      if (task.stage === 'complete' && newStage === 'finished') {
        // moved my admin => update task stage to finished
        // increment collaborators taskCompleted by 1
      }
      if (task.stage === 'finished') {
        // unmovable task => purpose project history
        alert('Task is finished, make new task!');
        return;
      }
    },
    [task]
  );

  const toPlanning = useCallback(async () => {
    await updateTask('backlog');
  }, []);

  const toAssignment = useCallback(async () => {
    await updateTask('assignment');
  }, []);

  const assign = useCallback(async () => {
    await updateTask('development', user?.uid);
  }, []);

  const unassign = useCallback(async () => {
    await updateTask('assignment', '');
  }, []);

  const developmentMove = useCallback(
    async (newStage: Stage) => {
      if (!TASK_STAGES_COLLABORATES.includes(task.stage)) return;
      if (isYourTask()) {
        console.log('hello', newStage);

        await updateTask(newStage);
      }
    },
    [task]
  );

  const toFinish = useCallback(async () => {
    if (!user) return;
    await updateTask('finished');
    await updateDocument('users', user?.uid, {
      tasksCompleted: user?.tasksCompleted + 1,
    });
    // increment users completed tasks
  }, []);

  return {
    isAdmin,
    isYourTask,
    toPlanning,
    toAssignment,
    assign,
    unassign,
    developmentMove,
    toFinish,
  };
};

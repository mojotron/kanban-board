// hooks
import { useCallback } from 'react';
import { useUserData } from '../context/UserDataContext';
import { useFirestore } from './useFirestore';
// constants
import { TASK_STAGES_COLLABORATES as DEV_STAGES } from '../constants/taskStages';
// types
import { TaskWithId, Stage } from '../types/taskType';

export const useTaskMove = () => {
  const { document: user } = useUserData();
  const { updateDocument } = useFirestore();

  const updateTask = useCallback(
    async (task: TaskWithId, newStage: Stage, assignToUid?: string) => {
      await updateDocument('tasks', task.id, {
        stage: newStage,
        ...(assignToUid !== undefined && { assignToUid }),
      });
    },
    []
  );

  const isAdmin = useCallback(
    (task: TaskWithId) => user?.uid === task.adminUid,
    []
  );

  const isYourTask = useCallback(
    (task: TaskWithId) => user?.uid === task.assignToUid,
    []
  );

  const isMovable = useCallback((oldStage: Stage, newStage: Stage) => {
    if (oldStage === 'backlog' && newStage === 'assignment') return true;
    if (oldStage === 'assignment' && newStage === 'backlog') return true;
    if (oldStage === 'assignment' && newStage === 'development') return true;
    if (DEV_STAGES.includes(oldStage) && newStage === 'assignment') return true;
    if (DEV_STAGES.includes(oldStage) && DEV_STAGES.includes(newStage))
      return true;
    if (oldStage === 'complete' && newStage === 'finished') return true;
    if (oldStage === 'finished') return false;
    return false;
  }, []);

  const moveTask = async (task: TaskWithId, newStage: Stage) => {
    if (!isMovable(newStage, task.stage)) return;
    if (task.stage === 'backlog' && newStage === 'assignment') {
      await toAssignment(task);
    }
    if (task.stage === 'assignment' && newStage === 'backlog') {
      await toPlanning(task);
    }
    if (task.stage === 'assignment' && newStage === 'development') {
      await assign(task);
    }
    if (DEV_STAGES.includes(task.stage) && newStage === 'assignment') {
      await unassign(task);
    }
    if (DEV_STAGES.includes(task.stage) && DEV_STAGES.includes(newStage)) {
      await developmentMove(task, newStage);
    }
    if (task.stage === 'complete' && newStage === 'finished') {
      await toFinish(task);
    }
    if (task.stage === 'finished') return;
    return;
  };

  const toPlanning = useCallback(async (task: TaskWithId) => {
    await updateTask(task, 'backlog');
  }, []);

  const toAssignment = useCallback(async (task: TaskWithId) => {
    await updateTask(task, 'assignment');
  }, []);

  const assign = useCallback(async (task: TaskWithId) => {
    await updateTask(task, 'development', user?.uid);
  }, []);

  const unassign = useCallback(async (task: TaskWithId) => {
    await updateTask(task, 'assignment', '');
  }, []);

  const developmentMove = useCallback(
    async (task: TaskWithId, newStage: Stage) => {
      if (!DEV_STAGES.includes(newStage)) return;
      if (isYourTask(task)) {
        console.log('hello', newStage);

        await updateTask(task, newStage);
      }
    },
    []
  );

  const toFinish = useCallback(async (task: TaskWithId) => {
    if (!user) return;
    await updateTask(task, 'finished');
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
    isMovable,
    moveTask,
  };
};

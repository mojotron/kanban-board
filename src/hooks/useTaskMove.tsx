// hooks
import { useCallback } from 'react';
import { useUserData } from '../context/UserDataContext';
import { useFirestore } from './useFirestore';
// constants
import { TASK_STAGES_COLLABORATES } from '../constants/taskStages';
// types
import { TaskWithId, Stage } from '../types/taskType';
import { useKanbanStore } from '../store';

export const useTaskMove = (task: TaskWithId) => {
  const { document: user } = useUserData();
  const { updateDocument } = useFirestore();
  const setOpenConfirmModal = useKanbanStore(
    (state) => state.setOpenConfirmModal
  );

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
      if (task.stage === 'backlog' && newStage === 'assignment') return true;
      if (task.stage === 'assignment' && newStage === 'backlog') return true;
      if (task.stage === 'assignment' && newStage === 'development')
        return true;
      if (
        TASK_STAGES_COLLABORATES.includes(task.stage) &&
        newStage === 'assignment'
      )
        return true;
      if (
        TASK_STAGES_COLLABORATES.includes(task.stage) &&
        TASK_STAGES_COLLABORATES.includes(newStage)
      )
        return true;

      if (task.stage === 'complete' && newStage === 'finished') {
        return true;
      }
      if (task.stage === 'finished') {
        setOpenConfirmModal({
          confirmBox: false,
          text: 'Task is finished, make new task!',
          handleConfirm: () => {},
        });
        return false;
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

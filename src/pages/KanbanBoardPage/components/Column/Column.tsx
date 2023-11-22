// hooks
import { DragEvent, useMemo, useState } from 'react';
import { useProject } from '../../../../context/ProjectContext';
import { useKanbanStore } from '../../../../store';
import { useUserData } from '../../../../context/UserDataContext';
// components
import TaskCard from '../../../../components/TaskCard/TaskCard';
// types
import { Stage } from '../../../../types/taskType';
// style
import styles from './Column.module.css';
// utils
import { isTaskMovable } from '../../../../utils/isTaskMovable';
// constants
import { TASK_STAGES_COLLABORATES } from '../../../../constants/taskStages';
import ConfirmPopup from '../../../../components/ConfirmPopup/ConfirmPopup';
import {
  POPUP_ALREADY_ON_TASK,
  POPUP_UNASSIGN_TASK,
} from '../../../../constants/confirmPopupTexts';

type PropsType = {
  columnName: Stage;
};

const Column = ({ columnName }: PropsType) => {
  const { document: user } = useUserData();
  const { tasks, memberHasTask, updateTaskField, assignTask, unassignTask } =
    useProject();

  const draggedTask = useKanbanStore((state) => state.draggedTask);
  const setDraggedTask = useKanbanStore((state) => state.setDraggedTask);

  const [drop, setDrop] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  type ConfirmType = {
    type: 'already-assign' | 'unassign';
    taskId: string;
  };
  const [confirmType, setConfirmType] = useState<ConfirmType | undefined>(
    undefined
  );

  const columnTasks = useMemo(
    () =>
      tasks
        ?.filter((task) => task.stage === columnName)
        .sort((a, b) => {
          if (a.priority === 'high' && b.priority === 'low') return -1;
          if (a.priority === 'very-high' && b.priority === 'low') return -1;
          if (a.priority === 'very-high' && b.priority === 'high') return -1;
          return 1;
        }),
    [tasks]
  );

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!user) return;
    if (draggedTask === null) return;
    const userAlreadyHaveTask = memberHasTask(user.uid);

    if (isTaskMovable(draggedTask.stage, columnName)) {
      if (draggedTask.stage === 'assignment' && columnName === 'development') {
        if (!userAlreadyHaveTask) setDrop(true);
      } else {
        setDrop(true);
      }
    }
  };

  const handleOnDrop = async () => {
    if (!user) return;
    if (draggedTask === null) return;
    const userAlreadyHaveTask = memberHasTask(user.uid);

    if (isTaskMovable(draggedTask.stage, columnName)) {
      // assign task
      if (draggedTask.stage === 'assignment' && columnName === 'development') {
        if (userAlreadyHaveTask) {
          setOpenConfirm(true);
          setConfirmType({ type: 'already-assign', taskId: '' });
        } else {
          assignTask(user.uid, draggedTask.id);
        }
      }
      // unassign task
      else if (
        TASK_STAGES_COLLABORATES.includes(draggedTask.stage) &&
        columnName === 'assignment'
      ) {
        setOpenConfirm(true);
        setConfirmType({ type: 'unassign', taskId: draggedTask.id });
      } else {
        updateTaskField('stage', columnName as Stage, draggedTask.id);
      }
      // change stage
      setDraggedTask(null);
      setDrop(false);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrop(false);
  };

  const handleConfirm = () => {
    if (confirmType?.type === 'already-assign') {
      return () => {};
    }
    if (confirmType?.type === 'unassign') {
      unassignTask(confirmType.taskId);
    }
    setOpenConfirm(false);
    setConfirmType(undefined);
  };

  return (
    <>
      {openConfirm && (
        <ConfirmPopup
          message={
            confirmType?.type === 'already-assign'
              ? POPUP_ALREADY_ON_TASK
              : POPUP_UNASSIGN_TASK
          }
          onCancel={() => {
            setOpenConfirm(false);
            setConfirmType(undefined);
          }}
          onConfirm={handleConfirm}
          alert={confirmType?.type === 'already-assign'}
        />
      )}

      <div
        className={`${styles.column} ${drop ? styles.dropPossible : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleOnDrop}
      >
        <header className={styles.columnHeader}>
          <h2>{columnName}</h2>
        </header>

        <main className={styles.columnTasks}>
          {columnTasks?.map((task) => (
            <div
              key={task.id}
              className={`${styles.columnTaskWrapper} mb--sm`}
              draggable
              onDragStart={() => setDraggedTask(task)}
            >
              <TaskCard taskData={task} />
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default Column;

import { create } from 'zustand';
import { TASK_STAGES } from './constants/taskStages';
import { TaskWithId } from './types/taskType';

export type ConfirmModalState = null | {
  confirmBox: boolean;
  text: string;
  handleConfirm: () => void;
};

type State = {
  // new
  showAside: boolean;
  //
  openNewProjectModal: boolean;
  openNewTaskModal: boolean;
  openViewTaskModal: boolean;
  currentProject: null | string;
  currentTaskStage: null | string;
  draggedTask: null | TaskWithId;
  currentTaskId: string | null;
  // confirm
  openConfirmModal: ConfirmModalState;
};

type Action = {
  // new
  setShowAside: (value: boolean) => void;
  //
  setOpenNewProjectModal: (value: boolean) => void;
  setOpenNewTaskModal: (value: boolean) => void;
  setCurrentProject: (project: string | null) => void;
  setCurrentTaskStage: (column: string | null) => void;
  setDraggedTask: (task: TaskWithId | null) => void;
  setOpenViewTaskModal: (value: boolean) => void;
  setCurrentTaskId: (task: string | null) => void;
  setOpenConfirmModal: (value: ConfirmModalState) => void;
};

export const useKanbanStore = create<State & Action>()((set) => ({
  // new
  showAside: true,
  setShowAside: (value) => set({ showAside: value }),
  //
  openNewProjectModal: false,
  openNewTaskModal: false,
  currentProject: null,
  currentTaskStage: TASK_STAGES[0],
  draggedTask: null,
  openViewTaskModal: false,
  currentTaskId: null,
  openConfirmModal: null,
  setOpenNewProjectModal: (value) => set({ openNewProjectModal: value }),
  setOpenNewTaskModal: (value) => set({ openNewTaskModal: value }),
  setCurrentProject: (project) => set({ currentProject: project }),
  setCurrentTaskStage: (stage: string | null) =>
    set({ currentTaskStage: stage }),
  setDraggedTask: (task: TaskWithId | null) => set({ draggedTask: task }),
  setOpenViewTaskModal: (value: boolean) => set({ openViewTaskModal: value }),
  setCurrentTaskId: (task: string | null) => set({ currentTaskId: task }),

  setOpenConfirmModal: (value) => set({ openConfirmModal: value }),
}));

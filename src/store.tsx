import { create } from 'zustand';
import { TASK_STAGES } from './constants/taskStages';
import { TaskWithId } from './types/taskType';
import { MessageTypeWithId } from './types/messageType';

export type ConfirmModalState = null | {
  confirmBox: boolean;
  text: string;
  handleConfirm: () => void;
};

type State = {
  // new
  showAside: boolean;
  updateMessage: null | MessageTypeWithId;
  //
  openNewProjectModal: boolean;
  currentTaskStage: null | string;
  draggedTask: null | TaskWithId;
  // confirm
  openConfirmModal: ConfirmModalState;
};

type Action = {
  // new
  setShowAside: (value: boolean) => void;
  setUpdateMessage: (value: null | MessageTypeWithId) => void;
  //
  setOpenNewProjectModal: (value: boolean) => void;
  setCurrentTaskStage: (column: string | null) => void;
  setDraggedTask: (task: TaskWithId | null) => void;
  setOpenConfirmModal: (value: ConfirmModalState) => void;
};

export const useKanbanStore = create<State & Action>()((set) => ({
  // new
  showAside: true,
  setShowAside: (value: boolean) => set({ showAside: value }),
  updateMessage: null,
  setUpdateMessage: (value: null | MessageTypeWithId) =>
    set({ updateMessage: value }),
  //
  openNewProjectModal: false,
  currentTaskStage: TASK_STAGES[0],
  draggedTask: null,
  openConfirmModal: null,
  setOpenNewProjectModal: (value) => set({ openNewProjectModal: value }),
  setCurrentTaskStage: (stage: string | null) =>
    set({ currentTaskStage: stage }),
  setDraggedTask: (task: TaskWithId | null) => set({ draggedTask: task }),
  setOpenConfirmModal: (value) => set({ openConfirmModal: value }),
}));

import { create } from 'zustand';
import { TASK_STAGES } from './constants/taskStages';
import { TaskType } from './types/taskType';

type Task = TaskType & { id: string };

type State = {
  openNewProjectModal: boolean;
  openNewTaskModal: boolean;
  openViewTaskModal: boolean;
  currentProject: null | string;
  currentTaskStage: null | string;
  draggedTask: null | string;
  currentTask: Task | null;
};

type Action = {
  setOpenNewProjectModal: (value: boolean) => void;
  setOpenNewTaskModal: (value: boolean) => void;
  setCurrentProject: (project: string | null) => void;
  setCurrentTaskStage: (column: string | null) => void;
  setDraggedTask: (task: string | null) => void;
  setOpenViewTaskModal: (value: boolean) => void;
  setCurrentTask: (task: Task | null) => void;
};

export const useKanbanStore = create<State & Action>()((set) => ({
  openNewProjectModal: false,
  openNewTaskModal: false,
  currentProject: null,
  currentTaskStage: TASK_STAGES[0],
  draggedTask: null,
  openViewTaskModal: false,
  currentTask: null,
  setOpenNewProjectModal: (value) => set({ openNewProjectModal: value }),
  setOpenNewTaskModal: (value) => set({ openNewTaskModal: value }),
  setCurrentProject: (project) => set({ currentProject: project }),
  setCurrentTaskStage: (stage: string | null) =>
    set({ currentTaskStage: stage }),
  setDraggedTask: (task: string | null) => set({ draggedTask: task }),
  setOpenViewTaskModal: (value: boolean) => set({ openViewTaskModal: value }),
  setCurrentTask: (task: Task | null) => set({ currentTask: task }),
}));

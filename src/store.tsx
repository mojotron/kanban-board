import { create } from 'zustand';

type State = {
  openNewProjectModal: boolean;
  openNewTaskModal: boolean;
  currentProject: null | string;
  currentTaskStage: null | string;
};

type Action = {
  setOpenNewProjectModal: (value: boolean) => void;
  setOpenNewTaskModal: (value: boolean) => void;
  setCurrentProject: (project: string | null) => void;
  setCurrentTaskStage: (column: string | null) => void;
};

export const useKanbanStore = create<State & Action>()((set) => ({
  openNewProjectModal: false,
  openNewTaskModal: false,
  currentProject: null,
  currentTaskStage: null,
  setOpenNewProjectModal: (value) => set({ openNewProjectModal: value }),
  setOpenNewTaskModal: (value) => set({ openNewTaskModal: value }),
  setCurrentProject: (project) => set({ currentProject: project }),
  setCurrentTaskStage: (stage: string | null) =>
    set({ currentTaskStage: stage }),
}));

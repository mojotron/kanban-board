import { create } from 'zustand';

type State = {
  openNewProjectModal: boolean;
  currentProject: null | string;
};

type Action = {
  setOpenNewProjectModal: (value: boolean) => void;
  setCurrentProject: (project: string | null) => void;
};

export const useKanbanStore = create<State & Action>()((set) => ({
  openNewProjectModal: false,
  currentProject: null,
  setOpenNewProjectModal: (value) => set({ openNewProjectModal: value }),
  setCurrentProject: (project) => set({ currentProject: project }),
}));

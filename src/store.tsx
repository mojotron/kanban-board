import { create } from 'zustand';

type State = {
  openNewProjectModal: boolean;
};

type Action = {
  setOpenNewProjectModal: (value: boolean) => void;
};

export const useKanbanStore = create<State & Action>()((set) => ({
  openNewProjectModal: false,
  setOpenNewProjectModal: (value) => set({ openNewProjectModal: value }),
}));

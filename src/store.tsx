import { create } from 'zustand';

type StateType = {
  authIsReady: boolean;
};

export const useKanbanState = create<StateType>()((set) => ({
  authIsReady: false,
}));

import { create } from 'zustand';
import { UserType } from './types/userType';

type StateType = {
  authIsReady: boolean;
  userId: string | null;
  user: UserType | null;
  setAuth: (user: any, authIsReady: boolean) => void;
};

export const useStore = create<StateType>()((set) => ({
  authIsReady: false,
  userId: null,
  user: null,
  setAuth: (userId: string, authIsReady: boolean) =>
    set({ userId, authIsReady }),
}));
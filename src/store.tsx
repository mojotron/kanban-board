import { create } from 'zustand';
import { UserType } from './types/userType';
import { useEffect } from 'react';

type StateType = {
  userDoc: null | UserType;
  userId: null | string;
  setUserDoc: (doc: UserType) => void;
  setUserId: (id: string) => void;
};

export const useStore = create<StateType>()((set) => ({
  userId: null,
  userDoc: null,
  setUserDoc: (doc: UserType) => set((state) => ({ ...state, userDoc: doc })),
  setUserId: (id: string) => set({ userId: id }),
}));

import { create } from 'zustand';

type StateType = {
  authIsReady: boolean;
  user: any;
  setAuth: (user: any, authIsReady: boolean) => void;
};

export const useKanbanState = create<StateType>()((set) => ({
  authIsReady: false,
  user: null,
  setAuth: (user: any, authIsReady: boolean) => set({ user, authIsReady }),
}));

// const useSetAuth = () => {
//   const { user, authIsReady } = useAuth();
//   const setAuth = useKanbanState((state) => state.setAuth);

//   setAuth(user, authIsReady);
// };

import { User } from 'firebase/auth';
import { ReactNode, createContext, useReducer } from 'react';

export const AuthContext = createContext({ authIsReady: false, user: null });

type PropsType = {
  children: ReactNode;
};
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return { ...state };
  }
};

export const AuthContextProvider = ({ children }: PropsType) => {
  const [state, dispatch] = useReducer<{
    authIsReady: boolean;
    user: null | User;
  }>(authReducer, { authIsReady: false, user: null });

  return (
    <AuthContext.Provider value={...(state, dispatch)}>
      {children}
    </AuthContext.Provider>
  );
};

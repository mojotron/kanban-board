import { User, onAuthStateChanged } from 'firebase/auth';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { firebaseAuth } from '../firebase/config';

const useAuthSource = () => {
  type AuthState = {
    authIsReady: boolean;
    user: null | User;
  };

  type AuthActions =
    | { type: 'LOGIN'; payload: User }
    | { type: 'LOGOUT'; payload: null }
    | { type: 'AUTH_IS_READY'; payload: User };

  const authReducer = (state: AuthState, action: AuthActions) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, user: action.payload };
      case 'LOGOUT':
        return { ...state, user: action.payload };
      case 'AUTH_IS_READY':
        return { ...state, authIsReady: true, user: action.payload };
      default:
        return { ...state };
    }
  };

  const [{ user, authIsReady }, dispatch] = useReducer(authReducer, {
    authIsReady: false,
    user: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user as User });
      unsubscribe();
    });
  }, []);

  return { user, authIsReady, dispatch };
};

const AuthContext = createContext<ReturnType<typeof useAuthSource>>(
  {} as unknown as ReturnType<typeof useAuthSource>
);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider value={useAuthSource()}>
      {children}
    </AuthContext.Provider>
  );
};

import { ReactNode, createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useOnSnapshotDocument } from '../hooks/useOnSnapshotDocument';
import { UserType } from '../types/userType';

const useUserDataSource = (): {
  document: null | UserType;
  isPending: boolean;
  error: null | string;
} => {
  const { user } = useAuth();
  const { document, isPending, error } = useOnSnapshotDocument<UserType>(
    'users',
    user?.uid
  );

  return { document, isPending, error };
};

const UserDataContext = createContext<ReturnType<typeof useUserDataSource>>(
  {} as unknown as ReturnType<typeof useUserDataSource>
);

export const useUserData = () => {
  return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserDataContext.Provider value={useUserDataSource()}>
      {children}
    </UserDataContext.Provider>
  );
};

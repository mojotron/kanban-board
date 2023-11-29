import { ReactNode, createContext, useCallback, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useOnSnapshotDocument } from '../hooks/useOnSnapshotDocument';
import { UserType } from '../types/userType';
import { useFirestore } from '../hooks/useFirestore';

const useUserDataSource = (): {
  document: undefined | UserType;
  pending: boolean;
  error: null | string;
  toggleUpForWork: () => void;
} => {
  const { user } = useAuth();
  const { updateDocument } = useFirestore();
  const { document, pending, error } = useOnSnapshotDocument<UserType>(
    'users',
    user?.uid
  );

  const toggleUpForWork = useCallback(async () => {
    if (!document) return;
    try {
      updateDocument('users', document?.uid, {
        upForWork: !document?.upForWork,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }, [document]);

  return { document, pending, error, toggleUpForWork };
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

import { useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebase/config';
import { useFirestore } from '../hooks/useFirestore';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const useLogout = () => {
  const { user, dispatch } = useAuth();
  const { updateDocument } = useFirestore();

  const logout = useCallback(async () => {
    try {
      await updateDocument('users', user?.uid as string, {
        online: false,
        lastLoggedOut: Timestamp.fromDate(new Date()),
      });
      await signOut(firebaseAuth);
      dispatch({ type: 'LOGOUT', payload: null });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, [user, updateDocument]);

  return { logout };
};

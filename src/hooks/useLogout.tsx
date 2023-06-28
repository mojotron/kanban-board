import { useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebase/config';
import { useFirestore } from '../hooks/useFirestore';
import { Timestamp } from 'firebase/firestore';
import { useStore } from '../store';

export const useLogout = () => {
  const setAuth = useStore((state) => state.setAuth);
  const userId = useStore((state) => state.userId);
  const { updateDocument } = useFirestore();

  const logout = useCallback(async () => {
    try {
      await updateDocument('users', userId as string, {
        online: false,
        lastLoggedOut: Timestamp.fromDate(new Date()),
      });
      await signOut(firebaseAuth);
      setAuth(null, false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, [userId, updateDocument]);

  return { logout };
};

import { useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebase/config';
import { useFirestore } from '../hooks/useFirestore';
import { Timestamp } from 'firebase/firestore';

export const useLogout = () => {
  const { updateDocument } = useFirestore();
  const logout = useCallback(async () => {
    try {
      await updateDocument('users', 'tKnyvDmLxoVRLFA5aIj0wIMGXnN2', {
        online: false,
        lastLoggedOut: Timestamp.fromDate(new Date()),
      });
      await signOut(firebaseAuth);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, []);

  return { logout };
};

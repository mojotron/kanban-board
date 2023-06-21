import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebase/config';
import { useCallback } from 'react';

export const useLogout = () => {
  const logout = useCallback(async () => {
    try {
      signOut(firebaseAuth);
      console.log('📤📤📤📤📤📤 signed out');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, []);

  return { logout };
};

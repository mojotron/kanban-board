import { useState, useCallback } from 'react';
import { firebaseAuth } from '../firebase/config';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';

export const useLogin = () => {
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);
  const provider = new GithubAuthProvider();

  const login = useCallback(async () => {
    setError(null);
    setIsPending(true);
    // TODO create new doc/update existing
    try {
      const res = await signInWithPopup(firebaseAuth, provider);
      if (!res) {
        throw new Error('Could not complete sign up');
      }
      const user = res.user;
      console.log(user);
      setIsPending(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        setError(error.message);
        setIsPending(false);
      }
    }
  }, []);

  return { login, error, isPending };
};

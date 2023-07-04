import { useState, useCallback } from 'react';
import { useFirestore } from './useFirestore';
import { firebaseAuth } from '../firebase/config';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const useLogin = () => {
  const { dispatch } = useAuth();
  const { documentExist, setDocument, updateDocument } = useFirestore();

  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);
  const provider = new GithubAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  const login = useCallback(async () => {
    setError(null);
    setIsPending(true);
    try {
      const res = await signInWithPopup(firebaseAuth, provider);
      if (!res) {
        throw new Error('Could not complete sign up');
      }
      const user = res.user;

      const userData = {
        userName: user.providerData[0].displayName,
        photoUrl: user.providerData[0].photoURL,
        email: user.providerData[0].email,
        online: true,
        lastLoggedOut: Timestamp.fromDate(new Date()),
      };

      const userExists = await documentExist('users', user.uid);
      if (userExists) {
        // rewrite user document in case user change his/her github user data
        await updateDocument('users', user.uid, userData);
      } else {
        // create user doc
        await setDocument('users', user.uid, { ...userData, projects: [] });
      }
      setIsPending(false);
      dispatch({ type: 'LOGIN', payload: user });
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

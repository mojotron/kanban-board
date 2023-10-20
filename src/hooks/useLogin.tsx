import { useState, useCallback } from 'react';
import { useFirestore } from './useFirestore';
import { firebaseAuth } from '../firebase/config';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { UserType } from '../types/userType';

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
      const userExists = await documentExist('users', user.uid);

      if (userExists) {
        // rewrite user document in case user change his/her github user data
        await updateDocument('users', user.uid, {
          userName: user.providerData[0].displayName,
          photoUrl: user.providerData[0].photoURL,
          email: user.providerData[0].email,
          online: true,
          lastLoggedOut: Timestamp.fromDate(new Date()),
        });
      } else {
        // create user doc
        await setDocument<UserType>('users', user.uid, {
          uid: user.uid,
          userName: user.providerData[0].displayName || '',
          photoUrl: user.providerData[0].photoURL || '',
          email: user.providerData[0].email || '',
          online: true,
          managingProjects: [],
          collaboratingProjects: [],
          projectsCompleted: 0,
          tasksCompleted: 0,
          lastLoggedOut: Timestamp.fromDate(new Date()),
          createdAt: Timestamp.fromDate(new Date()),
          notifications: [],
        });
      }
      setIsPending(false);
      dispatch({ type: 'LOGIN', payload: user });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  }, []);

  return { login, error, isPending };
};

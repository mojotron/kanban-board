import { useState, useCallback } from 'react';
import { useFirestore } from './useFirestore';
import { firebaseAuth } from '../firebase/config';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export const useLogin = () => {
  const { addDocument, documentExist, setDocument } = useFirestore();

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

      const userExists = await documentExist('users', user.uid);
      if (userExists) {
        // updates doc
      } else {
        // create user doc
        const userData = {
          userName: user.providerData[0].displayName,
          photoUrl: user.providerData[0].photoURL,
          email: user.providerData[0].email,
          projects: [],
          online: true,
          lastLoggedOut: Timestamp.fromDate(new Date()),
        };
        await setDocument('users', user.uid, userData);
      }
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

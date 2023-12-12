import { useEffect, useState } from 'react';
import { useFirestore } from './useFirestore';
import type { UserWithId } from '../types/userType';

export const useGetUserData = (userDocId: string) => {
  const { error, pending, getDocument } = useFirestore();
  const [isCanceled, setIsCanceled] = useState(false);
  const [data, setData] = useState<undefined | UserWithId>(undefined);

  useEffect(() => {
    getDocument<UserWithId>('users', userDocId).then((res) => {
      if (!isCanceled) setData(res);
    });

    return () => setIsCanceled(true);
  }, [userDocId]);

  return { error, pending, data };
};

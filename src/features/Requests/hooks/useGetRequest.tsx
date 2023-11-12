import { useEffect, useState } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { UserWithId } from '../../../types/userType';

export const useGetRequest = (docId: string) => {
  const { error, pending, getDocument } = useFirestore();
  const [isCanceled, setIsCanceled] = useState(false);
  const [data, setData] = useState<undefined | UserWithId>(undefined);

  useEffect(() => {
    getDocument<UserWithId>('users', docId).then((res) => {
      if (!isCanceled) setData(res);
    });

    return () => setIsCanceled(true);
  }, [docId]);

  return { error, pending, data };
};

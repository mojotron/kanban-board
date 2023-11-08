import { useEffect, useState } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { RequestOption } from '../../../types/requestType';
import { ProjectWithId } from '../../../types/projectType';
import { UserWithId } from '../../../types/userType';

export const useGetRequestOption = (
  collectionName: RequestOption,
  docId: string
) => {
  const { error, pending, getDocument } = useFirestore();
  const [isCanceled, setIsCanceled] = useState(false);
  const [data, setData] = useState<undefined | UserWithId | ProjectWithId>(
    undefined
  );

  useEffect(() => {
    if (collectionName === 'projects') {
      getDocument<ProjectWithId>(collectionName, docId).then((res) => {
        if (!isCanceled) setData(res);
      });
    }
    if (collectionName === 'users') {
      getDocument<UserWithId>(collectionName, docId).then((res) => {
        if (!isCanceled) setData(res);
      });
    }

    return () => setIsCanceled(true);
  }, [collectionName, docId]);

  return { error, pending, data };
};

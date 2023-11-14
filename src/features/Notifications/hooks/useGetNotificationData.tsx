import { useEffect, useState } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';

export const useGetNotificationData = <DocType,>(
  collectionName: string,
  docId: string
) => {
  const { getDocument, error, pending } = useFirestore();
  const [data, setData] = useState<undefined | DocType>(undefined);

  useEffect(() => {
    getDocument<DocType>(collectionName, docId).then((docData) =>
      setData(docData)
    );
  }, [docId, collectionName, getDocument]);

  return { error, pending, data };
};

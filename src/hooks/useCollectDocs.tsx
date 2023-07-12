import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseFirestore } from '../firebase/config';

export const useCollectDocs = <T,>(
  docsIdList: undefined | string[],
  collectionName: string
) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [documents, setDocuments] = useState<null | T[]>(null);
  const [isCancelled, setIsCanceled] = useState(false);

  useEffect(() => {
    if (!Array.isArray(docsIdList)) return;

    const getDocuments = async () => {
      try {
        const documentsResponse = await Promise.all(
          docsIdList.map(async (id) => {
            const docRef = doc(firebaseFirestore, collectionName, id);
            const docSnapshot = await getDoc(docRef);
            return { ...docSnapshot.data(), id: docSnapshot.id };
          })
        );
        if (!isCancelled) {
          setIsPending(false);
          setDocuments(documentsResponse as T[]);
        }
      } catch (error) {
        if (error instanceof Error && !isCancelled) {
          console.log(error);
          setIsPending(false);
          setError(error.message);
        }
      }
    };

    getDocuments();

    return () => setIsCanceled(true);
  }, [docsIdList, collectionName]);

  return { isPending, error, documents };
};

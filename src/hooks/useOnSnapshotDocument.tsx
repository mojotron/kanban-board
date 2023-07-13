import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firebaseFirestore } from '../firebase/config';

export const useOnSnapshotDocument = <T,>(
  collectionName: string,
  docId: undefined | null | string
) => {
  const [document, setDocument] = useState<null | T>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!docId) return;
    setIsPending(true);

    let unsubscribe: Unsubscribe;

    const getDocument = async () => {
      try {
        const docRef = doc(firebaseFirestore, collectionName, docId);
        unsubscribe = onSnapshot(docRef, (doc) => {
          const data = { ...doc.data(), id: doc.id };
          setIsPending(false);
          setError(null);
          setDocument(data as T);
        });
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          setIsPending(false);
        }
      }
    };

    getDocument();

    return () => unsubscribe();
  }, [collectionName, docId]);

  return { document, isPending, error };
};

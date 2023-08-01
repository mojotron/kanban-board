import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firebaseFirestore } from '../firebase/config';

export const useOnSnapshotDocument = <T,>(
  collectionName: string,
  docId: undefined | null | string
) => {
  const [document, setDocument] = useState<undefined | T>(undefined);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!docId) return;
    setPending(true);

    let unsubscribe: Unsubscribe;

    const getDocument = async () => {
      try {
        const docRef = doc(firebaseFirestore, collectionName, docId);
        unsubscribe = onSnapshot(docRef, (doc) => {
          const data = { ...doc.data(), id: doc.id };
          setPending(false);
          setError(null);
          setDocument(data as T);
        });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          setError(error.message);
          setPending(false);
        }
      }
    };

    getDocument();

    return () => unsubscribe();
  }, [collectionName, docId]);

  return { document, pending, error };
};

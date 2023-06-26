import { useState, useCallback, useEffect } from 'react';
import { collection, addDoc, Timestamp, getDoc, doc } from 'firebase/firestore';
import { firebaseFirestore } from '../firebase/config';

export const useFirestore = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const addDocument = useCallback(async (collectionName: string, data: any) => {
    const colRef = collection(firebaseFirestore, collectionName);
    setPending(true);
    try {
      const createdAt = Timestamp.fromDate(new Date());
      const newDoc = await addDoc(colRef, { ...data, createdAt });
      if (!isCanceled) {
        setPending(false);
        setError(null);
      }
      return newDoc;
    } catch (error) {
      if (!isCanceled && error instanceof Error) {
        setPending(false);
        setError(error.message);
      }
    }
  }, []);

  const updateDocument = useCallback(() => {}, []);

  const deleteDocument = useCallback(() => {}, []);

  const documentExist = useCallback(
    async (collectionName: string, docId: string) => {
      try {
        const userDocRef = await getDoc(
          doc(firebaseFirestore, `${collectionName}/${docId}`)
        );
        return userDocRef.exists();
      } catch (error) {
        throw error;
      }
    },
    []
  );

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return {
    pending,
    error,
    addDocument,
    updateDocument,
    deleteDocument,
    documentExist,
  };
};

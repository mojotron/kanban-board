import { useState, useCallback, useEffect } from 'react';
import {
  collection,
  addDoc,
  Timestamp,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { firebaseFirestore } from '../firebase/config';

export const useFirestore = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const addDocument = useCallback(
    async <T,>(collectionName: string, data: T) => {
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
          console.log(error.message);
          setPending(false);
          setError(error.message);
        }
      }
    },
    []
  );

  const setDocument = useCallback(
    async (collectionName: string, docId: string, data: any) => {
      try {
        const docRef = doc(firebaseFirestore, collectionName, docId);
        const createdAt = Timestamp.fromDate(new Date());
        await setDoc(docRef, { ...data, createdAt });
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const updateDocument = useCallback(
    async (collectionName: string, docId: string, data: any) => {
      try {
        setPending(true);
        const docRef = doc(firebaseFirestore, collectionName, docId);
        await updateDoc(docRef, { ...data });
        const updatedDoc = await getDoc(docRef);
        if (!isCanceled) {
          setError(null);
          setPending(false);
        }
        return updatedDoc;
      } catch (error) {
        if (!isCanceled && error instanceof Error) {
          setError(error.message);
          setPending(false);
        }
      }
    },
    []
  );

  const deleteDocument = useCallback(
    async (collectionName: string, docId: string) => {
      try {
        const docRef = doc(firebaseFirestore, collectionName, docId);
        await deleteDoc(docRef);
      } catch (error) {
        throw error;
      }
    },
    []
  );

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
    setDocument,
    updateDocument,
    deleteDocument,
    documentExist,
  };
};

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
      setError(null);
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
    async <T,>(collectionName: string, docId: string, data: T) => {
      setPending(true);
      setError(null);
      try {
        const docRef = doc(firebaseFirestore, collectionName, docId);
        const createdAt = Timestamp.fromDate(new Date());
        await setDoc(docRef, { ...data, createdAt });
        if (!isCanceled) {
          setPending(false);
          setError(null);
        }
      } catch (error) {
        if (!isCanceled && error instanceof Error) {
          console.log(error.message);
          setError(error.message);
          setPending(false);
        }
      }
    },
    []
  );

  const updateDocument = useCallback(
    async (collectionName: string, docId: string, data: any) => {
      try {
        setPending(true);
        setError(null);
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
          console.log(error);
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

  const getDocument = useCallback(
    async <T,>(collectionName: string, docId: string) => {
      setPending(true);
      setError(null);
      try {
        const docRef = doc(firebaseFirestore, collectionName, docId);
        const docData = await getDoc(docRef);
        if (!isCanceled) {
          setError(null);
          setPending(false);
        }
        return { ...docData.data(), id: docData.id } as T;
      } catch (error) {
        if (!isCanceled && error instanceof Error) {
          console.log(error.message);
          setError(error.message);
          setPending(false);
        }
      }
    },
    []
  );

  const deleteListOfDocuments = useCallback(
    async (collectionName: string, docIdList: string[]) => {
      try {
        await Promise.all(
          docIdList.map(async (docId) => {
            await deleteDoc(doc(firebaseFirestore, collectionName, docId));
          })
        );
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
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
    getDocument,
    deleteListOfDocuments,
  };
};

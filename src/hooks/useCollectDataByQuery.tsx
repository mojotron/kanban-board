import { firebaseFirestore } from '../firebase/config';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter,
} from 'firebase/firestore';
import { useState, useCallback } from 'react';

export const useCollectDataByQuery = (
  docLimit: number,
  collectionName: string,
  queryParam: string | undefined
) => {
  const [lastDocument, setLastDocument] =
    useState<null | QueryDocumentSnapshot<DocumentData>>(null);
  const [endOfDocuments, setEndOfDocuments] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const getFirst = useCallback(async () => {
    try {
      setIsFetching(true);
      const colRef = collection(firebaseFirestore, collectionName);
      const q = query(colRef, orderBy('createdAt', 'desc'), limit(docLimit));

      const data = await getDocs(q);

      if (data.empty) {
        setEndOfDocuments(true);
        setIsFetching(false);
        return -1;
      }

      const results: any = [];
      data.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setLastDocument(data.docs[data.docs.length - 1]);
      return results;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsFetching(false);
    }
  }, [firebaseFirestore, collectionName, queryParam, docLimit]);

  const getNext = useCallback(async () => {
    if (endOfDocuments) return -1;
    if (isFetching) return -1;
    try {
      setIsFetching(true);
      const colRef = collection(firebaseFirestore, collectionName);

      const q = query(
        colRef,
        orderBy('createdAt', 'desc'),
        startAfter(lastDocument || 0),
        limit(docLimit)
      );

      const data = await getDocs(q);
      if (data.empty) {
        setEndOfDocuments(true);
        setIsFetching(false);
        return -1;
      }

      const results: any = [];
      data.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setLastDocument(data.docs[data.docs.length - 1]);
      return results;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsFetching(false);
    }
  }, [firebaseFirestore, collectionName, queryParam, docLimit, lastDocument]);

  return { getFirst, getNext, isFetching, error };
};

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
  const [lastDocument, setLastDocument] = useState<any>(null);
  const [endOfDocuments, setEndOfDocuments] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const getFirst = useCallback(async () => {
    try {
      setIsFetching(true);
      const colRef = collection(firebaseFirestore, collectionName);
      const q = query(colRef, orderBy('createdAt', 'desc'), limit(docLimit));

      const data = await getDocs(q);

      if (data.empty) {
        setEndOfDocuments(true);
        return -1;
      }

      const results: any = [];

      data.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      setIsFetching(false);
      console.log('setting last doc');
      setLastDocument(data.docs[data.docs.length - 1]);

      return results;
    } catch (error) {
      throw error;
    }
  }, [firebaseFirestore, collectionName, queryParam, docLimit]);

  const getNext = useCallback(async () => {
    console.log('last doc is', lastDocument);

    console.log(endOfDocuments);

    if (endOfDocuments) return -1;
    if (isFetching) return -1;
    try {
      setIsFetching(true);
      const colRef = collection(firebaseFirestore, collectionName);
      console.log('is there last doc', lastDocument);

      const q = query(
        colRef,
        orderBy('createdAt', 'desc'),
        startAfter(lastDocument || 0),
        limit(docLimit)
      );

      console.log('x');
      const data = await getDocs(q);
      console.log(data.size);

      if (data.empty) {
        setEndOfDocuments(true);
        return -1;
      }

      const results: any = [];

      data.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      setLastDocument(data.docs[data.docs.length - 1]);
      setIsFetching(false);

      return results;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }, [firebaseFirestore, collectionName, queryParam, docLimit, lastDocument]);

  return { getFirst, getNext };
};

import { firebaseFirestore } from '../firebase/config';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { useState, useCallback } from 'react';

export const useCollectDataByQuery = (
  docLimit: number,
  collectionName: string,
  queryParam: string | undefined
) => {
  const [lastDocument, setLastDocument] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [endOfDocuments, setEndOfDocuments] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const getFirst = useCallback(async () => {
    try {
      setIsFetching(true);
      console.log('yo');
      const colRef = collection(firebaseFirestore, collectionName);
      const q = queryParam
        ? query(
            colRef,
            orderBy('createdAt', 'desc'),
            orderBy(queryParam, 'desc'),
            limit(docLimit)
          )
        : query(colRef, orderBy('createdAt', 'desc'), limit(docLimit));

      const data = await getDocs(q);

      if (data.empty) {
        setEndOfDocuments(true);
        return -1;
      }

      const results: any = [];
      let last: QueryDocumentSnapshot<DocumentData>;

      data.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
        last = doc;
      });

      setLastDocument(last!);
      setIsFetching(false);

      return results;
    } catch (error) {}
  }, [firebaseFirestore, collectionName, queryParam, docLimit]);

  const getNext = useCallback(async () => {
    try {
    } catch (error) {}
  }, []);

  return { getFirst, getNext };
};

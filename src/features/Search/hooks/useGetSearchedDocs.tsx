import {
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { firebaseFirestore } from '../../../firebase/config';

const DOC_LIMIT = 2;

export const useGetSearchedDocs = <T,>(
  collectionName: string, // from urlParam
  filter: string | undefined, //from user
  queryParam: string | undefined // from user
): {
  getFirst: () => void;
  getNext: () => void;
  isFetching: boolean;
  error: null | string;
  documents: undefined | T[];
} => {
  const [lastDocument, setLastDocument] =
    useState<null | QueryDocumentSnapshot>(null);
  const [endOfDocuments, setEndOfDocuments] = useState(false);
  //
  const [documents, setDocuments] = useState<undefined | T[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<null | string>(null);
  //
  const getFirst = useCallback(async () => {
    try {
      setIsFetching(true);
      const first = query(
        collection(firebaseFirestore, collectionName),
        orderBy('createdAt', 'desc'),
        limit(DOC_LIMIT)
      );
      const docSnapshots = await getDocs(first);
      if (docSnapshots.empty) {
        setEndOfDocuments(true);
      } else {
        setDocuments(
          docSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id } as T))
        );
        setLastDocument(docSnapshots.docs[docSnapshots.docs.length - 1]);
      }
      setIsFetching(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setIsFetching(false);
      }
    }
  }, [collectionName]);

  const getNext = useCallback(async () => {
    if (endOfDocuments || isFetching) return;
    try {
      setIsFetching(true);
      setIsFetching(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setIsFetching(false);
      }
    }
  }, []);

  return { getFirst, getNext, isFetching, error, documents };
};

import { QueryDocumentSnapshot } from 'firebase/firestore';
import { useCallback, useState } from 'react';

const DOC_LIMIT = 5;

export const useGetSearchedDocs = (
  queryParam: string,
  filter: string
): {
  getFirst: () => void;
  getNext: () => void;
  isFetching: boolean;
  error: null | string;
} => {
  const [lastDocument, setLastDocument] =
    useState<null | QueryDocumentSnapshot>(null);
  const [endOfDocuments, setEndOfDocuments] = useState(false);
  //
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<null | string>(null);
  //
  const getFirst = useCallback(() => {}, []);
  const getNext = useCallback(() => {}, []);

  return { getFirst, getNext, isFetching, error };
};

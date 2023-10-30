import {
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  DocumentData,
} from 'firebase/firestore';
import { useCallback, useReducer, useEffect, useRef } from 'react';
import { firebaseFirestore } from '../../../firebase/config';

const DOC_LIMIT = 2;

export const useSearchProject = <DocType, FilterType>(
  collectionName: string,
  defaultFilter: FilterType
): {
  documents: DocType[];
  error: null | string;
  isFetching: boolean;
  getNext: () => Promise<void>;
  endOfDocuments: boolean;
  filter: FilterType;
  updateFilter: (value: FilterType) => void;
  updateSearchTerm: (value: string) => void;
} => {
  type StateType = {
    filter: FilterType;
    searchTerm: string;
    lastDocument: QueryDocumentSnapshot<DocumentData> | null;
    endOfDocuments: boolean;
    isFetching: boolean;
    error: null | string;
    documents: DocType[];
  };

  type ActionType =
    | { type: 'SET_SEARCH_TERM'; payload: string }
    | { type: 'SET_FILTER'; payload: FilterType }
    | { type: 'SET_END_OF_DOCUMENTS'; payload: boolean }
    | { type: 'SET_FETCHING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: null | string }
    | {
        type: 'SET_DOCUMENTS';
        payload: {
          data: DocType[];
          lastDoc: QueryDocumentSnapshot<DocumentData>;
        };
      };
  const [
    { isFetching, error, endOfDocuments, lastDocument, documents, filter },
    dispatch,
  ] = useReducer(
    (state: StateType, action: ActionType) => {
      switch (action.type) {
        case 'SET_SEARCH_TERM':
          return { ...state, searchTerm: action.payload };
        case 'SET_FILTER':
          return { ...state, filter: action.payload };
        case 'SET_END_OF_DOCUMENTS':
          return {
            ...state,
            endOfDocuments: action.payload,
            isFetching: false,
          };
        case 'SET_FETCHING':
          return { ...state, isFetching: action.payload };
        case 'SET_ERROR':
          return { ...state, error: action.payload, isFetching: false };
        case 'SET_DOCUMENTS':
          const newDocs = [
            ...state.documents,
            ...action.payload.data,
          ] as DocType[];
          return {
            ...state,
            documents: newDocs,
            lastDocument: action.payload.lastDoc,
            isFetching: false,
          };
      }
    },
    {
      searchTerm: '',
      filter: defaultFilter,
      lastDocument: null,
      endOfDocuments: false,
      isFetching: false,
      error: null,
      documents: [],
    }
  );

  // FLAG FOR INITIAL RENDER, ref is not lost with rerenders
  const isInit = useRef(false);

  const getFirst = useCallback(async () => {
    try {
      dispatch({ type: 'SET_FETCHING', payload: false });

      const first = query(
        collection(firebaseFirestore, collectionName),
        orderBy('createdAt', 'desc'),
        limit(DOC_LIMIT)
      );
      const docSnapshots = await getDocs(first);
      if (docSnapshots.empty) {
        dispatch({ type: 'SET_END_OF_DOCUMENTS', payload: true });
      } else {
        const data: DocType[] = [];
        docSnapshots.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id } as DocType);
        });
        const lastDoc = docSnapshots.docs[docSnapshots.docs.length - 1];

        dispatch({ type: 'SET_DOCUMENTS', payload: { data, lastDoc } });
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    }
  }, [collectionName]);

  const getNext = useCallback(async () => {
    if (endOfDocuments === true) return;
    if (isFetching === true) return;

    try {
      dispatch({ type: 'SET_FETCHING', payload: false });

      const next = query(
        collection(firebaseFirestore, collectionName),
        orderBy('createdAt', 'desc'),
        startAfter(lastDocument || 0),
        limit(DOC_LIMIT)
      );

      const docSnapshots = await getDocs(next);

      if (docSnapshots.empty) {
        dispatch({ type: 'SET_END_OF_DOCUMENTS', payload: true });
        return;
      }
      const data: DocType[] = [];
      docSnapshots.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id } as DocType);
      });
      const lastDoc = docSnapshots.docs[docSnapshots.docs.length - 1];

      dispatch({ type: 'SET_DOCUMENTS', payload: { data, lastDoc } });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    }
  }, [collectionName, lastDocument, endOfDocuments]);

  useEffect(() => {
    if (isInit.current === true) return;
    getFirst();
    isInit.current = true;
  }, []);

  const updateSearchTerm = (value: string) => {};
  const updateFilter = (value: FilterType) => {};

  return {
    documents,
    getNext,
    isFetching,
    error,
    endOfDocuments,
    filter,
    updateSearchTerm,
    updateFilter,
  };
};

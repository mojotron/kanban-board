import { useCallback, useEffect, useMemo, useReducer } from 'react';
// types
import type { SearchCollections } from '../types/filterTypes';
import {
  collection,
  DocumentData,
  orderBy,
  query,
  limit,
  QueryDocumentSnapshot,
  getDocs,
  startAfter,
  CollectionReference,
  where,
  QueryLimitConstraint,
} from 'firebase/firestore';
import { firebaseFirestore } from '../../../firebase/config';
import { UserWithId } from '../../../types/userType';
import { ProjectWithId } from '../../../types/projectType';

const DOC_LIMIT: number = 2;

const calcFirstQuery = (
  collectionRef: CollectionReference<DocumentData>,
  filter: string,
  searchTerm: string,
  docLimit: number
) => {
  if (filter === '') {
    return query(collectionRef, orderBy('createdAt', 'desc'), limit(docLimit));
  }
  if (filter === 'tag') {
    return query(
      collectionRef,
      orderBy('cratedAt', 'desc'),
      where(searchTerm, 'in', 'tags'),
      limit(docLimit)
    );
  }
};

type DocType = UserWithId | ProjectWithId;

type StateType = {
  filter: string;
  searchTerm: string;
  isFetching: boolean;
  documents: DocType[];
  error: null | string;
  lastDocument: QueryDocumentSnapshot<DocumentData> | null;
  endOfDocuments: boolean;
};
type ActionType =
  | { type: 'filter/update'; payload: string }
  | { type: 'query/update'; payload: string }
  | { type: 'documents/fetching' }
  | { type: 'documents/error'; payload: string }
  | {
      type: 'documents/load';
      payload: {
        documents: DocType[];
        lastDocument: QueryDocumentSnapshot<DocumentData>;
      };
    }
  | { type: 'document/end' };

export const useSearch = (collectionName: SearchCollections | undefined) => {
  // obligatory(url param)| optional(user input)
  // [collectionName      /filter      /query]
  const [
    { filter, searchTerm, documents, endOfDocuments, lastDocument, isFetching },
    dispatch,
  ] = useReducer(
    (state: StateType, action: ActionType) => {
      switch (action.type) {
        case 'filter/update':
          return { ...state, filter: action.payload };
        case 'query/update':
          return { ...state, searchTerm: action.payload };
        case 'documents/fetching':
          return { ...state, isFetching: true };
        case 'documents/error':
          return { ...state, error: action.payload, isFetching: false };
        case 'documents/load':
          const newDocs = [...state.documents, ...action.payload.documents];
          return {
            ...state,
            documents: newDocs,
            lastDocument: action.payload.lastDocument,
            isFetching: false,
          };
        case 'document/end':
          return {
            ...state,
            lastDocument: null,
            isFetching: false,
            endOfDocuments: true,
          };
        default:
          return { ...state };
      }
    },
    {
      filter: 'tag',
      searchTerm: '',
      isFetching: false,
      documents: [],
      error: null,
      lastDocument: null,
      endOfDocuments: false,
    }
  );

  const collectionRef = useMemo(() => {
    if (!collectionName) return undefined;
    return collection(firebaseFirestore, collectionName);
  }, [collectionName]);

  const getFirst = useCallback(async () => {
    if (!collectionRef) return;
    try {
      dispatch({ type: 'documents/fetching' });
      const first = query(
        collectionRef,
        orderBy('createdAt', 'desc'),
        limit(DOC_LIMIT)
      );
      const docsSnapshot = await getDocs(first);
      if (docsSnapshot.empty) {
        dispatch({ type: 'document/end' });
      } else {
        const data: DocType[] = [];
        docsSnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id } as DocType);
        });
        const lastDoc = docsSnapshot.docs[docsSnapshot.docs.length - 1];
        dispatch({
          type: 'documents/load',
          payload: { documents: data, lastDocument: lastDoc },
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: 'documents/error',
          payload: 'Unable to load documents, pleas try again later!',
        });
      }
    }
  }, [collectionName]);

  const getNext = useCallback(async () => {
    if (!collectionRef) return;
    if (endOfDocuments === true) return;
    if (isFetching === true) return;

    try {
      dispatch({ type: 'documents/fetching' });

      const next = query(
        collectionRef,
        orderBy('createdAt', 'desc'),
        startAfter(lastDocument || 0),
        limit(DOC_LIMIT)
      );

      const docSnapshots = await getDocs(next);

      if (docSnapshots.empty) {
        dispatch({ type: 'document/end' });
        return;
      }
      const data: DocType[] = [];
      docSnapshots.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id } as DocType);
      });
      const lastDoc = docSnapshots.docs[docSnapshots.docs.length - 1];

      dispatch({
        type: 'documents/load',
        payload: { documents: data, lastDocument: lastDoc },
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: 'documents/error',
          payload: 'Unable to load documents, pleas try again later!',
        });
      }
    }
  }, [collectionName, lastDocument, endOfDocuments]);

  const updateFilter = useCallback((newFilter: string) => {
    dispatch({ type: 'filter/update', payload: newFilter });
  }, []);

  const updateSearchTerm = useCallback((newQuery: string) => {
    dispatch({ type: 'query/update', payload: newQuery });
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timer;
    if (searchTerm === '') {
      getFirst();
    } else {
      const debounce = () => {
        timeout = setTimeout(() => {
          console.log('get data', query);
          // TODO load first
        }, 1000);
      };

      debounce();
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [searchTerm]);

  return {
    filter,
    updateFilter,
    searchTerm,
    updateSearchTerm,
    documents,
    isFetching,
    endOfDocuments,
    getNext,
  };
};

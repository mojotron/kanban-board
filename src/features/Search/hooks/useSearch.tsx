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
} from 'firebase/firestore';
import { firebaseFirestore } from '../../../firebase/config';
import { UserWithId } from '../../../types/userType';
import { ProjectWithId } from '../../../types/projectType';

const DOC_LIMIT: number = 2;

const calcFirstQuery = (
  collectionRef: CollectionReference<DocumentData>,
  filter: string,
  searchTerm: string,
  docLimit: number,
  first: boolean,
  lastDocument?: QueryDocumentSnapshot<DocumentData> | null
) => {
  if (searchTerm === '') {
    if (first) {
      return query(
        collectionRef,
        orderBy('createdAt', 'desc'),
        limit(docLimit)
      );
    } else {
      return query(
        collectionRef,
        orderBy('createdAt', 'desc'),
        startAfter(lastDocument || 0),
        limit(docLimit)
      );
    }
  }
  if (filter === 'tags') {
    if (first) {
      return query(
        collectionRef,
        where(filter, 'array-contains', searchTerm),
        limit(docLimit)
      );
    } else {
      return query(
        collectionRef,
        where(filter, 'array-contains', searchTerm),
        startAfter(lastDocument || 0),
        limit(docLimit)
      );
    }
  }
  if (filter === 'name' || filter === 'userName') {
    const end = searchTerm.replace(/.$/, (c) =>
      String.fromCharCode(c.charCodeAt(0) + 1)
    );

    if (first) {
      return query(
        collectionRef,
        where(filter, '>=', searchTerm),
        where(filter, '<', end),
        limit(docLimit)
      );
    } else {
      return query(
        collectionRef,
        where(filter, '>=', searchTerm),
        where(filter, '<', end),
        startAfter(lastDocument || 0),
        limit(docLimit)
      );
    }
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
  | { type: 'document/end' }
  | { type: 'document/reset' };

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
        case 'document/reset':
          return {
            ...state,
            isFetching: false,
            documents: [],
            error: null,
            lastDocument: null,
            endOfDocuments: false,
          };
        default:
          return { ...state };
      }
    },
    {
      filter: 'tags',
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
    console.log('x');

    if (collectionRef === undefined) return;
    try {
      dispatch({ type: 'document/reset' });
      dispatch({ type: 'documents/fetching' });

      const first = calcFirstQuery(
        collectionRef,
        filter,
        searchTerm,
        DOC_LIMIT,
        true,
        undefined
      );

      if (first === undefined) return;

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
  }, [filter, searchTerm]);

  const getNext = useCallback(async () => {
    if (!collectionRef) return;
    if (endOfDocuments === true) return;
    if (isFetching === true) return;

    try {
      dispatch({ type: 'documents/fetching' });

      const next = calcFirstQuery(
        collectionRef,
        filter,
        searchTerm,
        DOC_LIMIT,
        false,
        lastDocument
      );
      if (next === undefined) return;

      const docSnapshots = await getDocs(next);

      if (docSnapshots.empty) {
        console.log('HELLO');
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
  }, [filter, searchTerm, lastDocument, endOfDocuments]);

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
          console.log('try');

          getFirst();
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
    getFirst,
    getNext,
  };
};

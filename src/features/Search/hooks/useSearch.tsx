import { useCallback, useEffect, useReducer } from 'react';
// types
import type { SearchCollections } from '../types/filterTypes';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

type StateType = {
  filter: string;
  query: string;
  isFetching: boolean;
  documents: QueryDocumentSnapshot<DocumentData>[];
  error: null | string;
  lastDocument: QueryDocumentSnapshot<DocumentData> | null;
};
type ActionType =
  | { type: 'filter/update'; payload: string }
  | { type: 'query/update'; payload: string }
  | { type: 'documents/fetching' }
  | { type: 'documents/error'; payload: string }
  | {
      type: 'documents/load';
      payload: {
        documents: QueryDocumentSnapshot<DocumentData>[];
        lastDocument: QueryDocumentSnapshot<DocumentData>;
      };
    }
  | { type: 'document/end'; payload: boolean };

export const useSearch = (collectionName: SearchCollections | undefined) => {
  // obligatory(url param)| optional(user input)
  // [collectionName      /filter      /query]
  const [{ filter, query }, dispatch] = useReducer(
    (state: StateType, action: ActionType) => {
      switch (action.type) {
        case 'filter/update':
          return { ...state, filter: action.payload };
        case 'query/update':
          return { ...state, query: action.payload };
        case 'documents/fetching':
          return { ...state, isFetching: true };
        case 'documents/error':
          return { ...state, error: action.payload };
        default:
          return { ...state };
      }
    },
    {
      filter: 'tag',
      query: '',
      isFetching: false,
      documents: [],
      error: null,
      lastDocument: null,
    }
  );

  const getFirst = useCallback(async () => {
    try {
    } catch (error) {
      if (error instanceof Error) {
      }
    }
  }, [collectionName]);

  const getNext = useCallback(async () => {
    try {
    } catch (error) {
      if (error instanceof Error) {
      }
    }
  }, [collectionName]);

  const updateFilter = useCallback((newFilter: string) => {
    dispatch({ type: 'filter/update', payload: newFilter });
  }, []);

  const updateQuery = useCallback((newQuery: string) => {
    dispatch({ type: 'query/update', payload: newQuery });
  }, []);

  useEffect(() => {
    if (query === '') return;
    let timeout: NodeJS.Timer;

    const debounce = () => {
      timeout = setTimeout(() => {
        console.log('get data', query);
        // TODO load first
      }, 1000);
    };

    debounce();

    return () => clearTimeout(timeout);
  }, [query]);

  return { filter, updateFilter, query, updateQuery };
};

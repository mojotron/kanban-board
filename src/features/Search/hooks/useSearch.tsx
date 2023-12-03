import { useCallback, useEffect, useReducer } from 'react';
// types
import type { SearchCollections } from '../types/filterTypes';

type StateType = {
  filter: string;
  query: string;
};
type ActionType =
  | { type: 'filter/update'; payload: string }
  | { type: 'query/update'; payload: string };

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
        default:
          return { ...state };
      }
    },
    {
      filter: 'tag',
      query: '',
    }
  );

  const getFirst = () => {};
  const getNext = () => {};

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
      }, 3000);
    };

    debounce();

    return () => clearTimeout(timeout);
  }, [query]);

  return { filter, updateFilter, query, updateQuery };
};

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
import {
  useCallback,
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { firebaseFirestore } from '../../../firebase/config';
import { ProjectFilterTypes } from '../types/filterTypes';
import { ProjectWithId } from '../../../types/projectType';

const DOC_LIMIT = 2;

// SEARCH SOURCE
type StateType = {
  filter: ProjectFilterTypes;
  searchTerm: string;
  lastDocument: QueryDocumentSnapshot<DocumentData> | null;
  endOfDocuments: boolean;
  isFetching: boolean;
  error: null | string;
  documents: ProjectWithId[];
};

type ActionType =
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_FILTER'; payload: ProjectFilterTypes }
  | { type: 'SET_END_OF_DOCUMENTS'; payload: boolean }
  | { type: 'SET_FETCHING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: null | string }
  | {
      type: 'SET_DOCUMENTS';
      payload: {
        data: ProjectWithId[];
        lastDoc: QueryDocumentSnapshot<DocumentData>;
      };
    };

export const useSearchProjectSource = (): {
  documents: ProjectWithId[];
  filter: ProjectFilterTypes;
  isFetching: boolean;
  error: null | string;
  endOfDocuments: boolean;
  getNext: () => Promise<void>;
  searchTerm: string;
  updateSearchTerm: (value: string) => void;
  updateFilter: (value: ProjectFilterTypes) => void;
} => {
  const [
    {
      isFetching,
      error,
      endOfDocuments,
      lastDocument,
      documents,
      filter,
      searchTerm,
    },
    dispatch,
  ] = useReducer(
    (state: StateType, action: ActionType) => {
      switch (action.type) {
        case 'SET_SEARCH_TERM':
          return { ...state, searchTerm: action.payload };
        case 'SET_FILTER':
          return { ...state };
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
          ] as ProjectWithId[];
          return {
            ...state,
            documents: newDocs,
            lastDocument: action.payload.lastDoc,
            isFetching: false,
          };
      }
    },
    {
      filter: 'latest',
      searchTerm: '',
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
        collection(firebaseFirestore, 'projects'),
        orderBy('createdAt', 'desc'),
        limit(DOC_LIMIT)
      );
      const docSnapshots = await getDocs(first);
      if (docSnapshots.empty) {
        dispatch({ type: 'SET_END_OF_DOCUMENTS', payload: true });
      } else {
        const data: ProjectWithId[] = [];
        docSnapshots.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id } as ProjectWithId);
        });
        const lastDoc = docSnapshots.docs[docSnapshots.docs.length - 1];

        dispatch({ type: 'SET_DOCUMENTS', payload: { data, lastDoc } });
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    }
  }, []);

  const getNext = useCallback(async () => {
    if (endOfDocuments === true) return;
    if (isFetching === true) return;

    try {
      dispatch({ type: 'SET_FETCHING', payload: false });

      const next = query(
        collection(firebaseFirestore, 'projects'),
        orderBy('createdAt', 'desc'),
        startAfter(lastDocument || 0),
        limit(DOC_LIMIT)
      );

      const docSnapshots = await getDocs(next);

      if (docSnapshots.empty) {
        dispatch({ type: 'SET_END_OF_DOCUMENTS', payload: true });
        return;
      }
      const data: ProjectWithId[] = [];
      docSnapshots.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id } as ProjectWithId);
      });
      const lastDoc = docSnapshots.docs[docSnapshots.docs.length - 1];

      dispatch({ type: 'SET_DOCUMENTS', payload: { data, lastDoc } });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    }
  }, [lastDocument, endOfDocuments]);

  useEffect(() => {
    if (isInit.current === true) return;
    getFirst();
    isInit.current = true;
  }, []);

  const updateSearchTerm = (value: string) => {};
  const updateFilter = (value: ProjectFilterTypes) => {};

  return {
    getNext,
    isFetching,
    error,
    documents,
    endOfDocuments,
    filter,
    searchTerm,
    updateSearchTerm,
    updateFilter,
  };
};
// SEARCH CONTEXT
const SearchContext = createContext<ReturnType<typeof useSearchProjectSource>>(
  {} as unknown as ReturnType<typeof useSearchProjectSource>
);
// SEARCH USE CONTEXT HOOK
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error('useSearch must be used inside SearchContextProvider!');
  return context;
};
// SEARCH PROVIDER

type ProviderProps = { children: ReactNode };

export const SearchContextProvider = ({ children }: ProviderProps) => {
  return (
    <SearchContext.Provider value={useSearchProjectSource()}>
      {children}
    </SearchContext.Provider>
  );
};

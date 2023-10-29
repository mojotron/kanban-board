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
import type { UserWithId } from '../../../types/userType';
import type { ProjectWithId } from '../../../types/projectType';
import type { ProjectFilterTypes } from '../types/filterTypes';
import { useParams } from 'react-router-dom';

const DOC_LIMIT = 2;

// SEARCH SOURCE
type DocOption = UserWithId | ProjectWithId;

type DocCollectionOption = DocOption[];

type DocCollectionType = 'projects' | 'users';

type StateType = {
  filter: ProjectFilterTypes;
  searchTerm: string;
  lastDocument: QueryDocumentSnapshot<DocumentData> | null;
  endOfDocuments: boolean;
  isFetching: boolean;
  error: null | string;
  documents: DocCollectionOption;
};

type ActionType =
  | { type: 'SET_FILTER'; payload: FilterTypes }
  | { type: 'UPDATE_SEARCH_TERM'; payload: string }
  | { type: 'SET_END_OF_DOCUMENTS'; payload: boolean }
  | { type: 'SET_FETCHING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: null | string }
  | {
      type: 'SET_DOCUMENTS';
      payload: {
        data: DocCollectionOption;
        lastDoc: QueryDocumentSnapshot<DocumentData>;
      };
    };

export const useSearchSource = (): {
  documents: DocCollectionOption;
  isFetching: boolean;
  error: null | string;
  endOfDocuments: boolean;
  collectionName: DocCollectionType;
  getNext: () => Promise<void>;
  filter: ProjectFilterTypes;
  updateFilter: (newFilter: ProjectFilterTypes) => void;
  searchTerm: string;
  updateSearchTerm: (newSearchTerm: string) => void;
} => {
  const { collectionName } = useParams<{
    collectionName?: DocCollectionType;
  }>();
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
        case 'SET_FILTER':
          return { ...state, filter: action.payload };
        case 'UPDATE_SEARCH_TERM':
          return { ...state, searchTerm: action.payload };
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
        default:
          return { ...state };
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

  const getFirst = useCallback(() => {
    if (collectionName === undefined) return;
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
        const data: DocCollectionOption = [];
        docSnapshots.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id } as DocOption);
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
    if (collectionName === undefined) return;
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
      const data: DocCollectionOption = [];
      docSnapshots.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id } as DocOption);
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

  // dispatch handlers
  const updateFilter = (newFilter: ProjectFilterTypes) => {
    dispatch({ type: 'SET_FILTER', payload: newFilter });
    console.log(newFilter);
  };

  const updateSearchTerm = (newSearchTerm: string) => {
    const cleanedUp = newSearchTerm.trim();
    dispatch({ type: 'UPDATE_SEARCH_TERM', payload: cleanedUp });
  };

  return {
    getNext,
    isFetching,
    error,
    documents,
    endOfDocuments,
    collectionName: collectionName || 'projects',
    filter,
    updateFilter,
    searchTerm,
    updateSearchTerm,
  };
};
// SEARCH CONTEXT
const SearchContext = createContext<ReturnType<typeof useSearchSource>>(
  {} as unknown as ReturnType<typeof useSearchSource>
);
// SEARCH USE CONTEXT HOOK
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error('useSearch must be used inside SearchContextProvider!');
  return context;
};
// SEARCH PROVIDER
type ProviderProps = { config: string; children: ReactNode };

export const SearchContextProvider = ({ children, config }: ProviderProps) => {
  return (
    <SearchContext.Provider value={useSearchSource(config)}>
      {children}
    </SearchContext.Provider>
  );
};

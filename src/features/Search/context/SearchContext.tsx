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
import { UserWithId } from '../../../types/userType';
import { ProjectWithId } from '../../../types/projectType';

const DOC_LIMIT = 2;

// SEARCH SOURCE
type DocOption = UserWithId | ProjectWithId;

type DocCollectionOption = DocOption[];

type DocCollectionType = 'projects' | 'users';

type StateType = {
  collectionName: DocCollectionType;
  filter: string;
  queryParam: string;
  lastDocument: QueryDocumentSnapshot<DocumentData> | null;
  endOfDocuments: boolean;
  isFetching: boolean;
  error: null | string;
  documents: DocCollectionOption;
};

type ActionType =
  | { type: 'SET_COLLECTION'; payload: 'project' | 'users' }
  | { type: 'SET_FILTER' }
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
  getNext: () => Promise<void>;
  collectionName: DocCollectionType;
} => {
  const [
    {
      isFetching,
      error,
      endOfDocuments,
      lastDocument,
      collectionName,
      documents,
    },
    dispatch,
  ] = useReducer(
    (state: StateType, action: ActionType) => {
      switch (action.type) {
        case 'SET_COLLECTION':
          return { ...state };
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
      collectionName: 'projects',
      filter: '',
      queryParam: '',
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

  return {
    getNext,
    isFetching,
    error,
    documents,
    endOfDocuments,
    collectionName,
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
type ProviderProps = { children: ReactNode };
export const SearchContextProvider = ({ children }: ProviderProps) => {
  return (
    <SearchContext.Provider value={useSearchSource()}>
      {children}
    </SearchContext.Provider>
  );
};

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
import { useCallback, createContext, useReducer } from 'react';
import { firebaseFirestore } from '../../../firebase/config';
import { UserWithId } from '../../../types/userType';
import { ProjectWithId } from '../../../types/projectType';

const DOC_LIMIT = 2;

export const useSearchSource = () => {
  type StateType = {
    collectionName: 'projects' | 'users';
    filter: string;
    queryParam: string;
    lastDocument: QueryDocumentSnapshot<DocumentData> | null;
    endOfDocuments: boolean;
    isFetching: boolean;
    error: null | string;
    documents: ProjectWithId[] | UserWithId[];
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
          data: ProjectWithId[] | UserWithId[];
          lastDoc: QueryDocumentSnapshot<DocumentData>;
        };
      };

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
        const data: T[] = [];
        docSnapshots.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id } as T);
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
      const data: T[] = [];
      docSnapshots.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id } as T);
      });
      const lastDoc = docSnapshots.docs[docSnapshots.docs.length - 1];
      dispatch({ type: 'SET_DOCUMENTS', payload: { data, lastDoc } });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    }
  }, [collectionName, lastDocument, endOfDocuments]);

  return {
    getFirst,
    getNext,
    isFetching,
    error,
    documents,
    endOfDocuments,
  };
};

const SearchContext = createContext<ReturnType<typeof useSearchSource>>(
  {} as unknown as ReturnType<typeof useSearchSource>
);

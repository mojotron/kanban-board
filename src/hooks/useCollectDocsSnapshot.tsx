import { firebaseFirestore } from '../firebase/config';
import {
  Unsubscribe,
  collection,
  onSnapshot,
  query,
  where,
  documentId,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { TaskType } from '../types/taskType';

type Task = TaskType & { id: string };

export const useCollectDocsSnapshot = <T,>(
  tasksIdList: string[] | undefined,
  collectionName: string
) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [documents, setDocuments] = useState<undefined | T[]>(undefined);

  useEffect(() => {
    if (!tasksIdList || tasksIdList.length < 1) return;
    let isCancelled = false;
    let unsubscribe: Unsubscribe;

    const getDocuments = async () => {
      try {
        const q = query(
          collection(firebaseFirestore, collectionName),
          where(documentId(), 'in', [...tasksIdList])
        );

        unsubscribe = onSnapshot(q, (snapshot) => {
          const docs: T[] = [];
          snapshot.forEach((doc) =>
            docs.push({ ...doc.data(), id: doc.id } as T)
          );
          if (!isCancelled) {
            setError(null);
            setPending(false);
            setDocuments(docs);
          }
        });
      } catch (error) {
        if (error instanceof Error && !isCancelled) {
          console.log(error);
          setError(error.message);
          setPending(false);
        }
      }
    };

    getDocuments();

    return () => {
      isCancelled = true;
      unsubscribe();
    };
  }, [tasksIdList, collectionName]);

  return { pending, error, documents };
};

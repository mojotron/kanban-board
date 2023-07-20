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

export const useCollectProjectTasks = (tasksIdList: string[] | undefined) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [documents, setDocuments] = useState<undefined | Task[]>(undefined);

  useEffect(() => {
    if (!tasksIdList) return;
    let isCancelled = false;
    let unsubscribe: Unsubscribe;

    const getDocuments = async () => {
      try {
        const q = query(
          collection(firebaseFirestore, 'tasks'),
          where(documentId(), 'in', [...tasksIdList])
        );

        unsubscribe = await onSnapshot(q, (snapshot) => {
          const tasks: Task[] = [];
          snapshot.forEach((doc) =>
            tasks.push({ ...doc.data(), id: doc.id } as Task)
          );
          if (!isCancelled) {
            setError(null);
            setPending(false);
            setDocuments(tasks);
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
  }, [tasksIdList]);

  return { pending, error, documents };
};

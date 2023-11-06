import { useCallback } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { useUserData } from '../../../context/UserDataContext';
import { ProjectWithId } from '../../../types/projectType';
import { RequestType, RequestTypeWithId } from '../types/requestType';
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { firebaseFirestore } from '../../../firebase/config';

export const useRequests = (): {
  applyToProject: (projectId: string) => void;
  cancelRequest: (projectId: string, requestId: string) => void;
  acceptUser: () => void;
  rejectUser: () => void;
  hasRequest: (projectId: string) => Promise<RequestTypeWithId | undefined>;
} => {
  const { updateDocument, getDocument, addDocument, deleteDocument } =
    useFirestore();
  const { document: user } = useUserData();

  const applyToProject = useCallback(
    async (projectId: string) => {
      if (!user) return;
      try {
        const projectDoc = await getDocument<ProjectWithId>(
          'projects',
          projectId
        );
        if (!projectDoc) return;
        //
        const requestDoc = await addDocument<RequestType>('requests', {
          userId: user.uid,
          projectId: projectId,
          createdAt: Timestamp.fromDate(new Date()),
        });
        //
        if (!requestDoc) return;
        const requests = [...projectDoc.requests, requestDoc.id];
        await updateDocument('projects', projectId, {
          requests,
        });
        await updateDocument('users', user.uid, {
          appliedRequests: [...user.appliedRequests, requestDoc.id],
        });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
    [user]
  );

  const cancelRequest = useCallback(
    async (projectId: string, requestId: string) => {
      if (!user) return;
      console.log('TARZAN', requestId);
      try {
        const projectDoc = await getDocument<ProjectWithId>(
          'projects',
          projectId
        );
        if (!projectDoc) return;
        //

        //
        const requests = projectDoc.requests.filter((ele) => ele !== requestId);
        await updateDocument('projects', projectId, {
          requests,
        });
        const appliedRequests = user.appliedRequests.filter(
          (ele) => ele !== requestId
        );
        await updateDocument('users', user.uid, {
          appliedRequests,
        });
        // TODO DELETE REQUEST
        await deleteDocument('requests', requestId);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
    [user]
  );

  const acceptUser = useCallback(async () => {}, []);
  const rejectUser = useCallback(async () => {}, []);

  const hasRequest = useCallback(async (projectId: string) => {
    if (!user) return;
    try {
      const q = query(
        collection(firebaseFirestore, 'requests'),
        where('projectId', '==', projectId),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return undefined;
      const request = querySnapshot.docs[0];
      return { ...request.data(), id: request.id } as RequestTypeWithId;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, []);

  return { applyToProject, cancelRequest, acceptUser, rejectUser, hasRequest };
};

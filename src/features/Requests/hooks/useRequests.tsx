import { useCallback } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { useUserData } from '../../../context/UserDataContext';
import { ProjectWithId } from '../../../types/projectType';
import { RequestType, RequestTypeWithId } from '../types/requestType';
import { Timestamp } from 'firebase/firestore';

export const useRequests = (): {
  applyToProject: (projectId: string) => void;
  cancelRequest: (projectId: string, requestId: string) => void;
  acceptUser: () => void;
  rejectUser: () => void;
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

  return { applyToProject, cancelRequest, acceptUser, rejectUser };
};

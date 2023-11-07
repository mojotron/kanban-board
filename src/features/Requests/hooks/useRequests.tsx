import { useCallback } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { useUserData } from '../../../context/UserDataContext';
import { ProjectWithId } from '../../../types/projectType';
import { RequestType } from '../../../types/requestType';
import { Timestamp } from 'firebase/firestore';

export const useRequests = (): {
  applyToProject: (projectId: string) => void;
  cancelRequest: (projectId: string) => void;
  acceptUser: () => void;
  rejectUser: () => void;
} => {
  const { updateDocument, getDocument } = useFirestore();
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
        const newRequest: RequestType = {
          createdAt: Timestamp.fromDate(new Date()),
          userId: user.uid,
          projectId: projectId,
        };

        const requests = [...projectDoc.requests, newRequest];
        await updateDocument('projects', projectId, {
          requests,
        });
        await updateDocument('users', user.uid, {
          appliedRequests: [...user.appliedRequests, newRequest],
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
    async (projectId: string) => {
      if (!user) return;

      try {
        const projectDoc = await getDocument<ProjectWithId>(
          'projects',
          projectId
        );
        if (!projectDoc) return;

        const requests = projectDoc.requests.filter(
          (request) => request.projectId !== projectId
        );
        await updateDocument('projects', projectId, {
          requests,
        });
        const appliedRequests = user.appliedRequests.filter(
          (request) => request.projectId !== projectId
        );
        await updateDocument('users', user.uid, {
          appliedRequests,
        });
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

import { useCallback } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { useUserData } from '../../../context/UserDataContext';
import { ProjectWithId } from '../../../types/projectType';

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
        const requests = [...projectDoc.requests, user.uid];
        await updateDocument('projects', projectId, {
          requests,
        });
        await updateDocument('users', user.uid, {
          appliedRequests: [...user.appliedRequests, projectId],
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
        const requests = projectDoc.requests.filter((ele) => ele !== user.uid);
        await updateDocument('projects', projectId, {
          requests,
        });
        const appliedRequests = user.appliedRequests.filter(
          (ele) => ele !== projectId
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

import { useCallback } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { useUserData } from '../../../context/UserDataContext';
import { ProjectWithId } from '../../../types/projectType';
import { RequestType } from '../../../types/requestType';
import { Timestamp } from 'firebase/firestore';
import { UserWithId } from '../../../types/userType';

export const useRequests = (): {
  applyToProject: (projectId: string) => void;
  cancelRequest: (projectId: string) => void;
  acceptUser: (projectId: string, userId: string) => void;
  rejectUser: (projectId: string, userId: string) => void;
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
    [user, getDocument, updateDocument]
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
    [user, getDocument, updateDocument]
  );

  const acceptUser = useCallback(
    async (projectId: string, userId: string) => {
      try {
        // add user to project and remove request from project
        const projectDoc = await getDocument<ProjectWithId>(
          'projects',
          projectId
        );
        if (!projectDoc) return;
        const userDoc = await getDocument<UserWithId>('users', userId);
        if (!userDoc) return;

        const members = [...projectDoc.members, userId];
        const requests = projectDoc.requests.filter(
          (req) => req.projectId !== projectId && req.userId !== userId
        );
        await updateDocument('projects', projectId, { members, requests });
        // remove request from user
        const appliedRequests = userDoc.appliedRequests.filter(
          (req) => req.projectId !== projectId && req.userId !== userId
        );
        // add project to collaboratingProjects
        const collaboratingProjects = [
          ...userDoc.collaboratingProjects,
          projectDoc.id,
        ];
        await updateDocument('users', userId, {
          appliedRequests,
          collaboratingProjects,
        });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
    [getDocument, updateDocument]
  );

  const rejectUser = useCallback(async (projectId: string, userId: string) => {
    try {
      const projectDoc = await getDocument<ProjectWithId>(
        'projects',
        projectId
      );
      if (!projectDoc) return;
      const userDoc = await getDocument<UserWithId>('users', userId);
      if (!userDoc) return;
      const requests = projectDoc.requests.filter(
        (req) => req.projectId !== projectId && req.userId !== userId
      );
      await updateDocument('projects', projectId, { requests });
      // remove request from user
      const appliedRequests = userDoc.appliedRequests.filter(
        (req) => req.projectId !== projectId && req.userId !== userId
      );
      await updateDocument('users', userId, { appliedRequests });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, []);

  return { applyToProject, cancelRequest, acceptUser, rejectUser };
};

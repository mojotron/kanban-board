import { useCallback } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { useUserData } from '../../../context/UserDataContext';
import { ProjectWithId } from '../../../types/projectType';
import { RequestType } from '../../../types/requestType';
import { Timestamp } from 'firebase/firestore';
import { useCreateNotification } from '../../Notifications/hooks/useCreateNotification';

export const useRequests = (): {
  applyToProject: (projectId: string) => void;
  cancelRequest: (projectId: string) => void;
  acceptUser: (projectId: string, userId: string) => void;
  rejectUser: (projectId: string, userId: string) => void;
} => {
  const { updateDocument, getDocument } = useFirestore();
  const { create } = useCreateNotification();
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

  const acceptUser = useCallback(async (projectId: string, userId: string) => {
    if (!user) return;
    try {
      // add user to project and remove request from project
      const projectDoc = await getDocument<ProjectWithId>(
        'projects',
        projectId
      );
      if (!projectDoc) return;
      const members = [...projectDoc.members, userId];
      const requests = projectDoc.requests.filter(
        (req) => req.projectId !== projectId && req.userId !== userId
      );
      await updateDocument('projects', projectId, { members, requests });
      // remove request from user
      const appliedRequests = user.appliedRequests.filter(
        (req) => req.projectId !== projectId && req.userId !== userId
      );
      await updateDocument('users', userId, { appliedRequests });
      // add notification to user
      create(userId, {
        createdAt: Timestamp.fromDate(new Date()),
        isOpened: false,
        type: 'project-accept',
        user: {
          userName: user.userName,
          docId: user.uid,
          imageUrl: user.photoUrl,
        },
        project: { name: projectDoc.name, docId: projectId },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, []);

  const rejectUser = useCallback(async (projectId: string, userId: string) => {
    try {
      // add notification to user
      // remove request from user
      // remove request from project
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, []);

  return { applyToProject, cancelRequest, acceptUser, rejectUser };
};

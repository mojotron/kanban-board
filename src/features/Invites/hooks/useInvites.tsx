import { useCallback } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { useUserData } from '../../../context/UserDataContext';
// types
import type { ProjectWithId } from '../../../types/projectType';
import type { UserWithId } from '../../../types/userType';
import type { InviteType } from '../../../types/inviteType';
import { Timestamp } from 'firebase/firestore';

export const useInvites = (): {
  inviteUser: (projectId: string, userId: string) => void;
  inviteCancel: (projectId: string, userId: string) => void;
  inviteAccept: (projectId: string) => void;
  inviteReject: (projectId: string) => void;
} => {
  const { getDocument, updateDocument } = useFirestore();
  const { document: user } = useUserData();

  const inviteUser = useCallback(async (projectId: string, userId: string) => {
    if (!user) return;
    const projectDoc = await getDocument<ProjectWithId>('projects', projectId);
    const userDoc = await getDocument<UserWithId>('users', userId);
    if (!projectDoc || !userDoc) return;
    // create new invite object
    const newInvite: InviteType = {
      createdAt: Timestamp.fromDate(new Date()),
      projectId,
      userId,
      adminId: projectDoc.adminUid,
    };
    // update project
    await updateDocument('projects', projectId, {
      invites: [...projectDoc.invites, newInvite],
    });
    // update user
    await updateDocument('users', userId, {
      invites: [...userDoc.invites, newInvite],
    });
    try {
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, []);

  const inviteCancel = useCallback(
    async (projectId: string, userId: string) => {
      if (!user) return;
      const projectDoc = await getDocument<ProjectWithId>(
        'projects',
        projectId
      );
      const userDoc = await getDocument<UserWithId>('users', userId);
      if (!projectDoc || !userDoc) return;
      const filteredProjectInvites = projectDoc.invites.filter(
        (invite) => invite.projectId !== projectId
      );
      await updateDocument('projects', projectId, {
        invites: filteredProjectInvites,
      });
      const filteredUserInvites = userDoc.invites.filter(
        (invite) => invite.projectId !== projectId
      );
      await updateDocument('users', userId, {
        invites: filteredUserInvites,
      });

      try {
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
    []
  );

  const inviteAccept = useCallback(async (projectId: string) => {
    if (!user) return;
    try {
      console.log(projectId);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, []);

  const inviteReject = useCallback(async (projectId: string) => {
    if (!user) return;
    try {
      console.log(projectId);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, []);

  return { inviteUser, inviteCancel, inviteAccept, inviteReject };
};

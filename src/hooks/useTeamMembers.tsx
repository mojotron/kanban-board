import { useCallback, useMemo } from 'react';
import { useProject } from '../context/ProjectContext';
import { UserWithId } from '../types/userType';
import { useCollectDocs } from './useCollectDocs';
import { useUserData } from '../context/UserDataContext';

export const useTeamMembers = (memberId: string) => {
  const { document: currentUser } = useUserData();
  const { project } = useProject();
  const {
    documents: teamMembers,
    isPending,
    error,
  } = useCollectDocs<UserWithId>(
    [project?.adminUid!, ...project?.members!],
    'users'
  );

  const isCurrentUserMember = useMemo(() => {
    return currentUser?.uid === memberId;
  }, [memberId, currentUser?.uid]);

  const member = useMemo(() => {
    return teamMembers?.find((member) => member.id === memberId);
  }, [memberId, teamMembers]);

  return {
    document,
    isPending,
    error,
    isCurrentUserMember,
    member,
  };
};

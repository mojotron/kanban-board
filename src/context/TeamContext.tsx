import { ReactNode, createContext, useCallback, useContext } from 'react';
import { useProject } from './ProjectContext';
import { UserWithId } from '../types/userType';
import { useCollectDocs } from '../hooks/useCollectDocs';
import { useUserData } from './UserDataContext';

export const useTeamSource = () => {
  const { document: user } = useUserData();
  const { project } = useProject();
  const {
    documents: team,
    isPending,
    error,
  } = useCollectDocs<UserWithId>(
    [project?.adminUid!, ...project?.members!],
    'users'
  );

  const getMember = useCallback(
    (authorId: string) => {
      return team?.find((member) => member.id === authorId);
    },
    [team]
  );

  const currentUser = useCallback(
    (authorId: string) => {
      return user?.uid === authorId;
    },
    [user]
  );

  return {
    team,
    isPending,
    error,
    getMember,
    currentUser,
  };
};

const TeamContext = createContext<ReturnType<typeof useTeamSource>>(
  {} as unknown as ReturnType<typeof useTeamSource>
);

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TeamContext.Provider value={useTeamSource()}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('Team provider must be used inside TeamContext.Provider');
  }
  return context;
};

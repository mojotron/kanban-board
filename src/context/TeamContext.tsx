import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useProject } from './ProjectContext';
import { UserWithId } from '../types/userType';
import { useCollectDocs } from '../hooks/useCollectDocs';
import { useUserData } from './UserDataContext';

export const useTeamSource = (): {
  team: UserWithId[] | null;
  teamPending: boolean;
  teamError: null | string;
  isCurrentUser: (userId: string) => boolean;
  getMember: (userUid: string) => undefined | UserWithId;
} => {
  const { document: user } = useUserData();
  const { project } = useProject();
  const [allMembers, setAllMembers] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    if (!project) return;
    setAllMembers([project.adminUid, ...project.members]);
  }, [project]);

  const {
    documents: team,
    isPending: teamPending,
    error: teamError,
  } = useCollectDocs<UserWithId>(allMembers, 'users');

  console.log(team);

  const isCurrentUser = useCallback(
    (userId: string) => {
      return userId === user?.uid;
    },
    [user]
  );
  const getMember = useCallback(
    (userId: string) => {
      return team?.find((member) => member.id === userId);
    },
    [team]
  );

  return {
    team,
    teamPending,
    teamError,
    getMember,
    isCurrentUser,
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

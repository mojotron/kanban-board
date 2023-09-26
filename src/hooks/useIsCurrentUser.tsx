import { useUserData } from '../context/UserDataContext';
import { useOnSnapshotDocument } from './useOnSnapshotDocument';
// types
import { UserWithId } from '../types/userType';

export const useIsCurrentUser = (userId: string | undefined) => {
  const { document: currentUser } = useUserData();
  const isCurrentUser = userId === currentUser?.uid;

  const {
    document: otherUser,
    pending,
    error,
  } = useOnSnapshotDocument<UserWithId>('users', isCurrentUser ? null : userId);

  const userData = isCurrentUser ? currentUser : otherUser;

  return { userData, pending, error };
};

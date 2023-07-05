import { useAuth } from '../context/AuthContext';
import { useOnSnapshotDocument } from './useOnSnapshotDocument';

export const useSetUserDoc = () => {
  const { user } = useAuth();
  const { document } = useOnSnapshotDocument('users', user?.uid);
};

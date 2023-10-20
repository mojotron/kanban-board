import { useMemo } from 'react';
import AdminAvatar from '../../../../components/AdminAvatar/AdminAvatar';
import { useCollectDocs } from '../../../../hooks/useCollectDocs';
import { UserWithId } from '../../../../types/userType';
import Collaborator from './Collaborator';
import styles from './CurrentMembers.module.css';

type PropsType = {
  adminUid: string;
  membersUid: string[];
};

const CurrentMembers = ({ adminUid, membersUid }: PropsType) => {
  const { documents: members } = useCollectDocs<UserWithId>(
    [adminUid, ...membersUid],
    'users'
  );

  const admin = useMemo(
    () => members?.find((member) => member.uid === adminUid),
    [adminUid, members]
  );

  const collaborators = useMemo(
    () => members?.filter((member) => member.id !== adminUid) ?? [],
    [adminUid, members]
  );

  if (!admin) return null;

  return (
    <div className={styles.team}>
      <h3 className={styles.heading}>Current Members</h3>
      <div className={styles.members}>
        <AdminAvatar type="adminObject" data={admin as UserWithId} />
        <ul>
          {collaborators.map((col) => (
            <Collaborator
              key={col.id}
              userName={col.userName}
              imageUrl={col.photoUrl}
              userId={col.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CurrentMembers;

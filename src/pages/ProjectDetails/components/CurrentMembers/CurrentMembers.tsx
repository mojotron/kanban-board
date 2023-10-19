import AdminAvatar from '../../../../components/AdminAvatar/AdminAvatar';
import { useCollectDocs } from '../../../../hooks/useCollectDocs';
import { UserWithId } from '../../../../types/userType';
import Collaborator from './Collaborator';

type PropsType = {
  adminUid: string;
  membersUid: string[];
};

const CurrentMembers = ({ adminUid, membersUid }: PropsType) => {
  const { documents: members } = useCollectDocs<UserWithId>(
    [adminUid, ...membersUid],
    'users'
  );

  if (!members) return null;

  const admin = members.find((member) => member.uid === adminUid);
  const collaborators = members.filter((member) => member.id !== adminUid);
  console.log(members);

  return (
    <div>
      <h3>Current Members</h3>
      <AdminAvatar type="adminObject" data={admin as UserWithId} />
      {collaborators.map((col) => (
        <Collaborator
          key={col.id}
          userName={col.userName}
          imageUrl={col.photoUrl}
        />
      ))}
    </div>
  );
};

export default CurrentMembers;

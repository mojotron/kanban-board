import { useLocation } from 'react-router-dom';
import { useOnSnapshotDocument } from '../../hooks/useOnSnapshotDocument';
import { UserWithId } from '../../types/userType';

const Profile = () => {
  const location = useLocation();

  console.log(location.state.targetId);

  const { document, pending, error } = useOnSnapshotDocument<UserWithId>(
    'users',
    location.state.targetId
  );

  console.log(document);

  return (
    <div>
      {pending && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <h1>hello</h1>
      {document && <div key={document.id}>{document.userName}</div>}
    </div>
  );
};

export default Profile;

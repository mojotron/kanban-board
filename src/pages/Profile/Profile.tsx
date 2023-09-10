// hooks
import { useParams } from 'react-router-dom';
import { useOnSnapshotDocument } from '../../hooks/useOnSnapshotDocument';
import { useUserData } from '../../context/UserDataContext';
// types
import { UserWithId } from '../../types/userType';
// styles
import styles from './Profile.module.css';
// components
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import ProfileProjectList from './components/ProfileProjectList/ProfileProjectList';

const Profile = () => {
  const { userId } = useParams();
  const { document: currentUser } = useUserData();
  const isCurrentUser = userId === currentUser?.uid;

  const { document: otherUser } = useOnSnapshotDocument<UserWithId>(
    'users',
    isCurrentUser ? null : userId
  );

  const data = isCurrentUser ? currentUser : otherUser;
  if (!data) return;

  return (
    <section>
      <ProfileHeader user={data} />
      {data.managingProjects.length > 0 && (
        <ProfileProjectList
          header="Managing Projects"
          projectList={data.managingProjects}
        />
      )}
      {data.collaboratingProjects.length > 0 && (
        <ProfileProjectList
          header="Projects Collaborating on"
          projectList={data.collaboratingProjects}
        />
      )}
    </section>
  );
};

export default Profile;

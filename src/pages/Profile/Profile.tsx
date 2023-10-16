// hooks
import { useParams } from 'react-router-dom';
// styles
import styles from './Profile.module.css';
// components
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import ProfileProjectList from './components/ProfileProjectList/ProfileProjectList';
import { useUserData } from '../../context/UserDataContext';
import { useOnSnapshotDocument } from '../../hooks/useOnSnapshotDocument';
import { UserWithId } from '../../types/userType';

const Profile = () => {
  const { userId } = useParams();
  const { document: user } = useUserData();

  const isCurrentUser = userId === user?.uid;

  const { document: userDoc } = useOnSnapshotDocument<UserWithId>(
    'users',
    isCurrentUser ? undefined : userId
  );

  if (!user) return null;

  return (
    <section className={styles.profile}>
      <ProfileHeader user={isCurrentUser ? user : userDoc} />

      <ProfileProjectList
        header="Managing Projects"
        projectList={
          isCurrentUser ? user.managingProjects : userDoc?.managingProjects
        }
      />

      <ProfileProjectList
        header="Projects Collaborating on"
        projectList={
          user ? user.collaboratingProjects : userDoc?.collaboratingProjects
        }
      />
    </section>
  );
};

export default Profile;

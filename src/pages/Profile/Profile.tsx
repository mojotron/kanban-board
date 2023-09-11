// hooks
import { useParams } from 'react-router-dom';

import { useIsCurrentUser } from '../../hooks/useIsCurrentUser';

// styles
import styles from './Profile.module.css';
// components
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import ProfileProjectList from './components/ProfileProjectList/ProfileProjectList';

const Profile = () => {
  const { userId } = useParams();
  const { userData } = useIsCurrentUser(userId);

  if (!userData) return;

  return (
    <section>
      <ProfileHeader user={userData} />
      {userData.managingProjects.length > 0 && (
        <ProfileProjectList
          header="Managing Projects"
          projectList={userData.managingProjects}
        />
      )}
      {userData.collaboratingProjects.length > 0 && (
        <ProfileProjectList
          header="Projects Collaborating on"
          projectList={userData.collaboratingProjects}
        />
      )}
    </section>
  );
};

export default Profile;

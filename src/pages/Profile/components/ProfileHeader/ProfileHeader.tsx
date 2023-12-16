// components
import Avatar from '../../../../components/Avatar/Avatar';
// types
import { UserType } from '../../../../types/userType';
// styles
import styles from './ProfileHeader.module.css';
// icon
import { AiFillGithub as GithubIcon } from 'react-icons/ai';
import OuterLink from '../../../../components/OuterLink/OuterLink';
import { useUserData } from '../../../../context/UserDataContext';
import Button from '../../../../components/Button/Button';
import TagsList from '../../../../components/TagsList/TagsList';
import UpdateList from '../../../../features/UpdateElement/UpdateList/UpdateList';
import LastTimeOnline from '../../../../components/LastTimeOnline/LastTimeOnline';
import InviteUser from '../InviteUser/InviteUser';

type PropsType = {
  user: UserType | undefined;
};

const ProfileHeader = ({ user }: PropsType) => {
  const {
    document: currentUser,
    toggleUpForWork,
    updateUserTags,
  } = useUserData();

  if (!user || !currentUser) return;

  const isCurrentUser = user.uid === currentUser.uid;

  return (
    <header className={styles.header}>
      <div style={{ marginBottom: 'auto' }}>
        <Avatar imageUrl={user.photoUrl} userName={user.userName} size="100" />
      </div>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.name}>
            <h2>{user.userName || 'Anonymous'}</h2>
            <OuterLink to={`https://github.com/${user.userName}`}>
              <GithubIcon size={30} className="btn--icon-link" />
            </OuterLink>
          </div>

          <LastTimeOnline user={user} size="normal" />
        </div>

        <div className={styles.completed}>
          <p>Finished projects: {user.projectsCompleted}</p>
          <p>Task Completed: {user.tasksCompleted}</p>
          {!isCurrentUser && <TagsList tags={user.tags} />}
        </div>
      </div>

      {isCurrentUser ? (
        <div className={styles.currentUser}>
          <Button handleClick={toggleUpForWork} className="btn">
            {currentUser.upForWork ? 'Go Private' : 'Go Public'}
          </Button>

          <h3>Tags</h3>
          <UpdateList
            list={user.tags}
            onUpdate={(newList) => updateUserTags(newList)}
            itemStyle="tag"
          />
        </div>
      ) : (
        <InviteUser user={user} />
      )}
    </header>
  );
};

export default ProfileHeader;

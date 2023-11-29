// components
import Avatar from '../../../../components/Avatar/Avatar';
// types
import { UserType } from '../../../../types/userType';
// styles
import styles from './ProfileHeader.module.css';
// utils
import { formatTime } from '../../../../utils/formatTime';
// icon
import { AiFillGithub as GithubIcon } from 'react-icons/ai';
import OuterLink from '../../../../components/OuterLink/OuterLink';
import { useUserData } from '../../../../context/UserDataContext';
import Button from '../../../../components/Button/Button';

type PropsType = {
  user: UserType | undefined;
};

const ProfileHeader = ({ user }: PropsType) => {
  const { document: currentUser, toggleUpForWork } = useUserData();

  if (!user || !currentUser) return;

  const isCurrentUser = user.uid === currentUser.uid;

  return (
    <header className={styles.header}>
      <Avatar imageUrl={user.photoUrl} userName={user.userName} size="100" />
      <div className={styles.wrapper}>
        <div>
          <div className={styles.name}>
            <h2>{user.userName}</h2>
            <OuterLink to={`https://github.com/${user.userName}`}>
              <GithubIcon size={30} className="btn--icon-link" />
            </OuterLink>
          </div>

          <p className={user.online ? styles.online : styles.offline}>
            {user.online
              ? 'online'
              : `Last time online: ${formatTime(
                  user.lastLoggedOut.seconds * 1000
                )}`}
          </p>
        </div>

        <div className={styles.completed}>
          <p>Finished projects: {user.projectsCompleted}</p>
          <p>Task Completed: {user.tasksCompleted}</p>
        </div>

        {isCurrentUser && (
          <Button handleClick={toggleUpForWork}>
            {currentUser.upForWork ? 'Go Private' : 'Go Public'}
          </Button>
        )}
      </div>
    </header>
  );
};

export default ProfileHeader;

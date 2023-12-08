import { UserWithId } from '../../types/userType';
import Avatar from '../Avatar/Avatar';
import LastTimeOnline from '../LastTimeOnline/LastTimeOnline';
import TagsList from '../TagsList/TagsList';
import styles from './UserCard.module.css';
import {
  AiOutlineCheckCircle as IconYes,
  AiOutlineCloseCircle as IconNo,
} from 'react-icons/ai';

type PropsType = {
  user: UserWithId;
};

const UserCard = ({ user }: PropsType) => {
  console.log(user);

  return (
    <div className={styles.user}>
      <div className={styles.userLeft}>
        <Avatar imageUrl={user.photoUrl} userName={user.userName} size="50" />
      </div>
      <div className={styles.userRight}>
        <h2 className={styles.userName}>{user.userName || 'Incognito'}</h2>
        {user.tags.length > 0 && <TagsList tags={user.tags} />}
        <div className={styles.userOpen}>
          <p>Open for work</p>
          {user.upForWork ? (
            <IconYes className={`${styles.icon} ${styles.iconGreen}`} />
          ) : (
            <IconNo className={`${styles.icon} ${styles.iconRed}`} />
          )}
        </div>
        <LastTimeOnline user={user} size="small" />
      </div>
    </div>
  );
};

export default UserCard;

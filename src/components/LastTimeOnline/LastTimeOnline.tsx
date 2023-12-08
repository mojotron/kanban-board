import { UserType } from '../../types/userType';
import { formatTime } from '../../utils/formatTime';
import styles from './LastTimeOnline.module.css';

type PropsType = {
  user: UserType;
  size: 'small' | 'normal' | 'large';
};

const LastTimeOnline = ({ user, size }: PropsType) => {
  return (
    <p
      className={`${user.online ? styles.online : styles.offline} ${
        styles[size]
      }`}
    >
      {user.online
        ? 'online'
        : `Last time online: ${formatTime(user.lastLoggedOut.seconds * 1000)}`}
    </p>
  );
};

export default LastTimeOnline;

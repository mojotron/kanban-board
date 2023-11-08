import { Timestamp } from 'firebase/firestore';
import { UserWithId } from '../../../types/userType';
import TimestampPoint from '../../../components/TimestampPoint/TimestampPoint';
import Avatar from '../../../components/Avatar/Avatar';
import styles from './RequestUserItem.module.css';

const RequestUserItem = ({
  data,
  timestamp,
}: {
  data: UserWithId;
  timestamp: Timestamp;
}) => {
  return (
    <li className={styles.item}>
      <div className={styles.itemUser}>
        <Avatar imageUrl={data.photoUrl} userName={data.userName} size="25" />
        <h2>{data.userName}</h2>
      </div>
      <TimestampPoint time={timestamp} />
    </li>
  );
};

export default RequestUserItem;

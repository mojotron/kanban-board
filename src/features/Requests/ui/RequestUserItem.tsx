// components
import TimestampPoint from '../../../components/TimestampPoint/TimestampPoint';
import Avatar from '../../../components/Avatar/Avatar';
import Button from '../../../components/Button/Button';
// styles
import styles from './RequestUserItem.module.css';
// types
import type { UserWithId } from '../../../types/userType';
import type { RequestType } from '../../../types/requestType';
// icons
import {
  HiUserAdd as IconAccept,
  HiUserRemove as IconReject,
} from 'react-icons/hi';

const RequestUserItem = ({
  data,
  request,
}: {
  data: UserWithId;
  request: RequestType;
}) => {
  return (
    <li className={styles.item}>
      <Avatar imageUrl={data.photoUrl} userName={data.userName} size="25" />
      <div className={styles.itemInfo}>
        <h2>{data.userName}</h2>
        <TimestampPoint time={request.createdAt} className={styles.timestamp} />
      </div>

      <div className={styles.itemControls}>
        <Button handleClick={() => {}} className={styles.itemBtn}>
          <IconAccept className={styles.green} size={18} />
        </Button>
        <Button handleClick={() => {}} className={styles.itemBtn}>
          <IconReject className={styles.red} size={18} />
        </Button>
      </div>
    </li>
  );
};

export default RequestUserItem;

// hooks
import { useKanbanStore } from '../../../../store';
// types
import { MessageTypeWithId } from '../../../../types/messageType';
// components
import Avatar from '../../../../components/Avatar/Avatar';
import Button from '../../../../components/Button/Button';
import { formatTime } from '../../../../utils/formatTime';
// styles and icons
import styles from './Message.module.css';
import {
  AiFillDelete as DeleteIcon,
  AiFillEdit as EditIcon,
} from 'react-icons/ai';
import { UserWithId } from '../../../../types/userType';

type PropsType = {
  data: MessageTypeWithId;
  member: UserWithId | undefined;
  currentUser: boolean;
  onDelete: () => void;
};

const Message = ({ data, member, currentUser, onDelete }: PropsType) => {
  const setUpdateMessage = useKanbanStore((store) => store.setUpdateMessage);

  return (
    <div className={styles.message}>
      {member && (
        <Avatar
          size="35"
          imageUrl={member?.photoUrl}
          userName={member?.userName}
        />
      )}
      <div className="Message__text">
        <p className={styles.text}>{data.text}</p>
        <p className={styles.time}>
          {formatTime(formatTime(data.createdAt.seconds * 1000))}
        </p>
      </div>

      {currentUser && (
        <div className={styles.controls}>
          <Button
            handleClick={() => setUpdateMessage(data)}
            className={styles.btn}
          >
            <EditIcon size={15} />
          </Button>
          <Button handleClick={onDelete} className={styles.btn}>
            <DeleteIcon size={15} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Message;

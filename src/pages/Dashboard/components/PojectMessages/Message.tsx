// hooks
import { useMemo } from 'react';
import { useProject } from '../../../../context/ProjectContext';
import { useUserData } from '../../../../context/UserDataContext';
import { useKanbanStore } from '../../../../store';
// types
import { MessageType } from '../../../../types/messageType';
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

type PropsType = {
  data: MessageType & { id: string };
  onDelete: () => void;
};

const Message = ({ data, onDelete }: PropsType) => {
  const { document: user } = useUserData();
  const { team } = useProject();
  const setUpdateMessage = useKanbanStore((store) => store.setUpdateMessage);

  const collaborator = useMemo(() => {
    return team?.find((member) => member.id === data.authorUid);
  }, [data, team]);

  if (!collaborator) return null;

  return (
    <div className={styles.message}>
      <Avatar
        size="35"
        imageUrl={collaborator.photoUrl}
        userName={collaborator.userName}
      />
      <div className="Message__text">
        <p className={styles.text}>{data.text}</p>
        <p className={styles.time}>
          {formatTime(formatTime(data.createdAt.seconds * 1000))}
        </p>
      </div>

      {user?.uid === collaborator.id && (
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

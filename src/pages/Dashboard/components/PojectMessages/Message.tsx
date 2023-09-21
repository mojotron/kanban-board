import { MessageType } from '../../../../types/messageType';
import Avatar from '../../../../components/Avatar/Avatar';
import { useProject } from '../../../../context/ProjectContext';
import { useMemo } from 'react';
import { formatTime } from '../../../../utils/formatTime';
import styles from './Message.module.css';
import {
  AiFillDelete as DeleteIcon,
  AiFillEdit as EditIcon,
} from 'react-icons/ai';
import { useUserData } from '../../../../context/UserDataContext';
import Button from '../../../../components/Button/Button';
import { useKanbanStore } from '../../../../store';

type PropsType = {
  data: MessageType & { id: string };
  onDelete: (messageId: string) => void;
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
          <Button handleClick={() => onDelete(data.id)} className={styles.btn}>
            <DeleteIcon size={15} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Message;

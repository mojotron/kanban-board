import { MessageType } from '../../../../types/messageType';
import Avatar from '../../../../components/Avatar/Avatar';
import { useProject } from '../../../../context/ProjectContext';
import { useMemo } from 'react';
import { formatTime } from '../../../../utils/formatTime';
import './Message.css';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useUserData } from '../../../../context/UserDataContext';

type PropsType = {
  data: MessageType & { id: string };
  onDelete: (messageId: string) => void;
  onEdit: (messageId: string) => void;
};

const Message = ({ data, onDelete, onEdit }: PropsType) => {
  const { document: user } = useUserData();
  const { team } = useProject();

  const collaborator = useMemo(() => {
    return team?.find((member) => member.id === data.authorUid);
  }, [data, team]);

  if (!collaborator) return null;

  return (
    <div className="Message">
      <Avatar
        size="35"
        imageUrl={collaborator.photoUrl}
        userName={collaborator.userName}
      />
      <div className="Message__text">
        <p className="Message__text__main">{data.text}</p>
        <p className="Message__text__time">
          {formatTime(formatTime(data.createdAt.seconds * 1000))}
        </p>
      </div>

      {user?.uid === collaborator.id && (
        <div className="Message__controls">
          <button onClick={() => onEdit(data.id)}>
            <AiFillEdit />
          </button>
          <button onClick={() => onDelete(data.id)}>
            <AiFillDelete />
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;

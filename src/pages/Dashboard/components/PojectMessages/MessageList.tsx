// hooks
import { useCollectDocsSnapshot } from '../../../../hooks/useCollectDocsSnapshot';
import { useProject } from '../../../../context/ProjectContext';
import { useMessages } from '../../../../hooks/useMessages';
// styles
import styles from './MessagesList.module.css';
// components
import Message from './Message';
// types
import { MessageTypeWithId } from '../../../../types/messageType';

const MessageList = () => {
  const { project } = useProject();
  const { deleteMessage } = useMessages(project?.id!);
  const { documents: messages } = useCollectDocsSnapshot<MessageTypeWithId>(
    project?.messages,
    'messages'
  );
  return (
    <ul className={styles.messageList}>
      {messages?.map((msg) => (
        <Message
          key={Math.round(Math.random() * 1000)}
          data={msg}
          onDelete={() => deleteMessage(msg.id, project?.messages!)}
        />
      ))}
    </ul>
  );
};

export default MessageList;

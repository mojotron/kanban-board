import styles from './MessagesList.module.css';
import Message from './Message';
import { useProject } from '../../../../context/ProjectContext';

const MessageList = () => {
  const { messages } = useProject();
  return (
    <ul className={styles.messageList}>
      {messages?.map((msg) => (
        <Message
          key={Math.round(Math.random() * 1000)}
          data={msg}
          onDelete={() => {}}
          onEdit={() => {}}
        />
      ))}
    </ul>
  );
};

export default MessageList;

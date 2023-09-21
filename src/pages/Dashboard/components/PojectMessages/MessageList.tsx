import styles from './MessagesList.module.css';
import Message from './Message';
import { useMessages } from '../../../../hooks/useMessages';

const MessageList = () => {
  const { messages } = useMessages();
  return (
    <ul className={styles.messageList}>
      {messages?.map((msg) => (
        <Message
          key={Math.round(Math.random() * 1000)}
          data={msg}
          onDelete={() => {}}
        />
      ))}
    </ul>
  );
};

export default MessageList;

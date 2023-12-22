// hooks
import { useCollectDocsSnapshot } from '../../../../hooks/useCollectDocsSnapshot';
import { useProject } from '../../../../context/ProjectContext';
import { useMessages } from '../../../../hooks/useMessages';
// styles
import styles from './ProjectMessages.module.css';
// components
import Message from './Message';
// types
import { MessageTypeWithId } from '../../../../types/messageType';
import { useTeam } from '../../../../context/TeamContext';
import { useMemo } from 'react';

const MessageList = () => {
  const { project } = useProject();
  const { team, getMember, isCurrentUser } = useTeam();
  const { deleteMessage } = useMessages(project?.id!);
  const { documents: messages } = useCollectDocsSnapshot<MessageTypeWithId>(
    project?.messages,
    'messages'
  );

  const sortedMessages = useMemo(() => {
    if (messages === undefined) return [];
    return [...messages].sort((a, b) =>
      a.createdAt.seconds < b.createdAt.seconds ? -1 : 1
    );
  }, [messages]);

  if (!messages && !team) return null;

  return (
    <ul className={styles.messageList}>
      {sortedMessages.map((msg) => (
        <Message
          key={Math.round(Math.random() * 1000)}
          data={msg}
          member={getMember(msg.authorUid)}
          currentUser={isCurrentUser(msg.authorUid)}
          onDelete={() => deleteMessage(msg.id, project?.messages!)}
        />
      ))}
    </ul>
  );
};

export default MessageList;

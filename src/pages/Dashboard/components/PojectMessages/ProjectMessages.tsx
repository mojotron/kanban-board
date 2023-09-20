import { useState } from 'react';
import styles from './ProjectMessages.module.css';
import { MessageType } from '../../../../types/messageType';
import { Timestamp } from 'firebase/firestore';

import { useUserData } from '../../../../context/UserDataContext';
import { useFirestore } from '../../../../hooks/useFirestore';
import { useProject } from '../../../../context/ProjectContext';
import TextboxInput from '../../../../components/TextboxInput/TextboxInput';
import MessageList from './MessageList';

const ProjectMessages = () => {
  const { document } = useUserData();
  const { addDocument, updateDocument, deleteDocument } = useFirestore();
  const { project, messages } = useProject();
  // update message
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [text, setText] = useState('');

  const handleMessageSubmit = async () => {
    if (!document || !project || !text) return;
    const newMsg: MessageType = {
      authorUid: document.uid,
      text,
      createdAt: Timestamp.fromDate(new Date()),
    };

    if (updateMessage !== null) {
      await updateDocument('messages', updateMessage, newMsg);
    } else {
      const doc = await addDocument<MessageType>('messages', newMsg);
      await updateDocument('projects', project.id, {
        messages: [...project.messages, doc?.id],
      });
    }

    setText('');
    setUpdateMessage(null);
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!project || !messages) return;

    const filteredMsgs = messages.filter((msg) => msg.id !== messageId);
    console.log('1');

    await deleteDocument('messages', messageId);
    console.log('2');

    await updateDocument('projects', project.id, {
      messages: filteredMsgs,
    });
  };

  const handleEditMessage = (messageId: string) => {
    if (!messages) return;
    const target = messages?.find((msg) => msg.id === messageId)?.text;
    if (!target) return;
    setUpdateMessage(messageId);
    setText(target);
  };

  return (
    <section className={styles.messages}>
      <h3 className="heading--tertiary">Messages</h3>
      <MessageList />
      <TextboxInput
        text={text}
        onTextChange={setText}
        onSubmitClick={() => console.log('works')}
      />
    </section>
  );
};

export default ProjectMessages;

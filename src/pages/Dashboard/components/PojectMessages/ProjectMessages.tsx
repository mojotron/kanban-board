import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { AiOutlineSmile, AiOutlineArrowRight } from 'react-icons/ai';
import './ProjectMessages.css';
import { MessageType } from '../../../../types/messageType';
import { Timestamp } from 'firebase/firestore';
import Message from '../Message/Message';
import { useUserData } from '../../../../context/UserDataContext';
import { useFirestore } from '../../../../hooks/useFirestore';
import { useProject } from '../../../../context/ProjectContext';

const ProjectMessages = () => {
  const { document } = useUserData();
  const { addDocument, updateDocument } = useFirestore();
  const { project, messages } = useProject();
  const [showEmojis, setShowEmojis] = useState(false);
  const [text, setText] = useState('');

  const handleMessageSubmit = async () => {
    if (!document || !project) return;
    const newMsg: MessageType = {
      authorUid: document.uid,
      text,
      createdAt: Timestamp.fromDate(new Date()),
    };

    const doc = await addDocument<MessageType>('messages', newMsg);
    await updateDocument('projects', project.id, {
      messages: [...project.messages, doc?.id],
    });
    // TODO firebase rule for non admin user

    console.log(newMsg);
    setText('');
  };

  return (
    <div className="ProjectMessages">
      <h3 className="heading--tertiary">Messages</h3>

      <div className="ProjectMessages__messages">
        {messages?.map((msg) => (
          <Message key={Math.round(Math.random() * 1000)} data={msg} />
        ))}
      </div>

      {showEmojis && <EmojiPicker />}

      <div className="ProjectMessages__controls">
        <button onClick={() => setShowEmojis((oldValue) => !oldValue)}>
          <AiOutlineSmile size={25} color="var(--COLOR-GRAY-100)" />
        </button>
        <textarea
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleMessageSubmit}>
          <AiOutlineArrowRight size={25} color="var(--COLOR-GRAY-100)" />
        </button>
      </div>
    </div>
  );
};

export default ProjectMessages;

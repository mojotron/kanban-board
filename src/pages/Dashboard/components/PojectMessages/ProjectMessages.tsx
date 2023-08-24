import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { AiOutlineSmile, AiOutlineArrowRight } from 'react-icons/ai';
import './ProjectMessages.css';
import { MessageType } from '../../../../types/messageType';
import { Timestamp } from 'firebase/firestore';
import Message from '../Message/Message';

const messagesData: MessageType[] = [
  {
    authorUid: '3FH1RTMNasZ2ssaxeSZSdevj6u22',
    createdAt: Timestamp.fromDate(new Date()),
    text: 'dummy text',
  },
  {
    authorUid: 'avbfZmf9miIoyPH4Pdcm',
    createdAt: Timestamp.fromDate(new Date()),
    text: 'dummy text',
  },
  {
    authorUid: '3FH1RTMNasZ2ssaxeSZSdevj6u22',
    createdAt: Timestamp.fromDate(new Date()),
    text: 'dummy text',
  },
  {
    authorUid: 'avbfZmf9miIoyPH4Pdcm',
    createdAt: Timestamp.fromDate(new Date()),
    text: 'dummy text',
  },
  {
    authorUid: '3FH1RTMNasZ2ssaxeSZSdevj6u22',
    createdAt: Timestamp.fromDate(new Date()),
    text: 'dummy text',
  },
  {
    authorUid: 'avbfZmf9miIoyPH4Pdcm',
    createdAt: Timestamp.fromDate(new Date()),
    text: 'dummy text',
  },
  {
    authorUid: '3FH1RTMNasZ2ssaxeSZSdevj6u22',
    createdAt: Timestamp.fromDate(new Date()),
    text: 'dummy text',
  },
];

const ProjectMessages = () => {
  const [showEmojis, setShowEmojis] = useState(false);
  return (
    <div className="ProjectMessages">
      <h3 className="heading--tertiary">Messages</h3>

      <div className="ProjectMessages__messages">
        {messagesData.map((msg) => (
          <Message key={msg.createdAt.seconds} data={msg} />
        ))}
      </div>

      {showEmojis && <EmojiPicker />}
      <div className="ProjectMessages__controls">
        <button onClick={() => setShowEmojis((oldValue) => !oldValue)}>
          <AiOutlineSmile size={25} color="var(--COLOR-GRAY-100)" />
        </button>
        <textarea placeholder="Type a message..." />
        <button>
          <AiOutlineArrowRight size={25} color="var(--COLOR-GRAY-100)" />
        </button>
      </div>
    </div>
  );
};

export default ProjectMessages;

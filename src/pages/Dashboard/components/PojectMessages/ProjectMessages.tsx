import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { AiOutlineSmile, AiOutlineArrowRight } from 'react-icons/ai';
import './ProjectMessages.css';

const ProjectMessages = () => {
  const [showEmojis, setShowEmojis] = useState(false);
  return (
    <div className="ProjectMessages">
      <h3 className="heading--tertiary">Messages</h3>

      <div className="ProjectMessages__messages"></div>

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

import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { AiOutlineSmile, AiOutlineArrowRight } from 'react-icons/ai';

const ProjectMessages = () => {
  const [showEmojis, setShowEmojis] = useState(false);
  return (
    <div className="Dashboard__messages">
      <h3 className="heading--tertiary">Messages</h3>
      <div className="Dashboard__messages__body"></div>
      {showEmojis && <EmojiPicker />}
      <div className="Dashboard__messages__controls">
        <button onClick={() => setShowEmojis((oldValue) => !oldValue)}>
          <AiOutlineSmile size={25} />
        </button>
        <input type="text" placeholder="Type a message..." />
        <button>
          <AiOutlineArrowRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default ProjectMessages;

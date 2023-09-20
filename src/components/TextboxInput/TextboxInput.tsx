import { Dispatch, SetStateAction, useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
// styles
import styles from './TextboxInput.module.css';
// constants
import { TEXT_LENGTHS } from '../../constants/textLengths';
// icons
import { BiWinkSmile as SmileIcon, BiSend as CtaIcon } from 'react-icons/bi';

type PropsType = {
  onSubmitClick: () => void;
};

const TextboxInput = ({ onSubmitClick }: PropsType) => {
  const [showEmoji, setShowEmojis] = useState(false);
  const [text, setText] = useState('');

  const handleAddEmoji = (e: EmojiClickData) => {
    setText((oldValue) => `${oldValue}${e.emoji}`);
  };

  const handleSubmit = () => {
    setShowEmojis(false);
    setText('');
    onSubmitClick();
  };

  return (
    <div className={styles.container}>
      {showEmoji && (
        <EmojiPicker width={'100%'} onEmojiClick={handleAddEmoji} />
      )}

      <div className={styles.textWrapper}>
        <button
          className={styles.btn}
          onClick={() => setShowEmojis((oldValue) => !oldValue)}
        >
          <SmileIcon size={25} />
        </button>
        <textarea
          className={styles.textBox}
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={TEXT_LENGTHS.message.text}
          onFocus={() => setShowEmojis(false)}
        />
        <button className={styles.btn} onClick={handleSubmit}>
          <CtaIcon size={25} />
        </button>
      </div>

      <span className={styles.counter}>
        {text.length}/{TEXT_LENGTHS.message.text}
      </span>
    </div>
  );
};

export default TextboxInput;

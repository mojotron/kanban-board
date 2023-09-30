import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import styles from './UpdateInput.module.css';

type PropsType = {
  type: 'input' | 'textarea';
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  maxLength: number;
};

const UpdateInput = ({ type, value, onChange, maxLength }: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (type === 'input' && inputRef.current) inputRef.current.focus();
    if (type === 'textarea' && textareaRef.current) textareaRef.current.focus();
  }, []);

  return (
    <div className={styles.input}>
      {type === 'input' && (
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
        />
      )}
      {type === 'textarea' && (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
        />
      )}

      <p className={styles.counter}>
        {value.length}/{maxLength}
      </p>
    </div>
  );
};

export default UpdateInput;

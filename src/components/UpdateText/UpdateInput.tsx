import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

type PropsType = {
  type: 'input' | 'textarea';
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

const UpdateInput = ({ type, value, onChange }: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (type === 'input' && inputRef.current) inputRef.current.focus();
    if (type === 'textarea' && textareaRef.current) textareaRef.current.focus();
  }, []);

  if (type === 'input')
    return (
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default UpdateInput;

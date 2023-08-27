import { ReactNode, useState } from 'react';

type PropsType = {
  initialValue: string;
  onAction: (text: string) => void;
  children: ReactNode;
};

const InputField = ({ children, initialValue, onAction }: PropsType) => {
  const [text, setText] = useState(initialValue);

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>{children}</button>
    </div>
  );
};

export default InputField;

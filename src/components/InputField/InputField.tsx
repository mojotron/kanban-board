import { ReactNode, useState } from 'react';

type PropsType = {
  initialValue: string;
  children: ReactNode;
};

const InputField = ({ children, initialValue }: PropsType) => {
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

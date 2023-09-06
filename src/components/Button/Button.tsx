import { CSSProperties, ReactNode } from 'react';

type PropsType = {
  handleClick: () => void;
  className?: string;
  text?: string;
  children?: ReactNode | null;
};

const buttonStyle: CSSProperties = {};

const Button = ({
  handleClick,
  className = '',
  children = null,
  text = 'Click',
}: PropsType) => {
  return (
    <button style={buttonStyle} className={className} onClick={handleClick}>
      {children ? children : text}
    </button>
  );
};

export default Button;

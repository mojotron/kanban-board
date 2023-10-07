import { CSSProperties, ReactNode } from 'react';

type PropsType = {
  handleClick: () => void;
  className?: string;
  text?: string;
  children?: ReactNode | null;
};

const Button = ({
  handleClick,
  className = '',
  children = null,
  text = 'Click',
}: PropsType) => {
  return (
    <button className={className} onClick={handleClick}>
      {children ? children : text}
    </button>
  );
};

export default Button;

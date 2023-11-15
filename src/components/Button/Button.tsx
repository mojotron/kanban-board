import { ReactNode } from 'react';

type PropsType = {
  handleClick: () => void;
  className?: string;
  text?: string;
  children?: ReactNode | null;
  disabled?: boolean;
};

const Button = ({
  handleClick,
  className = '',
  children = null,
  text = 'Click',
  disabled = false,
}: PropsType) => {
  return (
    <button className={className} onClick={handleClick} disabled={disabled}>
      {children ? children : text}
    </button>
  );
};

export default Button;

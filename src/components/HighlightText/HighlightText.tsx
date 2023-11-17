import { ReactNode } from 'react';
import styles from './HighlightTest.module.css';

type TextSize = 'small' | 'normal' | 'big' | 'large' | 'gigantic';

type PropsType = {
  children: ReactNode;
  size?: TextSize;
  heading?: boolean;
};

const transformSize = (size: TextSize) => {
  switch (size) {
    case 'small':
      return '1rem';
    case 'normal':
      return '1.563rem';
    case 'big':
      return '2.441rem';
    case 'large':
      return '3.815rem';
    case 'gigantic':
      return '5.96rem';
  }
};

// This component is best suited for text as children
const HighlightText = ({
  children,
  size = 'normal',
  heading = false,
}: PropsType) => {
  if (heading) {
    return (
      <h1
        className={styles.highlight}
        style={{ fontSize: `${transformSize(size)}` }}
      >
        {children}
      </h1>
    );
  }

  return (
    <strong
      className={styles.highlight}
      style={{ fontSize: `${transformSize(size)}` }}
    >
      {children}
    </strong>
  );
};

export default HighlightText;

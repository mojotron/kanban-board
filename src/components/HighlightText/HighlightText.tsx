import { ReactNode } from 'react';
import styles from './HighlightTest.module.css';

type TextSize = 'small' | 'normal' | 'big';

type PropsType = {
  children: ReactNode;
  size?: TextSize;
};

const transformSize = (size: TextSize) => {
  switch (size) {
    case 'small':
      return '1rem';
    case 'normal':
      return '1.6rem';
    case 'big':
      return '2.4rem';
  }
};

// This component is best suited for text as children
const HighlightText = ({ children, size = 'normal' }: PropsType) => {
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

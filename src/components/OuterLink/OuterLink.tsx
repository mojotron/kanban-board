import { ReactNode } from 'react';
import styles from './OuterLink.module.css';

type PropsType = {
  to: string;
  children: ReactNode;
};

const OuterLink = ({ to, children }: PropsType) => {
  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      {children}
    </a>
  );
};

export default OuterLink;

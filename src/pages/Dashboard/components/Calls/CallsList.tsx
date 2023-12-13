import { ReactNode } from 'react';
import styles from './Calls.module.css';

type PropsType = {
  children: ReactNode;
};

const CallsList = ({ children }: PropsType) => {
  return <ul className={styles.list}>{children}</ul>;
};

export default CallsList;

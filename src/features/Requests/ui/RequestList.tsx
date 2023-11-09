import { ReactNode } from 'react';
import styles from './RequestList.module.css';

type PropsType = {
  children: ReactNode;
};

const RequestList = ({ children }: PropsType) => {
  return <ul className={styles.list}>{children}</ul>;
};

export default RequestList;

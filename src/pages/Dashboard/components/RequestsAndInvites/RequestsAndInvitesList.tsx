import { ReactNode } from 'react';
import styles from './RequestsAndInvites.module.css';

type PropsType = {
  children: ReactNode;
};

const RequestsAndInvitesList = ({ children }: PropsType) => {
  return <ul className={styles.list}>{children}</ul>;
};

export default RequestsAndInvitesList;

import styles from './NotificationCount.module.css';

const NotificationCount = ({ count }: { count: number }) => {
  return <span className={styles.notificationCount}>{count}</span>;
};

export default NotificationCount;

import styles from './NotificationCount.module.css';

const NotificationCount = ({ count }: { count: number }) => {
  if (count < 1) return null;
  return <span className={styles.notificationCount}>{count}</span>;
};

export default NotificationCount;

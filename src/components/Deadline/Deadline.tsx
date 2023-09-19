import { Timestamp } from 'firebase/firestore';
import { useMemo } from 'react';
import { formatTime } from '../../utils/formatTime';
import styles from './Deadline.module.css';

const Deadline = ({ time }: { time: Timestamp }) => {
  const deadline = useMemo(() => {
    return {
      formatted: formatTime(time.seconds * 1000),
      overDue: (+new Date() - time.seconds * 1000) / 1000,
    };
  }, [time]);

  if (!deadline) return null;

  return (
    <div className={`${styles.deadline} $`}>
      Deadline:{' '}
      <span
        className={deadline.overDue ? styles.deadlineRed : styles.deadlineGreen}
      >
        {deadline.formatted}
      </span>
    </div>
  );
};

export default Deadline;

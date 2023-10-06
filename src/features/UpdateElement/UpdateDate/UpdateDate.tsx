import { Timestamp } from 'firebase/firestore';
import {
  formatForInputTypeDate,
  formatLocalDate,
  formatTime,
} from '../../../utils/formatTime';
import { useState, useMemo } from 'react';
import UpdateButton from '../components/UpdateButton';
import UpdateControls from '../components/UpdateControls';
import styles from './UpdateDate.module.css';

type PropsType = {
  timestamp: Timestamp;
  updatable?: boolean;
  onUpdate: () => void;
};

const UpdateDate = ({ timestamp, updatable = true }: PropsType) => {
  const [dateString, setDateString] = useState(() =>
    formatForInputTypeDate(new Date(timestamp.seconds * 1000))
  );
  const [edit, setEdit] = useState(false);

  const dateObject = useMemo(() => {
    const timeFromEpoch = Date.parse(dateString);
    return {
      date: formatLocalDate(timeFromEpoch),
      formatted: formatTime(timeFromEpoch), // string like 1 day ago
      overDue: +new Date() - timeFromEpoch,
    };
  }, [dateString]);

  console.log(dateString);

  if (edit)
    return (
      <div className={styles.update}>
        <input
          type="date"
          value={dateString}
          onChange={(e) => setDateString(e.target.value)}
        />
        <UpdateControls
          config={[
            { type: 'close', onClick: () => setEdit(false) },
            {
              type: 'submit',
              onClick: () => {
                // TODO
                setEdit(false);
              },
            },
          ]}
        />
      </div>
    );

  return (
    <div className={styles.update}>
      <p>{dateObject.date}</p>
      <p className={dateObject.overDue ? styles.red : styles.green}>
        {dateObject.formatted}
      </p>
      {updatable && <UpdateButton onClick={() => setEdit(true)} />}
    </div>
  );
};

export default UpdateDate;

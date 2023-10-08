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
  timestamp: Timestamp | null;
  updatable?: boolean;
  onUpdate: (value: Timestamp) => void;
};

const UpdateDate = ({ timestamp, onUpdate, updatable = true }: PropsType) => {
  const [dateString, setDateString] = useState(() =>
    formatForInputTypeDate(
      timestamp ? new Date(timestamp.seconds * 1000) : new Date()
    )
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

  console.log(dateObject.overDue);

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
            {
              type: 'close',
              onClick: () => {
                setEdit(false);
              },
            },
            {
              type: 'submit',
              onClick: () => {
                onUpdate(Timestamp.fromDate(new Date(dateObject.date)));
                setEdit(false);
              },
            },
          ]}
        />
      </div>
    );

  return (
    <div className={styles.update}>
      {timestamp && (
        <>
          <p>{dateObject.date}</p>
          <p className={dateObject.overDue > 0 ? styles.red : styles.green}>
            {dateObject.formatted}
          </p>
        </>
      )}
      {!timestamp && <p>Add task deadline</p>}
      {updatable && <UpdateButton onClick={() => setEdit(true)} />}
    </div>
  );
};

export default UpdateDate;

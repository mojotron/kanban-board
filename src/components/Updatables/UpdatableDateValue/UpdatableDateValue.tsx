import { Timestamp } from 'firebase/firestore';
import { useMemo, useState } from 'react';
import '../Updatables.css';
import {
  AiFillEdit,
  AiFillCloseCircle,
  AiFillRightCircle,
} from 'react-icons/ai';
import {
  formatLocalDate,
  formatTime,
  formatForInputTypeDate,
} from '../../../utils/formatTime';

type PropsType = {
  timestamp: Timestamp;
  displayDeadline: boolean;
  handleUpdate: <T>(value: T) => void;
};

const UpdatableDateValue = ({
  timestamp,
  displayDeadline,
  handleUpdate,
}: PropsType) => {
  const [edit, setEdit] = useState(false);
  const [date, setDate] = useState(
    formatForInputTypeDate(new Date(timestamp.seconds * 1000))
  );

  const dateObject = useMemo(() => {
    return {
      date: formatLocalDate(new Date(timestamp.seconds * 1000)),
      formatted: formatTime(timestamp.seconds * 1000),
      overDue: (+new Date() - timestamp.seconds * 1000) / 1000,
    };
  }, [timestamp]);

  const handleCancelChange = () => {
    setDate(formatForInputTypeDate(new Date(timestamp.seconds * 1000)));
    setEdit(false);
  };

  return (
    <div className="Updatables">
      {edit ? (
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={handleCancelChange}>
            <AiFillCloseCircle size={15} />
          </button>
          <button
            onClick={async () => {
              handleUpdate(Timestamp.fromDate(new Date(date)));
              setEdit(false);
            }}
          >
            <AiFillRightCircle size={15} />
          </button>
        </div>
      ) : (
        <div>
          <span>{dateObject.date}</span>
          {displayDeadline && (
            <span
              className={`deadline-tag deadline-tag--${
                dateObject.overDue > 0 ? 'red' : 'green'
              }`}
            >
              {dateObject.formatted}
            </span>
          )}
        </div>
      )}

      {!edit && (
        <button className="Updatables__btn--edit" onClick={() => setEdit(true)}>
          <AiFillEdit size={15} />
        </button>
      )}
    </div>
  );
};

export default UpdatableDateValue;
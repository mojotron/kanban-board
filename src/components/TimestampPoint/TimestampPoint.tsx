import { Timestamp } from 'firebase/firestore';
import { formatTime } from '../../utils/formatTime';

type PropsType = {
  time: Timestamp;
  className?: string;
};

const TimestampPoint = ({ time, className = '' }: PropsType) => {
  return <span className={className}>{formatTime(time.seconds * 1000)}</span>;
};

export default TimestampPoint;

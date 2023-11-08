import { Timestamp } from 'firebase/firestore';
import { formatTime } from '../../utils/formatTime';

type PropsType = {
  time: Timestamp;
};

const TimestampPoint = ({ time }: PropsType) => {
  return <div>{formatTime(time.seconds * 1000)}</div>;
};

export default TimestampPoint;

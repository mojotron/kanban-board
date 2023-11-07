import { useCollectDocs } from '../../../hooks/useCollectDocs';
import { RequestType } from '../../../types/requestType';

type PropsType = {
  requests: RequestType[];
  type: 'users' | 'projects';
};

const RequestList = ({ requests, type }: PropsType) => {
  const {} = useCollectDocs();
  return (
    <div>
      {requests.map((ele) => (
        <p>{ele.userId}</p>
      ))}
    </div>
  );
};

export default RequestList;

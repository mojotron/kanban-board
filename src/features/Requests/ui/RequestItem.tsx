import { ProjectWithId } from '../../../types/projectType';
import type { RequestOption, RequestType } from '../../../types/requestType';
import { UserWithId } from '../../../types/userType';
import { useGetRequestOption } from '../hooks/useGetRequestOption';
import RequestUserItem from './RequestUserItem';

type PropsType = {
  request: RequestType;
  option: RequestOption;
};

const RequestItem = ({ request, option }: PropsType) => {
  const { data, pending, error } = useGetRequestOption(
    option,
    option === 'projects' ? request.projectId : request.userId
  );

  if (error) return <li>Request encountered problem!</li>;
  if (pending) return <li>Loading request...</li>;
  if (!data) return null;

  if (option === 'projects') {
    const projectData = data as ProjectWithId;
    return <li>{projectData.name}</li>;
  }

  if (option === 'users') {
    return <RequestUserItem data={data as UserWithId} request={request} />;
  }
};

export default RequestItem;

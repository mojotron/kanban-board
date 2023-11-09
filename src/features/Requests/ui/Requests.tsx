import { useProject } from '../../../context/ProjectContext';
import { RequestOption } from '../../../types/requestType';
import RequestItem from './RequestItem';
import RequestList from './RequestList';

type PropsType = {
  option: RequestOption;
  title?: string;
  className?: string;
};

const Requests = ({
  option,
  title = 'New Requests',
  className = '',
}: PropsType) => {
  const { project } = useProject();

  if (!project) return;
  if (project.requests.length < 1) return null;

  return (
    <section className={className}>
      <h2>{title}</h2>
      <RequestList>
        {project.requests.map((request, i) => (
          <RequestItem key={i} request={request} option={option} />
        ))}
      </RequestList>
    </section>
  );
};

export default Requests;

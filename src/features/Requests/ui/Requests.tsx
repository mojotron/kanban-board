import { useProject } from '../../../context/ProjectContext';
import { RequestOption } from '../../../types/requestType';
import RequestItem from './RequestItem';
import RequestList from './RequestList';

type PropsType = { className?: string; option: RequestOption };

const Requests = ({ className = '', option }: PropsType) => {
  const { project } = useProject();

  if (!project) return;
  if (project.requests.length < 1) return null;

  return (
    <section className={className}>
      <h2>New Requests</h2>
      <RequestList>
        {project.requests.map((request, i) => (
          <RequestItem key={i} request={request} option={option} />
        ))}
      </RequestList>
    </section>
  );
};

export default Requests;

import { useProject } from '../../../context/ProjectContext';
import RequestItem from './RequestItem';
import RequestList from './RequestList';

type PropsType = {
  title?: string;
  className?: string;
};

const Requests = ({ title = 'New Requests', className = '' }: PropsType) => {
  const { project } = useProject();

  if (!project) return;
  if (project.requests.length < 1) return null;

  return (
    <section className={className}>
      <h2>{title}</h2>
      <RequestList>
        {project.requests.map((request, i) => (
          <RequestItem key={i} request={request} />
        ))}
      </RequestList>
    </section>
  );
};

export default Requests;

import { useProject } from '../../../context/ProjectContext';
import { useCollectDocs } from '../../../hooks/useCollectDocs';
import RequestList from './RequestList';

type PropsType = { className?: string };

const Requests = ({ className = '' }: PropsType) => {
  const { project } = useProject();

  return (
    <section className={className}>
      <h2>Requests</h2>
      {project && <RequestList requests={project.requests} />}
    </section>
  );
};

export default Requests;

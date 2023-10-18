import { useProjectDetails } from './useProjectDetails';
import { useParams } from 'react-router-dom';
// components
import Button from '../../components/Button/Button';
// styles
import styles from './ProjectDetails.module.css';
import { formatLocalDate } from '../../utils/formatTime';
import AdminAvatar from '../../components/AdminAvatar/AdminAvatar';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { project, error, pending } = useProjectDetails(projectId);

  console.log(project, error, pending);

  return (
    <div className={styles.container}>
      <Button handleClick={() => {}}>Go back</Button>
      {/* {pending && <p>Loading project data...</p>}
      {error && <p>{error}</p>} */}
      {project && (
        <>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <p>
            Created at:{' '}
            {formatLocalDate(new Date(project.createdAt.seconds * 1000))}
          </p>

          <section>
            <p>Members</p>
            <AdminAvatar type="adminUid" data={project.adminUid} />
          </section>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;

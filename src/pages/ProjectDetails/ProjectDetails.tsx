import { useProjectDetails } from './useProjectDetails';
import { useParams } from 'react-router-dom';
// components
import Button from '../../components/Button/Button';
// styles
import styles from './ProjectDetails.module.css';
import { formatLocalDate } from '../../utils/formatTime';
import TagsList from '../../components/TagsList/TagsList';
import CurrentTasks from './components/CurrentTasks/CurrentTasks';
import CurrentMembers from './components/CurrentMembers/CurrentMembers';

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
          <TagsList tags={project.tags} />
          <p>Project status: {project.finished ? 'finished' : 'active'}</p>
          <p>{project.description}</p>
          <p>
            Created at:{' '}
            {formatLocalDate(new Date(project.createdAt.seconds * 1000))}
          </p>

          <CurrentMembers
            adminUid={project.adminUid}
            membersUid={project.members}
          />

          <CurrentTasks taskList={project.tasks} />

          {!project.public && (
            <Button handleClick={() => {}}>Request join</Button>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectDetails;

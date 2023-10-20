import { useProjectDetails } from './useProjectDetails';
import { useParams, useNavigate } from 'react-router-dom';
// components
import Button from '../../components/Button/Button';
// styles
import styles from './ProjectDetails.module.css';
import CurrentTasks from './components/CurrentTasks/CurrentTasks';
import CurrentMembers from './components/CurrentMembers/CurrentMembers';
import ProjectInfo from './components/ProjectInfo/ProjectInfo';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { project, error, pending } = useProjectDetails(projectId);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Button handleClick={() => navigate(-1)} className={styles.btnBack}>
        Go back
      </Button>

      {pending && !project && <p>Loading project data...</p>}
      {error && !project && <p>{error}</p>}

      {project && (
        <main className={styles.details}>
          <ProjectInfo project={project} />

          <CurrentMembers
            adminUid={project.adminUid}
            membersUid={project.members}
          />

          <CurrentTasks taskList={project.tasks} />
        </main>
      )}
    </div>
  );
};

export default ProjectDetails;

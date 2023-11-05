import { Link } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import TagsList from '../../../../components/TagsList/TagsList';
import { useUserData } from '../../../../context/UserDataContext';
import { ProjectWithId } from '../../../../types/projectType';
import { formatLocalDate } from '../../../../utils/formatTime';
import styles from './ProjectInfo.module.css';
import { useMemo } from 'react';
import { useRequests } from '../../../../features/Requests/hooks/useRequests';

type PropsType = {
  project: ProjectWithId;
};

const ProjectInfo = ({ project }: PropsType) => {
  const { document: user } = useUserData();
  // TODO get all request docs
  const { applyToProject, cancelRequest } = useRequests();

  const onProject = useMemo(() => {
    if (!user) return false;
    return (
      project.adminUid === user?.uid || project.members.includes(user?.uid)
    );
  }, [user, project]);

  const isApplied = useMemo(() => {
    if (!user) return false;
    return project.requests.includes(user.uid);
  }, [user, project]);

  console.log(isApplied);

  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <div>
          <h2 className={styles.heading}>{project.name}</h2>
          <TagsList tags={project.tags} />
        </div>

        <div className={styles.bonus}>
          <p>
            Project status:{' '}
            <span className={project.finished ? styles.red : styles.green}>
              {project.finished ? 'finished' : 'active'}
            </span>
          </p>
          <p>
            Created at:{' '}
            {formatLocalDate(new Date(project.createdAt.seconds * 1000))}
          </p>
        </div>
        {!project.public && !onProject && !isApplied && (
          <Button
            handleClick={() => applyToProject(project.id)}
            className={`${styles.btn} ${styles.btnJoin}`}
          >
            Request join
          </Button>
        )}
        {onProject && (
          <Link to={`/dashboard/${project.id}`}>Go to Dashboard</Link>
        )}
        {isApplied && !onProject && (
          <Button
            handleClick={() => cancelRequest(project.id)}
            className={`${styles.btn} ${styles.btnCancel}`}
          >
            Cancel Request
          </Button>
        )}
      </div>

      <p className={styles.description}>{project.description}</p>
    </header>
  );
};

export default ProjectInfo;

import { Link } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import TagsList from '../../../../components/TagsList/TagsList';
import { useUserData } from '../../../../context/UserDataContext';
import { ProjectWithId } from '../../../../types/projectType';
import { formatLocalDate } from '../../../../utils/formatTime';
import styles from './ProjectInfo.module.css';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useRequests } from '../../../../features/Requests/hooks/useRequests';
import { RequestTypeWithId } from '../../../../features/Requests/types/requestType';

type PropsType = {
  project: ProjectWithId;
};

const ProjectInfo = ({ project }: PropsType) => {
  console.log(project.requests);

  const { document: user } = useUserData();
  // TODO get all request docs

  const { applyToProject, cancelRequest, hasRequest } = useRequests();

  const request = project.requests.length > 0;
  console.log(request);

  const onProject = useMemo(() => {
    if (!user) return false;
    return (
      project.adminUid === user?.uid || project.members.includes(user?.uid)
    );
  }, [user, project]);

  useEffect(() => {
    console.log('EFFECT >>>');
    hasRequest(project.id).then((res) => console.log('[HERE]', res));
    console.log('EFFECT <<<');
  }, [project]);

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
        {!project.public && !onProject && !request && (
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
        {request && !onProject && (
          <Button
            handleClick={() => cancelRequest(project.id, project.requests[0])}
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

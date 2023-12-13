import { Link } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import TagsList from '../../../../components/TagsList/TagsList';
import { useUserData } from '../../../../context/UserDataContext';
import { ProjectWithId } from '../../../../types/projectType';
import { formatLocalDate } from '../../../../utils/formatTime';
import styles from './ProjectInfo.module.css';
import { useMemo } from 'react';

import InviteControls from './InviteControls';
import RequestControls from './RequestControls';

type PropsType = {
  project: ProjectWithId;
};

const ProjectInfo = ({ project }: PropsType) => {
  const { document: user } = useUserData();

  const onProject = useMemo(() => {
    if (!user) return false;
    return (
      project.adminUid === user?.uid || project.members.includes(user?.uid)
    );
  }, [user, project]);

  const hasRequest = useMemo(() => {
    if (!user) return undefined;
    return project.requests.find((request) => request.userId === user.uid);
  }, [user, project]);

  const hasInvite = useMemo(() => {
    if (!user) return undefined;
    return project.invites.find((invite) => invite.userId === user.uid);
  }, [user, project]);

  if (!user) return null;

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

        {onProject ? (
          <Link to={`/dashboard/${project.id}`}>Go to Dashboard</Link>
        ) : (
          <RequestControls
            isPublic={project.public}
            request={hasRequest}
            projectId={project.id}
            userId={user?.uid}
          />
        )}
        {hasInvite && (
          <InviteControls
            userId={user.uid}
            projectId={project.id}
            adminId={project.adminUid}
          />
        )}
      </div>

      <p className={styles.description}>{project.description}</p>
    </header>
  );
};

export default ProjectInfo;

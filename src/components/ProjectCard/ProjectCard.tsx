// hooks
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../context/UserDataContext';
// types
import { ProjectWithId } from '../../types/projectType';
// styles
import styles from './ProjectCard.module.css';
// components
import AdminAvatar from '../AdminAvatar/AdminAvatar';
import TagsList from '../TagsList/TagsList';
import { useMemo } from 'react';

type PropsType = {
  data: ProjectWithId;
};

const ProjectCard = ({ data }: PropsType) => {
  const navigate = useNavigate();
  const { document: user } = useUserData();

  const shortDescription = data.description.split(' ').slice(0, 20).join(' ');

  const userWorkingOnProject = useMemo(() => {
    if (!user) return false;

    return [...user.managingProjects, ...user.collaboratingProjects].includes(
      user.uid
    );
  }, [user]);

  if (!user) return;

  return (
    <article
      className={styles.projectCard}
      onClick={() => {
        if (userWorkingOnProject) {
          navigate(`/dashboard/${data.id}`);
        } else {
          navigate(`/project/${data.id}`);
        }
      }}
    >
      <header className={styles.header}>
        <h2 className={styles.heading}>{data.name}</h2>
      </header>

      <section className={styles.body}>
        <div className={styles.bodyLeft}>
          <TagsList tags={data.tags} />
          <p className={styles.tasks}>
            Current tasks:{' '}
            <span className={styles.tasksNumber}>{data.tasks.length}</span>
          </p>

          <p className={styles.description}>{shortDescription}</p>
        </div>
        <AdminAvatar type={'adminUid'} data={data.adminUid} />
      </section>
    </article>
  );
};

export default ProjectCard;

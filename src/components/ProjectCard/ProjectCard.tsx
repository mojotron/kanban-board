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
import Button from '../Button/Button';
import { useMemo } from 'react';

type PropsType = {
  data: ProjectWithId;
};

const ProjectCard = ({ data }: PropsType) => {
  const navigate = useNavigate();
  const { document: user } = useUserData();

  if (!user) return;
  const shortDescription = data.description.split(' ').slice(0, 20).join(' ');

  const onProject = useMemo(() => {
    return [...user.managingProjects, ...user.collaboratingProjects].includes(
      user.uid
    );
  }, [user]);

  const userWorkingOnProject = () => {
    return (
      data.adminUid === user.uid || user.collaboratingProjects.includes(data.id)
    );
  };

  return (
    <article
      className={styles.projectCard}
      onClick={() => {
        if (userWorkingOnProject())
          navigate(`/dashboard/${data.id}
      `);
      }}
    >
      <header className={styles.header}>
        <h2 className={styles.heading}>{data.name}</h2>
        {!onProject && (
          <Button handleClick={() => {}} className={styles.btnRequest}>
            Request Join
          </Button>
        )}
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

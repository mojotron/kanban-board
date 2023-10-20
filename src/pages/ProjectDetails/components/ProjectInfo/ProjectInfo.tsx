import Button from '../../../../components/Button/Button';
import TagsList from '../../../../components/TagsList/TagsList';
import { ProjectWithId } from '../../../../types/projectType';
import { formatLocalDate } from '../../../../utils/formatTime';
import styles from './ProjectInfo.module.css';

type PropsType = {
  project: ProjectWithId;
};

const ProjectInfo = ({ project }: PropsType) => {
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
        {!project.public && (
          <Button handleClick={() => {}} className={styles.btnJoin}>
            Request join
          </Button>
        )}
      </div>

      <p className={styles.description}>{project.description}</p>
    </header>
  );
};

export default ProjectInfo;

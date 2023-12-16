import { useProject } from '../../../../context/ProjectContext';
// styles
import styles from './Description.module.css';

const Description = () => {
  const { project } = useProject();

  if (!project) return null;

  return (
    <header className={styles.description}>
      <h1 className={styles.descriptionTitle}>{project.name}</h1>
    </header>
  );
};

export default Description;

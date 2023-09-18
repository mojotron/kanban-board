import { useProject } from '../../../../context/ProjectContext';
// styles
import styles from './Description.module.css';
// components
import TagsList from '../../../../components/TagsList/TagsList';

const Description = () => {
  const { project } = useProject();

  if (!project) return null;

  return (
    <header className={styles.description}>
      <h1 className={styles.descriptionTitle}>{project.name}</h1>

      <TagsList tags={project.tags} />
    </header>
  );
};

export default Description;

import { useProject } from '../../../../context/ProjectContext';
// styles
import styles from './Description.module.css';
// components
import ExpandedText from '../../../../components/ExpandedText/ExpandedText';
import TagsList from '../../../../components/TagsList/TagsList';

const Description = () => {
  const { project } = useProject();

  if (!project) return null;

  return (
    <header className={styles.description}>
      <h1 className={styles.descriptionTitle}>{project.name}</h1>

      <TagsList tags={project.tags} />

      <ExpandedText
        text={project.description}
        hideWordsLength={20}
        className="Dashboard__header__description"
      />
    </header>
  );
};

export default Description;

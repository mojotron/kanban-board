// hooks
import { useCloseOnEscape } from '../../../../hooks/useCloseOnEscape';
import { useProject } from '../../../../context/ProjectContext';
import { useTeam } from '../../../../context/TeamContext';
// components
import TagsList from '../../../../components/TagsList/TagsList';
import AdminAvatar from '../../../../components/AdminAvatar/AdminAvatar';
import Button from '../../../../components/Button/Button';
import UpdateText from '../../../../components/UpdateText/UpdateText';
// styles
import styles from './EditProject.module.css';
// constants
import { TEXT_LENGTHS } from '../../../../constants/textLengths';

type PropsType = {
  onClose: () => void;
};
const EditProject = ({ onClose }: PropsType) => {
  useCloseOnEscape(onClose);
  const { project } = useProject();
  const { getMember } = useTeam();

  if (!project) return null;

  return (
    <div className="overlay">
      <div className={styles.edit}>
        <Button className={styles.btnClose} handleClick={onClose}>
          &times;
        </Button>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <UpdateText
              text={project.name}
              maxLength={TEXT_LENGTHS.project.title}
              className={styles.projectName}
            />

            <UpdateText
              text=""
              link={{
                to: project.repository,
                label: true,
                labelText: 'Project Repository',
              }}
            />

            <TagsList tags={project.tags} />
          </div>

          <div className={styles.headerRight}>
            <Button handleClick={() => {}} className={styles.btnPublic}>
              Make Project {project.public ? 'Private' : 'Public'}
            </Button>
            <AdminAvatar admin={getMember(project.adminUid)} />
          </div>
        </header>

        <UpdateText
          text={project.description}
          type="textarea"
          maxLength={TEXT_LENGTHS.project.description}
          className={styles.projectDescription}
        />
      </div>
    </div>
  );
};

export default EditProject;

import { useCloseOnEscape } from '../../../../hooks/useCloseOnEscape';
import { useProject } from '../../../../context/ProjectContext';
// styles
import styles from './EditProject.module.css';
import Button from '../../../../components/Button/Button';
import UpdatableTextValue from '../../../../components/Updatables/UpdatableTextValue/UpdatableTextValue';
import { TEXT_LENGTHS } from '../../../../constants/textLengths';
import OuterLink from '../../../../components/OuterLink/OuterLink';
import TagsList from '../../../../components/TagsList/TagsList';
import AdminAvatar from '../../../../components/AdminAvatar/AdminAvatar';
import { useTeam } from '../../../../context/TeamContext';
import UpdateText from '../../../../components/UpdateText/UpdateText';

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
            <UpdateText text={project.name} />
            <OuterLink to={project.repository}>Project Repository</OuterLink>
            <TagsList tags={project.tags} />
          </div>

          <div className={styles.headerRight}>
            <Button handleClick={() => {}} className={styles.btnPublic}>
              Make Project {project.public ? 'Private' : 'Public'}
            </Button>
            <AdminAvatar admin={getMember(project.adminUid)} />
          </div>
        </header>

        <UpdateText text={project.description} type="textarea" />
      </div>
    </div>
  );
};

export default EditProject;

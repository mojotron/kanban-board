import { useCloseOnEscape } from '../../../../hooks/useCloseOnEscape';
import { useProject } from '../../../../context/ProjectContext';
// styles
import styles from './EditProject.module.css';
import Button from '../../../../components/Button/Button';
import UpdatableTextValue from '../../../../components/Updatables/UpdatableTextValue/UpdatableTextValue';
import { TEXT_LENGTHS } from '../../../../constants/textLengths';
import UpdatableSelectValue from '../../../../components/Updatables/UpdatableSelectValue/UpdatableSelectValue';
import { PRIORITIES } from '../../../../constants/priorities';
import OuterLink from '../../../../components/OuterLink/OuterLink';

type PropsType = {
  onClose: () => void;
};
const EditProject = ({ onClose }: PropsType) => {
  useCloseOnEscape(onClose);
  const { project } = useProject();

  if (!project) return null;

  return (
    <div className="overlay">
      <div className={styles.edit}>
        <Button className={styles.btnClose} handleClick={onClose}>
          X
        </Button>

        <UpdatableTextValue
          displayValue={project.name}
          handleUpdate={() => {}}
          role="heading"
          maxLength={TEXT_LENGTHS.project.title}
        />

        <Button handleClick={() => {}}>Go Public</Button>

        <OuterLink to={project.repository}>Repository</OuterLink>

        <UpdatableTextValue
          displayValue={project.description}
          handleUpdate={() => {}}
          role="paragraph"
          maxLength={TEXT_LENGTHS.project.description}
        />
      </div>
    </div>
  );
};

export default EditProject;

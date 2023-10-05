// hooks
import { useCloseOnEscape } from '../../../../hooks/useCloseOnEscape';
import { useProject } from '../../../../context/ProjectContext';
import { useTeam } from '../../../../context/TeamContext';
// components
import AdminAvatar from '../../../../components/AdminAvatar/AdminAvatar';
import Button from '../../../../components/Button/Button';
import UpdateText from '../../../../features/UpdateElement/UpdateText/UpdateText';
import UpdateList from '../../../../features/UpdateElement/UpdateList/UpdateList';
// styles
import styles from './EditProject.module.css';
// constants
import { TEXT_LENGTHS } from '../../../../constants/textLengths';
import ModalCloseBtn from '../../../../components/ModalCloseBtn/ModalCloseBtn';

type PropsType = {
  onClose: () => void;
};
const EditProject = ({ onClose }: PropsType) => {
  useCloseOnEscape(onClose);
  const { project, updateProjectField } = useProject();
  const { getMember } = useTeam();

  if (!project) return null;

  return (
    <div className="overlay">
      <div className={styles.edit}>
        <ModalCloseBtn handleClose={onClose} />

        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <UpdateText
              text={project.name}
              maxLength={TEXT_LENGTHS.project.title}
              className={styles.projectName}
              onUpdate={async (newName) => updateProjectField('name', newName)}
            />

            <UpdateText
              text=""
              link={{
                to: project.repository,
                label: true,
                labelText: 'Project Repository',
              }}
              onUpdate={(newLink) => updateProjectField('repository', newLink)}
            />

            <UpdateList
              list={project.tags}
              onUpdate={(newTags) => updateProjectField('tags', newTags)}
              listStyle={styles.tags}
              itemStyle="tag"
            />
          </div>

          <div className={styles.headerRight}>
            <Button
              handleClick={() => updateProjectField('public', !project.public)}
              className={styles.btnPublic}
            >
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
          onUpdate={async (newDescription) =>
            updateProjectField('description', newDescription)
          }
        />
      </div>
    </div>
  );
};

export default EditProject;

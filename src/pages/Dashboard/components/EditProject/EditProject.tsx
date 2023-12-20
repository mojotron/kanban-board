// hooks
import { useCloseOnEscape } from '../../../../hooks/useCloseOnEscape';
import { useProject } from '../../../../context/ProjectContext';
import { useTeam } from '../../../../context/TeamContext';
// components
import AdminAvatar from '../../../../components/AdminAvatar/AdminAvatar';
import UpdateText from '../../../../features/UpdateElement/UpdateText/UpdateText';
import UpdateList from '../../../../features/UpdateElement/UpdateList/UpdateList';
import AdminControls from './AdminControls';
// styles
import styles from './EditProject.module.css';
// constants
import { TEXT_LENGTHS } from '../../../../constants/textLengths';
import ModalCloseBtn from '../../../../components/ModalCloseBtn/ModalCloseBtn';
import LeaveProject from './LeaveProject';

type PropsType = {
  onClose: () => void;
};
const EditProject = ({ onClose }: PropsType) => {
  useCloseOnEscape(onClose);
  const { project, updateProjectField, isAdmin, isMember } = useProject();
  const { getMember } = useTeam();

  if (!project) return null;

  const adminData = getMember(project.adminUid);

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
              updatable={isAdmin}
            />

            <UpdateText
              text=""
              link={{
                to: project.repository,
                label: true,
                labelText: 'Project Repository',
              }}
              onUpdate={(newLink) => updateProjectField('repository', newLink)}
              updatable={isAdmin}
            />

            <UpdateList
              list={project.tags}
              onUpdate={(newTags) => updateProjectField('tags', newTags)}
              listStyle={styles.tags}
              itemStyle="tag"
              updatable={isAdmin}
            />
          </div>

          <div className={styles.headerRight}>
            {adminData && <AdminAvatar type={'adminObject'} data={adminData} />}
            {isAdmin && <AdminControls />}
            {isMember && <LeaveProject />}
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
          updatable={isAdmin}
        />
      </div>
    </div>
  );
};

export default EditProject;

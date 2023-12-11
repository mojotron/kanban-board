import { useState } from 'react';
import Button from '../../../../components/Button/Button';
import { useUserData } from '../../../../context/UserDataContext';
import { UserType } from '../../../../types/userType';
import { ProjectWithId } from '../../../../types/projectType';
import styles from './InviteUser.module.css';
import { useNotification } from '../../../../features/Notifications/hooks/useNotification';
import { useInvites } from '../../../../features/Invites/hooks/useInvites';
import { useCollectDocsSnapshot } from '../../../../hooks/useCollectDocsSnapshot';

type PropsType = {
  user: UserType;
};

const InviteUser = ({ user }: PropsType) => {
  const { document: currentUser } = useUserData();
  const { documents } = useCollectDocsSnapshot<ProjectWithId>(
    currentUser?.managingProjects,
    'projects'
  );
  const { createNotification } = useNotification();
  const { inviteUser } = useInvites();

  const [openProjectSelect, setOpenProjectSelect] = useState(false);

  if (user.upForWork === false) return <p>Not interested in collaboration!</p>;

  const handleInviteUser = async (projectId: string, adminId: string) => {
    inviteUser(projectId, user.uid);
    // send notification to user
    createNotification(user.uid, adminId, projectId, 'project/invite-user');
    // send notification to current user (admin of project he/she invites to)
    createNotification(adminId, user.uid, projectId, 'project/send-invite');
    setOpenProjectSelect(false);
  };

  return (
    <div className={styles.invite}>
      <Button
        className="btn"
        handleClick={() => setOpenProjectSelect((oldValue) => !oldValue)}
      >
        {openProjectSelect ? 'Close project select' : 'Invite to project'}
      </Button>

      {openProjectSelect ? (
        <div className={styles.inviteButtons}>
          {documents
            ?.filter(
              (project) =>
                !project.invites.find((invite) => invite.userId === user.uid)
            )
            .map((project) => (
              <Button
                className={styles.inviteBtn}
                key={project.id}
                handleClick={() =>
                  handleInviteUser(project.id, project.adminUid)
                }
              >
                {project.name}
              </Button>
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default InviteUser;

import { useState } from 'react';
import Button from '../../../../components/Button/Button';
import { useUserData } from '../../../../context/UserDataContext';
import { UserType } from '../../../../types/userType';
import { useCollectDocs } from '../../../../hooks/useCollectDocs';
import { ProjectWithId } from '../../../../types/projectType';
import styles from './InviteUser.module.css';

type PropsType = {
  user: UserType;
};

const InviteUser = ({ user }: PropsType) => {
  const { document: currentUser } = useUserData();
  const { documents } = useCollectDocs<ProjectWithId>(
    currentUser?.managingProjects,
    'projects'
  );
  const [openProjectSelect, setOpenProjectSelect] = useState(false);

  if (user.upForWork === false) return <p>Not interested in collaboration!</p>;

  const handleInviteUser = () => {};
  const handleCancelInvite = () => {};

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
          {documents?.map((project) => (
            <Button
              className={styles.inviteBtn}
              key={project.id}
              handleClick={() => alert(project.id)}
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

// styles
import { useState } from 'react';
import styles from './TeamMembers.module.css';
import TeamMembersList from './TeamMembersList';
import { useProject } from '../../../../context/ProjectContext';
import Button from '../../../../components/Button/Button';

const TeamMembers = () => {
  const [showMembers, setShowMembers] = useState(false);
  const { team } = useProject();

  const allMembers = team?.length;
  const onlineMembers = team?.filter((m) => m.online);

  return (
    <div className={styles.teamMembers}>
      <Button handleClick={() => setShowMembers((oldValue) => !oldValue)}>
        TeamMembers {`${onlineMembers?.length}/${allMembers}`}
        {showMembers ? '-' : '+'}
      </Button>

      {showMembers && <TeamMembersList />}
    </div>
  );
};

export default TeamMembers;

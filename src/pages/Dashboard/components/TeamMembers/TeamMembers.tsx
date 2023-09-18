// styles
import { useState } from 'react';
import styles from './TeamMembers.module.css';
import TeamMembersList from './TeamMembersList';
import { useProject } from '../../../../context/ProjectContext';
import Button from '../../../../components/Button/Button';

const TeamMembers = () => {
  const [showMembers, setShowMembers] = useState(false);
  const { team } = useProject();

  const allMembers = team?.length || 0;
  const onlineMembers = team?.filter((m) => m.online).length || 0;

  return (
    <div className={styles.teamMembers}>
      <h3>
        Members{' '}
        <span
          className={styles.teamMembersCount}
        >{`${onlineMembers}/${allMembers}`}</span>
      </h3>
      <TeamMembersList />
    </div>
  );
};

export default TeamMembers;

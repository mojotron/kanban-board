import { useState } from 'react';
// styles
import styles from './TeamMembers.module.css';
import TeamMembersList from './TeamMembersList';
import { useTeam } from '../../../../context/TeamContext';
import Button from '../../../../components/Button/Button';

const TeamMembers = () => {
  const { team } = useTeam();
  const [showMembers, setShowMembers] = useState(false);

  const allMembers = team?.length || 0;
  const onlineMembers = team?.filter((m) => m.online).length || 0;

  return (
    <div className={styles.teamMembers}>
      <header className={styles.teamMembersHeader}>
        <h3>
          Members{' '}
          <span
            className={styles.teamMembersCount}
          >{`${onlineMembers}/${allMembers}`}</span>
        </h3>
        <Button
          handleClick={() => setShowMembers((oldValue) => !oldValue)}
          className="btn--icon"
        >
          {showMembers ? <span>&#9650;</span> : <span>&#9660;</span>}
        </Button>
      </header>
      {showMembers && <TeamMembersList />}
    </div>
  );
};

export default TeamMembers;

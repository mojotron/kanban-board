// styles
import styles from './TeamMembers.module.css';
import TeamMembersList from './TeamMembersList';
import { useTeam } from '../../../../context/TeamContext';

const TeamMembers = () => {
  const { team } = useTeam();

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

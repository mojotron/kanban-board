import { useTeam } from '../../../../context/TeamContext';
import styles from './TeamMembers.module.css';
import Member from './Member';

const TeamMembersList = () => {
  const { team } = useTeam();

  return (
    <ul className={styles.teamMembersList}>
      {team &&
        team.map((member) => {
          return <Member key={member.id} member={member} />;
        })}
    </ul>
  );
};

export default TeamMembersList;

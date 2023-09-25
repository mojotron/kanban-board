// hooks
import { useTeam } from '../../../../context/TeamContext';
import { Link } from 'react-router-dom';
// helpers
import { formatTime } from '../../../../utils/formatTime';
// components
import Avatar from '../../../../components/Avatar/Avatar';
// styles
import styles from './TeamMembersList.module.css';

const TeamMembersList = () => {
  const { team, currentUser } = useTeam();

  return (
    <ul className={styles.teamMembersList}>
      {team &&
        team.map((member) => {
          return (
            <li key={member.id}>
              <Link
                to={currentUser(member.id) ? '/' : `/${member.userName}`}
                state={{ targetId: member.uid }}
                className={styles.teamMembersListItem}
              >
                <Avatar
                  imageUrl={member.photoUrl}
                  size="35"
                  userName={member.userName}
                  active={member.online}
                />
                <p className={styles.teamMembersListItemUsername}>
                  {member.userName}
                </p>
                {!member.online && (
                  <p className={styles.lastTimeActive}>
                    active {formatTime(member.lastLoggedOut.seconds * 1000)}
                  </p>
                )}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default TeamMembersList;

import { useProject } from '../../../../context/ProjectContext';
import { useUserData } from '../../../../context/UserDataContext';
import { formatTime } from '../../../../utils/formatTime';
import { Link } from 'react-router-dom';
// components
import Avatar from '../../../../components/Avatar/Avatar';
// styles
import styles from './TeamMembersList.module.css';

const TeamMembersList = () => {
  const { team } = useProject();
  const { document: user } = useUserData();
  return (
    <ul className={styles.teamMembersList}>
      {team &&
        team.map((member) => {
          return (
            <li key={member.id}>
              <Link
                to={user?.uid === member.uid ? '/' : `/${member.userName}`}
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
                  <p>
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

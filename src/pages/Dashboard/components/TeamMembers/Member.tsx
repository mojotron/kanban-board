import { Link } from 'react-router-dom';
import Avatar from '../../../../components/Avatar/Avatar';
import { UserWithId } from '../../../../types/userType';
import styles from './TeamMembers.module.css';
import { formatTime } from '../../../../utils/formatTime';

type PropsType = {
  member: UserWithId;
};

const Member = ({ member }: PropsType) => {
  return (
    <li>
      <Link
        to={`/${member.uid}`}
        state={{ targetId: member.uid }}
        className={styles.teamMembersListItem}
      >
        <Avatar
          imageUrl={member.photoUrl}
          size="25"
          userName={member.userName}
          active={member.online}
        />
        <div>
          <p className={styles.teamMembersListItemUsername}>
            {member.userName || 'Anonymous'}
          </p>
          {!member.online && (
            <span className={styles.lastTimeActive}>
              active {formatTime(member.lastLoggedOut.seconds * 1000)}
            </span>
          )}
        </div>
      </Link>
    </li>
  );
};

export default Member;

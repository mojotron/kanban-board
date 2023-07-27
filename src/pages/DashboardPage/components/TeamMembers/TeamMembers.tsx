import Avatar from '../../../../components/Avatar/Avatar';
import { useProject } from '../../../../context/ProjectContext';
import { formatTime } from '../../../../utils/formatTime';
import './TeamMembers.css';
import { Link } from 'react-router-dom';

const TeamMembers = () => {
  const { team } = useProject();

  return (
    <div className="TeamMembers">
      <h3 className="heading--tertiary">TeamMembers</h3>
      <ul className="TeamMembers__list">
        {team &&
          team.map((member) => {
            return (
              <li key={member.id}>
                <Link to="" className="TeamMember__list__item">
                  <Avatar
                    imageUrl={member.photoUrl}
                    size="50"
                    userName={member.userName}
                    active={member.online}
                  />
                  <p className="TeamMember__list__item__username">
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
    </div>
  );
};

export default TeamMembers;

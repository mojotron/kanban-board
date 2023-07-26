import Avatar from '../../../../components/Avatar/Avatar';
import { useProject } from '../../../../context/ProjectContext';
import { formatTime } from '../../../../utils/formatTime';
import './TeamMembers.css';

const TeamMembers = () => {
  const { team } = useProject();

  return (
    <div className="TeamMembers">
      <h3>TeamMembers</h3>
      <ul className="TeamMembers__list">
        {team &&
          team.map((member) => {
            return (
              <li className="TeamMember__list__item" key={member.id}>
                <Avatar
                  imageUrl={member.photoUrl}
                  size="25"
                  userName={member.userName}
                />
                {member.online ? (
                  <div className="TeamMember__list__item__online"></div>
                ) : (
                  <p>{formatTime(member.lastLoggedOut.seconds * 1000)}</p>
                )}
                <h4>{member.userName}</h4>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default TeamMembers;

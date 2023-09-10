import Avatar from '../../../../components/Avatar/Avatar';
import { UserType } from '../../../../types/userType';
// utils
import { formatTime } from '../../../../utils/formatTime';

type PropsType = {
  user: UserType;
};

const ProfileHeader = ({ user }: PropsType) => {
  return (
    <header>
      <Avatar imageUrl={user.photoUrl} userName={user.userName} size="100" />
      <h2>{user.userName}</h2>
      <h3>
        {user.online ? 'online' : formatTime(user.lastLoggedOut.seconds / 1000)}
      </h3>
      <p>Finished projects: {user.projectsCompleted}</p>
      <p>Task Completed: {user.tasksCompleted}</p>
    </header>
  );
};

export default ProfileHeader;

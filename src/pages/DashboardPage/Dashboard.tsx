import { useLogout } from '../../hooks/useLogout';
import { useStore } from '../../store';
// components
import Avatar from '../../components/Avatar/Avatar';

const Dashboard = () => {
  const { logout } = useLogout();
  const authIsReady = useStore((state) => state.authIsReady);
  const user = useStore((state) => state.user);

  console.log(user);

  return (
    <div>
      <header>
        {user && (
          <Avatar
            imageUrl={user.photoUrl}
            userName={user.userName}
            size="100"
          />
        )}
      </header>
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

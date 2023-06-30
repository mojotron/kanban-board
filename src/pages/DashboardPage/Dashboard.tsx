import { useLogout } from '../../hooks/useLogout';
import { useStore } from '../../store';

const Dashboard = () => {
  const { logout } = useLogout();
  const authIsReady = useStore((state) => state.authIsReady);
  const userId = useStore((state) => state.userId);

  return (
    <div>
      Dashboard auh is ready {`${authIsReady} ${userId}`}
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

import { useLogout } from '../../hooks/useLogout';

const Dashboard = () => {
  const { logout } = useLogout();
  return (
    <div>
      Dashboard
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

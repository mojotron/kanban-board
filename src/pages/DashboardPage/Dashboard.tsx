import './Dashboard.css';
import { useLogout } from '../../hooks/useLogout';
// components
import Avatar from '../../components/Avatar/Avatar';
import { useUserData } from '../../context/UserDataContext';
import DashboardAside from './components/DashboardAside/DashboardAside';

const Dashboard = () => {
  const { logout } = useLogout();

  return (
    <div className="Dashboard">
      <DashboardAside />
      <header className="Dashboard__Header">
        <div>
          <button className="btn" onClick={logout}>
            Create Project
          </button>
          <button className="btn" onClick={logout}>
            Find Project
          </button>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>
    </div>
  );
};

export default Dashboard;

import './DashboardMenu.css';
import { useLogout } from '../../../../hooks/useLogout';

const DashboardMenu = () => {
  const { logout } = useLogout();
  return (
    <menu className="DashboardMenu">
      <button className="btn" onClick={() => {}}>
        Create Project
      </button>
      <button className="btn" onClick={() => {}}>
        Find Project
      </button>
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </menu>
  );
};

export default DashboardMenu;

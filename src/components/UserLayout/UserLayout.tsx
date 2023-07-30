import { Outlet } from 'react-router-dom';
import DashboardMenu from '../../pages/DashboardPage/components/DashboardMenu/DashboardMenu';
import DashboardAside from '../../pages/DashboardPage/components/DashboardAside/DashboardAside';
import { useUserData } from '../../context/UserDataContext';

const UserLayout = () => {
  return (
    <div>
      <DashboardMenu />
      <DashboardAside />

      <Outlet />
    </div>
  );
};

export default UserLayout;

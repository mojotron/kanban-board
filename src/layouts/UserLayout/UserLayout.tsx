import { Outlet } from 'react-router-dom';
import DashboardMenu from './components/UserMenu/UserMenu';
import DashboardAside from './components/UserAside/UserAside';
// styles
import './UserLayout.css';

const UserLayout = () => {
  return (
    <div className="UserLayout">
      <DashboardMenu />
      <DashboardAside />

      <section className="UserLayout__container">
        <Outlet />
      </section>
    </div>
  );
};

export default UserLayout;

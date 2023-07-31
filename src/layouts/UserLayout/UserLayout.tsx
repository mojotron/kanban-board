import { Outlet } from 'react-router-dom';
import DashboardMenu from './components/UserMenu/UserMenu';
import DashboardAside from './components/UserAside/UserAside';
// styles
import './UserLayout.css';
import { UserDataProvider } from '../../context/UserDataContext';
import { ProjectProvider } from '../../context/ProjectContext';

const UserLayout = () => {
  return (
    <div className="UserLayout">
      <UserDataProvider>
        <ProjectProvider>
          <DashboardMenu />
          <DashboardAside />

          <section className="UserLayout__container">
            <Outlet />
          </section>
        </ProjectProvider>
      </UserDataProvider>
    </div>
  );
};

export default UserLayout;

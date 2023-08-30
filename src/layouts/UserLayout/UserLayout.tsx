import { Outlet } from 'react-router-dom';
import DashboardMenu from './components/UserMenu/UserMenu';
import DashboardAside from './components/UserAside/UserAside';
// styles
import './UserLayout.css';
import NewProjectForm from '../../pages/Dashboard/components/NewProjectForm.tsx/NewProjectForm';
import { useKanbanStore } from '../../store';

const UserLayout = () => {
  const openModal = useKanbanStore((state) => state.openNewProjectModal);

  return (
    <div className="UserLayout">
      <DashboardMenu />
      <DashboardAside />

      {openModal && <NewProjectForm />}

      <section className="UserLayout__container">
        <Outlet />
      </section>
    </div>
  );
};

export default UserLayout;

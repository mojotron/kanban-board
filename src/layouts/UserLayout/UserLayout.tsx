import { Outlet } from 'react-router-dom';
// styles
import './UserLayout.css';
import NewProjectForm from '../../pages/Dashboard/components/NewProjectForm.tsx/NewProjectForm';
import { useKanbanStore } from '../../store';
import AsideMenu from '../../components/AsideMenu/AsideMenu';

const UserLayout = () => {
  const openModal = useKanbanStore((state) => state.openNewProjectModal);

  return (
    <div className="UserLayout">
      <AsideMenu />

      {openModal && <NewProjectForm />}

      <section className="UserLayout__container">
        <Outlet />
      </section>
    </div>
  );
};

export default UserLayout;

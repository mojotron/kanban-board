import './DashboardMenu.css';
import { useLogout } from '../../../../hooks/useLogout';
import { useKanbanStore } from '../../../../store';

const DashboardMenu = () => {
  const { logout } = useLogout();
  const openModal = useKanbanStore((state) => state.setOpenNewProjectModal);

  return (
    <menu className="DashboardMenu">
      <button className="btn" onClick={() => openModal(true)}>
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

import './UserMenu.css';
import { useLogout } from '../../../../hooks/useLogout';
import { useKanbanStore } from '../../../../store';

const UserMenu = () => {
  const { logout } = useLogout();
  const openModal = useKanbanStore((state) => state.setOpenNewProjectModal);

  return (
    <menu className="UserMenu">
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

export default UserMenu;

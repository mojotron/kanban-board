import './UserMenu.css';
import { useLogout } from '../../../../hooks/useLogout';
import { useKanbanStore } from '../../../../store';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const openModal = useKanbanStore((state) => state.setOpenNewProjectModal);

  return (
    <menu className="UserMenu">
      <button className="btn" onClick={() => openModal(true)}>
        Create Project
      </button>
      <button className="btn" onClick={() => navigate('find-project')}>
        Find Project
      </button>
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </menu>
  );
};

export default UserMenu;

// styles
import styles from './AsideMenu.module.css';
// icons
import {
  IoArrowBackCircleSharp as LeftIcon,
  IoArrowForwardCircle as RightIcon,
} from 'react-icons/io5';
import { IoIosCreate as IconCreateProject } from 'react-icons/io';
import { MdFindInPage as IconFindProject } from 'react-icons/md';
import { RiLogoutBoxRFill as IconLogOut } from 'react-icons/ri';
// components
import Logo from '../Logo/Logo';
import CopyRight from '../Copyright/CopyRight';
import MenuList from './MenuList';
import Button from '../Button/Button';
import NewProjectForm from '../NewProjectForm/NewProjectForm';
import Notifications from '../../features/Notifications/Notifications';
import Avatar from '../Avatar/Avatar';
// hooks
import { useState, useMemo } from 'react';
import { useKanbanStore } from '../../store';
// buttons config object
import type { MenuItemType } from './menuItemType';
import { useLogout } from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../context/UserDataContext';

const MENU_ITEM_TEXT = {
  createProject: 'New Project',
  findProject: 'Search',
  profile: 'Profile',
  logout: 'Logout',
};

const AsideMenu = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { document: user } = useUserData();
  const showAside = useKanbanStore((state) => state.showAside);
  const setShowAside = useKanbanStore((state) => state.setShowAside);
  const [openNewProject, setOpenNewProject] = useState(false);

  const menuItems: MenuItemType[] = useMemo(() => {
    if (!user) return [];
    return [
      {
        text: MENU_ITEM_TEXT.createProject,
        handleClick: () => setOpenNewProject(true),
        icon: (
          <IconCreateProject size={25} title={MENU_ITEM_TEXT.createProject} />
        ),
      },
      {
        text: MENU_ITEM_TEXT.findProject,
        handleClick: () => navigate('/search'),
        icon: <IconFindProject size={25} title={MENU_ITEM_TEXT.findProject} />,
      },
      {
        text: MENU_ITEM_TEXT.profile,
        handleClick: () => navigate(`/${user.uid}`),
        icon: (
          <Avatar
            imageUrl={user.photoUrl}
            userName={user.userName}
            size="25"
            hover={true}
            title={MENU_ITEM_TEXT.profile}
          />
        ),
      },
      {
        text: MENU_ITEM_TEXT.logout,
        handleClick: () => logout(),
        icon: <IconLogOut size={25} title={MENU_ITEM_TEXT.logout} />,
      },
    ];
  }, [user]);

  if (!user) return null;

  return (
    <aside
      className={styles.asideMenu}
      style={{ width: showAside ? '35rem' : '2rem' }}
    >
      {openNewProject && (
        <NewProjectForm onClose={() => setOpenNewProject(false)} />
      )}

      <Button
        handleClick={() => setShowAside(showAside ? false : true)}
        className={styles.btnDisplay}
      >
        {showAside ? (
          <LeftIcon className="btn--icon" />
        ) : (
          <RightIcon className="btn--icon" />
        )}
      </Button>

      <menu className={styles.menu}>
        {showAside && <Logo />}
        <Notifications
          notificationList={user.notifications}
          asideOpen={showAside}
        />
        <MenuList items={menuItems} />
        {showAside && <CopyRight />}
      </menu>
    </aside>
  );
};

export default AsideMenu;

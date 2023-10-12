// styles
import styles from './AsideMenu.module.css';
// icons
import {
  AiOutlineArrowLeft as LeftIcon,
  AiOutlineArrowRight as RightIcon,
} from 'react-icons/ai';
// components
import Logo from '../Logo/Logo';
import CopyRight from './CopyRight';
import MenuList from './MenuList';
import Button from '../Button/Button';
import NewProjectForm from '../NewProjectForm/NewProjectForm';
// hooks
import { useState, useMemo } from 'react';
import { useKanbanStore } from '../../store';
// buttons config object
import type { MenuItemType } from './MenuList';

const AsideMenu = () => {
  const showAside = useKanbanStore((state) => state.showAside);
  const setShowAside = useKanbanStore((state) => state.setShowAside);
  const [openNewProject, setOpenNewProject] = useState(false);

  const buttons: MenuItemType[] = useMemo(() => {
    return [
      {
        text: 'create project',
        onClick: () => {
          console.log('hello');

          setOpenNewProject(true);
        },
      },
      { text: 'find project', onClick: () => {} },
      { text: 'find developer', onClick: () => {} },
      { text: 'profile', onClick: () => {} },
      { text: 'logout', onClick: () => {} },
    ];
  }, []);

  return (
    <aside
      className={styles.asideMenu}
      style={{ width: showAside ? '20rem' : '2rem' }}
    >
      {openNewProject && (
        <NewProjectForm onClose={() => setOpenNewProject(false)} />
      )}

      <Button
        handleClick={() => setShowAside(showAside ? false : true)}
        className={styles.btnDisplay}
      >
        {showAside ? <LeftIcon /> : <RightIcon />}
      </Button>

      {showAside && (
        <menu>
          <Logo />
          <MenuList buttons={buttons} />
          <CopyRight />
        </menu>
      )}
    </aside>
  );
};

export default AsideMenu;

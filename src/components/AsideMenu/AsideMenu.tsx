import Logo from '../Logo/Logo';
import CopyRight from './CopyRight';
import MenuList from './MenuList';
import styles from './AsideMenu.module.css';
import { useKanbanStore } from '../../store';

const buttons = [
  { text: 'create project' },
  { text: 'find project' },
  { text: 'find developer' },
  { text: 'profile' },
  { text: 'logout' },
];

const AsideMenu = () => {
  const showAside = useKanbanStore((state) => state.showAside);
  const setShowAside = useKanbanStore((state) => state.setShowAside);

  return (
    <aside className={styles.asideMenu}>
      <button onClick={() => setShowAside(showAside ? false : true)}>
        {showAside ? 'hide' : 'show'}
      </button>
      <Logo />
      <MenuList buttons={buttons} />
      <CopyRight />
    </aside>
  );
};

export default AsideMenu;

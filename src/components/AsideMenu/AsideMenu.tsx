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
// hooks
import { useKanbanStore } from '../../store';
// buttons config object
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
    <aside
      className={styles.asideMenu}
      style={{ width: showAside ? '20rem' : '2rem' }}
    >
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

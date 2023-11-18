// hooks
import { useKanbanStore } from '../../store';
// components
import MenuItem from './MenuItem';
// styles
import styles from './AsideMenu.module.css';
// types
import type { MenuItemType } from './menuItemType';

type PropsType = {
  items: MenuItemType[];
};

const MenuList = ({ items }: PropsType) => {
  const showAside = useKanbanStore((state) => state.showAside);

  return (
    <menu className={styles.list} style={{ gap: showAside ? '1px' : '1.5rem' }}>
      {items.map((ele) => (
        <MenuItem item={ele} key={ele.text} />
      ))}
    </menu>
  );
};

export default MenuList;

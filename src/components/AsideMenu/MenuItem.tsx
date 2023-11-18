import { useKanbanStore } from '../../store';
import Button from '../Button/Button';
import { MenuItemType } from './menuItemType';
import styles from './AsideMenu.module.css';

type PropsType = {
  item: MenuItemType;
};

const MenuItem = ({ item }: PropsType) => {
  const showAside = useKanbanStore((state) => state.showAside);

  return (
    <Button
      handleClick={() => item.handleClick()}
      className={showAside ? styles.item : 'btn--icon'}
    >
      {showAside ? item.text : item.icon}
    </Button>
  );
};

export default MenuItem;

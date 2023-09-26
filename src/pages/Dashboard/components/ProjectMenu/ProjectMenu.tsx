import Button from '../../../../components/Button/Button';
import { MenuOptionType } from '../../../../types/menuOption';
import styles from './ProjectMenu.module.css';

type PropsType = {
  menuOptions: MenuOptionType[];
};

const ProjectMenu = ({ menuOptions }: PropsType) => {
  return (
    <menu className={styles.menuList}>
      {menuOptions.map((ele) => (
        <Button
          key={ele.text}
          handleClick={ele.handleClick}
          className={
            ele.text === 'Kanban Board'
              ? `${styles.menuBtn} ${styles.kanbanBtn}`
              : `${styles.menuBtn}`
          }
        >
          {ele.text}
        </Button>
      ))}
    </menu>
  );
};

export default ProjectMenu;

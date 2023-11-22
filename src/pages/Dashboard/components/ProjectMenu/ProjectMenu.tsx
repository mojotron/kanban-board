import Button from '../../../../components/Button/Button';
import type { MenuOptionType } from '../../menuOptionType';
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
          disabled={ele.disabled}
        >
          {ele.text}
        </Button>
      ))}
    </menu>
  );
};

export default ProjectMenu;

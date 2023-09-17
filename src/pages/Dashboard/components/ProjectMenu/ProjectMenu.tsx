import { useState } from 'react';
import Button from '../../../../components/Button/Button';
import styles from './ProjectMenu.module.css';

const menuConfig = [];

const ProjectMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={styles.menu}>
      {!showMenu && (
        <Button
          handleClick={() => setShowMenu(true)}
          className={styles.menuBtn}
        >
          Menu &#9662;
        </Button>
      )}
      {showMenu && (
        <menu className={styles.menuList}>
          <Button
            handleClick={() => setShowMenu(false)}
            className={styles.menuBtn}
          >
            &#9652;
          </Button>
          <Button
            text="Kanban board"
            handleClick={() => {}}
            className={`${styles.menuBtn} ${styles.kanbanBtn}`}
          />
          <Button
            text="Project repository"
            handleClick={() => {}}
            className={styles.menuBtn}
          />
          {/* buttons */}
          <Button
            text="Go public"
            handleClick={() => {}}
            className={styles.menuBtn}
          />
          <Button
            text="Crete New Task"
            handleClick={() => {}}
            className={styles.menuBtn}
          />
          <Button
            text="Delete Project"
            handleClick={() => {}}
            className={styles.menuBtn}
          />
        </menu>
      )}
    </div>
  );
};

export default ProjectMenu;

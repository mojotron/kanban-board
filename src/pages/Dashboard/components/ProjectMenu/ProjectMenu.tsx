import Button from '../../../../components/Button/Button';
import styles from './ProjectMenu.module.css';

const menuConfig = [];

const ProjectMenu = () => {
  return (
    <menu className={styles.menuList}>
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
        text="Create New Task"
        handleClick={() => {}}
        className={styles.menuBtn}
      />
      <Button
        text="Delete Project"
        handleClick={() => {}}
        className={styles.menuBtn}
      />
      <Button
        text="Find Member"
        handleClick={() => {}}
        className={styles.menuBtn}
      />
    </menu>
  );
};

export default ProjectMenu;

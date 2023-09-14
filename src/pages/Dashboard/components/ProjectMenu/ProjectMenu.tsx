import Button from '../../../../components/Button/Button';
import styles from './ProjectMenu.module.css';

const menuConfig = [];

const ProjectMenu = () => {
  return (
    <menu className={styles.menu}>
      {/* links */}
      <Button text="Project repository" handleClick={() => {}} />
      <Button text="Kanban board" handleClick={() => {}} />
      {/* buttons */}
      <Button text="Go public" handleClick={() => {}} />
      <Button text="Crete New Task" handleClick={() => {}} />
      <Button text="Delete Project" handleClick={() => {}} />
    </menu>
  );
};

export default ProjectMenu;

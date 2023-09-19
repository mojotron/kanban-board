import Button from '../../../../components/Button/Button';
import styles from './ProjectMenu.module.css';

const ProjectMenu = () => {
  const menuConfig = [
    {
      text: 'Kanban Board',
      className: `${styles.menuBtn} ${styles.kanbanBtn}`,
      onClick: () => {},
    },
    {
      text: 'Project repository',
      className: `${styles.menuBtn}`,
      onClick: () => {},
    },
    { text: 'Go public', className: `${styles.menuBtn}`, onClick: () => {} },
    {
      text: 'Create New Task',
      className: `${styles.menuBtn}`,
      onClick: () => {},
    },
    {
      text: 'Delete Project',
      className: `${styles.menuBtn}`,
      onClick: () => {},
    },
    { text: 'Find Member', className: `${styles.menuBtn}`, onClick: () => {} },
    { text: 'Edit Project', className: `${styles.menuBtn}`, onClick: () => {} },
  ];

  return (
    <menu className={styles.menuList}>
      {menuConfig.map((ele) => (
        <Button
          key={ele.text}
          handleClick={ele.onClick}
          className={ele.className}
        >
          {ele.text}
        </Button>
      ))}
    </menu>
  );
};

export default ProjectMenu;

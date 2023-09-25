import Button from '../../../../components/Button/Button';
import styles from './ProjectMenu.module.css';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectMenu = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const menuConfig = useMemo(() => {
    return [
      {
        text: 'Kanban Board',
        className: `${styles.menuBtn} ${styles.kanbanBtn}`,
        onClick: () => navigate(`/kanban/${projectId}`),
      },
      {
        text: 'Edit Project',
        className: `${styles.menuBtn}`,
        onClick: () => {},
      },
      {
        text: 'Create New Task',
        className: `${styles.menuBtn}`,
        onClick: () => {},
      },

      {
        text: 'Find Collaborator',
        className: `${styles.menuBtn}`,
        onClick: () => {},
      },
    ];
  }, []);

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

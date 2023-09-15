// hooks
import { useProject } from '../../../../context/ProjectContext';
// styles
import styles from './Tasks.module.css';
// components
import TasksHeader from './TasksHeader';
import TabsMenu from './TabsMenu';
import TasksList from './TasksList';

const Tasks = () => {
  const { project } = useProject();

  if (!project) return null;

  return (
    <div className={styles.tasks}>
      <TasksHeader />
      <TabsMenu />
      <TasksList />
    </div>
  );
};

export default Tasks;

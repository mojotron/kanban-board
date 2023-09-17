// styles
import styles from './Tasks.module.css';
// components
import TasksHeader from './TasksHeader';
import TabsMenu from './TabsMenu';
import TasksList from './TasksList';

const Tasks = () => {
  return (
    <div className={styles.tasks}>
      <TasksHeader />
      <TabsMenu />
      <TasksList />
    </div>
  );
};

export default Tasks;

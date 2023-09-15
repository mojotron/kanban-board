import PriorityLegend from '../../../../components/PriorityLegend/PriorityLegend';
import styles from './TasksHeader.module.css';

const TasksHeader = () => {
  return (
    <header className={styles.tasksHeader}>
      <h2>Tasks</h2>
      <PriorityLegend />
    </header>
  );
};

export default TasksHeader;

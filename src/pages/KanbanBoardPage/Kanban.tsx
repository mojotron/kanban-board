import styles from './Kanban.module.css';
import { TASK_STAGES_KANBAN } from '../../constants/taskStages';
import Column from './components/Column/Column';
import { Link, useParams } from 'react-router-dom';
import PriorityLegend from '../../components/PriorityLegend/PriorityLegend';

const KanbanBoard = () => {
  const { projectId } = useParams();

  return (
    <div className={styles.kanban}>
      <header className={styles.header}>
        <PriorityLegend />
        <Link to={`/project/${projectId}`} className={styles.dashboardLink}>
          Project Dashboard
        </Link>
      </header>
      <main
        className={styles.columns}
        style={{
          gridTemplateColumns: `repeat(${TASK_STAGES_KANBAN.length} ,1fr)`,
        }}
      >
        {TASK_STAGES_KANBAN.map((stage) => (
          <Column key={stage} title={stage} />
        ))}
      </main>
    </div>
  );
};

export default KanbanBoard;

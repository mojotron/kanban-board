// hooks
import { Link, useParams } from 'react-router-dom';
import { TeamProvider } from '../../context/TeamContext';
// components
import PriorityLegend from '../../components/PriorityLegend/PriorityLegend';
import Column from './components/Column/Column';
// styles
import styles from './Kanban.module.css';
// constants
import { TASK_STAGES_KANBAN } from '../../constants/taskStages';

const KanbanBoard = () => {
  const { projectId } = useParams();

  return (
    <TeamProvider>
      <div className={styles.kanban}>
        <header className={styles.header}>
          <PriorityLegend />
          <Link to={`/dashboard/${projectId}`} className={styles.dashboardLink}>
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
            <Column key={stage} columnName={stage} />
          ))}
        </main>
      </div>
    </TeamProvider>
  );
};

export default KanbanBoard;

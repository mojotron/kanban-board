import styles from './Kanban.module.css';
import { TASK_STAGES_KANBAN } from '../../constants/taskStages';
import { useKanbanStore } from '../../store';
import Column from './components/Column/Column';
import { Link } from 'react-router-dom';
import PriorityLegend from '../../components/PriorityLegend/PriorityLegend';
// components
import ConfirmPopup from '../../components/ConfirmPopup/ConfirmPopup';
import Task from '../../components/Task/Task';

const KanbanBoard = () => {
  const openViewTaskModal = useKanbanStore((state) => state.openViewTaskModal);
  const openConfirmModal = useKanbanStore((state) => state.openConfirmModal);

  return (
    <div className={styles.kanban}>
      {openConfirmModal && <ConfirmPopup />}
      {openViewTaskModal && <Task />}

      <header className="KanbanBoard__header">
        <PriorityLegend />
        <Link to="/" className="btn DashboardProject__btn-kanban">
          Project Dashboard
        </Link>
      </header>
      <main
        className="KanbanBoard__columns"
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

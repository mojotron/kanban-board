import './KanbanBoard.css';
import { TASK_STAGES_KANBAN } from '../../constants/taskStages';

import Column from './components/Column/Column';
import { Link } from 'react-router-dom';
import PriorityLegend from '../../components/PriorityLegend/PriorityLegend';

const KanbanBoard = () => {
  return (
    <div className="KanbanBoard">
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

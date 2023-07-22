import './KanbanBoard.css';
import { TASK_STAGES } from '../../constants/taskStages';

import Column from './components/Column/Column';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PriorityLegend from '../../components/PriorityLegend/PriorityLegend';

const KanbanBoard = () => {
  const columns = useMemo(
    () => TASK_STAGES.filter((stage) => stage !== 'finished'),
    [TASK_STAGES]
  );

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
        style={{ gridTemplateColumns: `repeat(${columns.length} ,1fr)` }}
      >
        {columns.map((stage) => (
          <Column key={stage} title={stage} />
        ))}
      </main>
      {/* go back to project, store current project is unchanged and displays dashboard with that project */}
    </div>
  );
};

export default KanbanBoard;

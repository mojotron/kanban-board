import './KanbanBoard.css';
import { TASK_STAGES } from '../../constants/taskStages';

import Column from './components/Column/Column';
import { useMemo } from 'react';

const KanbanBoard = () => {
  const columns = useMemo(
    () => TASK_STAGES.filter((stage) => stage !== 'finished'),
    [TASK_STAGES]
  );

  return (
    <div
      className="KanbanBoard"
      style={{ gridTemplateColumns: `repeat(${columns.length} ,1fr)` }}
    >
      {columns.map((stage) => (
        <Column key={stage} title={stage} />
      ))}
    </div>
  );
};

export default KanbanBoard;

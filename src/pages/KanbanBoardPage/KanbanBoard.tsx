import './KanbanBoard.css';
import { TASK_STAGES } from '../../constants/taskStages';

import Column from './components/Column/Column';

const KanbanBoard = () => {
  return (
    <div className="KanbanBoard">
      {TASK_STAGES.map((stage) => (
        <Column title={stage} />
      ))}
    </div>
  );
};

export default KanbanBoard;

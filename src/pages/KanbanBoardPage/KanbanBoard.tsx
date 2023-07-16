import './KanbanBoard.css';
import { COLUMNS } from '../../constants/taskStages';

import Column from './components/Column/Column';

const KanbanBoard = () => {
  return (
    <div className="KanbanBoard">
      <Column title={COLUMNS.BACKLOG} />
      <Column title={COLUMNS.ASSIGNMENT} />
      <Column title={COLUMNS.DEVELOPMENT} />
      <Column title={COLUMNS.TEST} />
      <Column title={COLUMNS.COMPLETE} />
    </div>
  );
};

export default KanbanBoard;

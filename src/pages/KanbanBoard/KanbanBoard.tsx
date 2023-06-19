import './KanbanBoard.css';
import { COLUMNS } from '../../constants/columns';

import Column from './components/Column/Column';

const KanbanBoard = () => {
  return (
    <div className="KanbanBoard">
      <Column title={COLUMNS.PLANNING} />
      <Column title={COLUMNS.INPROGRESS} />
      <Column title={COLUMNS.DONE} />
    </div>
  );
};

export default KanbanBoard;

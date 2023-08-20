// hooks
import { useMemo, useState } from 'react';
import { useProject } from '../../../../context/ProjectContext';
import { useTaskMove } from '../../../../hooks/useTaskMove';
import { useKanbanStore } from '../../../../store';
// components
import TaskCard from '../../../../components/TaskCard/TaskCard';
// types
import { Stage } from '../../../../types/taskType';
// style
import './Column.css';

type PropsType = {
  title: Stage;
};

const Column = ({ title }: PropsType) => {
  const { tasks } = useProject();
  const draggedTask = useKanbanStore((state) => state.draggedTask);
  const setDraggedTask = useKanbanStore((state) => state.setDraggedTask);
  const [drop, setDrop] = useState(false);

  const { isMovable, moveTask } = useTaskMove();

  const columnTasks = useMemo(
    () =>
      tasks
        ?.filter((task) => task.stage === title)
        .sort((a, b) => {
          if (a.priority === 'high' && b.priority === 'low') return -1;
          if (a.priority === 'very-high' && b.priority === 'low') return -1;
          if (a.priority === 'very-high' && b.priority === 'high') return -1;
          return 1;
        }),
    [tasks]
  );

  return (
    <div
      className={`Column ${drop ? 'drop-possible' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        if (draggedTask && isMovable(draggedTask?.stage, title)) {
          setDrop(true);
        }
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDrop(false);
      }}
      onDrop={async () => {
        if (!draggedTask) return;
        if (isMovable(draggedTask.stage, title) && drop) {
          // logic to make a drop
          await moveTask(draggedTask, title);
          //
          console.log('drop ok');
          setDraggedTask(null);
          setDrop(false);
        }
      }}
    >
      <header className="Column__Header">
        <h2>{title}</h2>
      </header>

      <main className="Column__Tasks">
        {columnTasks?.map((task) => (
          <div
            key={task.id}
            className="Column__Tasks__Task-wrapper mb--sm"
            draggable
            onDragStart={() => setDraggedTask(task)}
          >
            <TaskCard taskData={task} />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Column;

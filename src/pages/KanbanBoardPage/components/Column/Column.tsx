import './Column.css';
import { useMemo, useState } from 'react';
import { useProject } from '../../../../context/ProjectContext';
import Task from '../../../../components/TaskCard/TaskCard';
import { useKanbanStore } from '../../../../store';
import { useFirestore } from '../../../../hooks/useFirestore';

type PropsType = {
  title: string;
};

const Column = ({ title }: PropsType) => {
  const { tasks } = useProject();
  const draggedTask = useKanbanStore((state) => state.draggedTask);
  const setDraggedTask = useKanbanStore((state) => state.setDraggedTask);
  const { updateDocument } = useFirestore();
  const [drop, setDrop] = useState(false);

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
        setDrop(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDrop(false);
      }}
      onDrop={async () => {
        if (!draggedTask) return;
        console.log(draggedTask);
        await updateDocument('tasks', draggedTask, { stage: title });
        setDraggedTask(null);
        setDrop(false);
      }}
    >
      <header className="Column__Header">
        <h2>{title}</h2>
      </header>
      <main className="Column__Tasks">
        {columnTasks?.map((task) => (
          <div
            className="Column__Tasks__Task-wrapper mb--sm"
            draggable
            onDragStart={() => setDraggedTask(task.id)}
          >
            <Task key={task.id} taskData={task} />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Column;

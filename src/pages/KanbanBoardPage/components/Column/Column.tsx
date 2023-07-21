import './Column.css';
import { useMemo } from 'react';
import { useProject } from '../../../../context/ProjectContext';
import Task from '../../../../components/Task/Task';
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
      className="Column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={async () => {
        if (!draggedTask) return;
        console.log(draggedTask);
        await updateDocument('tasks', draggedTask, { stage: title });
        setDraggedTask(null);
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

import { useEffect } from 'react';
import { useKanbanStore } from '../../store';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const TaskView = () => {
  const currentTask = useKanbanStore((state) => state.currentTask);
  const closeModal = useKanbanStore((state) => state.setOpenViewTaskModal);

  useEffect(() => {}, []);
  if (currentTask === null) return;

  return (
    <div className="overlay">
      <div className="TaskView">
        <button
          className="btn--icon"
          type="button"
          onClick={() => closeModal(false)}
        >
          <AiOutlineCloseCircle size={30} color="var(--COLOR-ACCENT-500)" />
        </button>

        <header>
          <h2>{currentTask.title}</h2>
        </header>
        <div></div>
      </div>
    </div>
  );
};

export default TaskView;

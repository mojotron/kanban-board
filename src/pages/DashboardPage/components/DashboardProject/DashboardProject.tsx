import './DashboardProject.css';
import { useMemo } from 'react';
// firebase hooks
import { useOnSnapshotDocument } from '../../../../hooks/useOnSnapshotDocument';
import { useCollectDocs } from '../../../../hooks/useCollectDocs';
// global store
import { useKanbanStore } from '../../../../store';
// components
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import Task from '../../../../components/Task/Task';
import PriorityLegend from '../../../../components/PriorityLegend/PriorityLegend';
// types and constants
import { ProjectType } from '../../../../types/projectType';
import { TaskType } from '../../../../types/taskType';
import { TASK_STAGES } from '../../../../constants/taskStages';

type Task = TaskType & { id: string };

const DashboardProject = () => {
  const currentProject = useKanbanStore((state) => state.currentProject);
  const currentTaskColumn = useKanbanStore((state) => state.currentTaskColumn);
  const openNewTaskModal = useKanbanStore((state) => state.openNewTaskModal);
  const setOpenNewTaskModal = useKanbanStore(
    (state) => state.setOpenNewTaskModal
  );
  const setCurrentTaskColumn = useKanbanStore(
    (state) => state.setCurrentTaskColumn
  );

  const { document, isPending, error } = useOnSnapshotDocument<
    ProjectType & { id: string }
  >('projects', currentProject);
  const {
    documents: tasks,
    isPending: pendingTasks,
    error: errorTasks,
  } = useCollectDocs<Task>(document?.tasks, 'tasks');

  console.log(tasks, pendingTasks, errorTasks);

  // const getColumnTasks = useMemo(() => {}, [document, currentTaskColumn]);

  return (
    <main className="DashboardProject">
      {isPending && <h2>Loading...</h2>}
      {error && <h2 className="error">{error}</h2>}

      {document && openNewTaskModal && <NewTaskForm tasks={document.tasks} />}
      {document && (
        <>
          <header className="DashboardProject__header">
            <div className="DashboardProject__header__title">
              <h1>{document.name}</h1>
              <a
                className="link"
                href={document.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                project repository
              </a>
            </div>
            <div className="DashboardProject__header__tags">
              {document.tags.map((tag) => (
                <div key={tag} className="tag">
                  {tag}
                </div>
              ))}
            </div>
            <p className="DashboardProject__header__description">
              {document.description}
            </p>
          </header>

          <div className="DashboardProject__tasks">
            <div className="DashboardProject__tasks__header">
              <h2 className="heading--secondary">Tasks</h2>
              <PriorityLegend />
              <button
                className="btn"
                onClick={() => {
                  setOpenNewTaskModal(true);
                }}
              >
                Create task
              </button>
            </div>

            <div className="DashboardProject__tasks__display">
              <div className="DashboardProject__tasks__display__tabs">
                {TASK_STAGES.map((stage) => (
                  <button
                    onClick={() => setCurrentTaskColumn(stage)}
                    className={`${stage === currentTaskColumn ? 'active' : ''}`}
                    key={stage}
                  >
                    {stage}
                  </button>
                ))}
              </div>

              <div className="DashboardProject__tasks__display__tasks">
                {tasks &&
                  tasks.map((task) => <Task key={task.id} taskData={task} />)}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default DashboardProject;

import './DashboardProject.css';
import { useMemo } from 'react';
// firebase hooks
import { useOnSnapshotDocument } from '../../../../hooks/useOnSnapshotDocument';
import { useCollectDocs } from '../../../../hooks/useCollectDocs';
import { useCollectProjectTasks } from '../../../../hooks/useCollectProjectTasks';
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

const count = <T,>(array: T[] | undefined, fn: (ele: T) => void) => {
  if (!array) return 0;
  return array.filter(fn).length;
};

const DashboardProject = () => {
  const currentProject = useKanbanStore((state) => state.currentProject);
  const currentTaskStage = useKanbanStore((state) => state.currentTaskStage);
  const openNewTaskModal = useKanbanStore((state) => state.openNewTaskModal);
  const setOpenNewTaskModal = useKanbanStore(
    (state) => state.setOpenNewTaskModal
  );
  const setCurrentTaskStage = useKanbanStore(
    (state) => state.setCurrentTaskStage
  );

  const { document, isPending, error } = useOnSnapshotDocument<
    ProjectType & { id: string }
  >('projects', currentProject);
  const {
    documents: tasks,
    pending: pendingTasks,
    error: errorTasks,
  } = useCollectProjectTasks(document?.tasks);

  const filteredStageTasks = useMemo((): Task[] | undefined => {
    if (!tasks) return undefined;
    return tasks.filter((task) => task.stage === currentTaskStage);
  }, [tasks, currentTaskStage]);

  console.log(filteredStageTasks, currentTaskStage);

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

            <div className="DashboardProject__tasks__tabs">
              {TASK_STAGES.map((stage) => {
                const countTasks = count(
                  tasks as Task[],
                  (ele) => ele.stage === stage
                );

                return (
                  <button
                    onClick={() => setCurrentTaskStage(stage)}
                    className={`${stage === currentTaskStage ? 'active' : ''}`}
                    key={stage}
                  >
                    {stage}
                    {countTasks > 0 && `(${countTasks})`}
                  </button>
                );
              })}
            </div>

            <div className="DashboardProject__tasks__display">
              {filteredStageTasks &&
                filteredStageTasks.map((task) => (
                  <Task key={task.id} taskData={task} />
                ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default DashboardProject;

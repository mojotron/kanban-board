import './DashboardProject.css';
import { useMemo } from 'react';
// global store
import { useKanbanStore } from '../../../../store';
// components
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import Task from '../../../../components/Task/Task';
import TaskView from '../../../../components/TaskView/TaskView';
import PriorityLegend from '../../../../components/PriorityLegend/PriorityLegend';
// constants and types
import { TaskType } from '../../../../types/taskType';
import { TASK_STAGES } from '../../../../constants/taskStages';
// use context hooks
import { Link } from 'react-router-dom';
import { useUserData } from '../../../../context/UserDataContext';
import { useProject } from '../../../../context/ProjectContext';
import TeamMembers from '../TeamMembers/TeamMembers';

type Task = TaskType & { id: string };

const count = <T,>(array: T[] | undefined, fn: (ele: T) => void) => {
  if (!array) return 0;
  return array.filter(fn).length;
};

const DashboardProject = () => {
  const currentTaskStage = useKanbanStore((state) => state.currentTaskStage);
  const openNewTaskModal = useKanbanStore((state) => state.openNewTaskModal);
  const setOpenNewTaskModal = useKanbanStore(
    (state) => state.setOpenNewTaskModal
  );
  const setCurrentTaskStage = useKanbanStore(
    (state) => state.setCurrentTaskStage
  );
  const openViewTaskModal = useKanbanStore((state) => state.openViewTaskModal);

  const { document: user } = useUserData();
  const { project, projectErr, projectPending, tasks, tasksPending, tasksErr } =
    useProject();

  const filteredStageTasks = useMemo((): Task[] | undefined => {
    if (!tasks) return undefined;
    return tasks.filter((task) => task.stage === currentTaskStage);
  }, [tasks, currentTaskStage]);

  return (
    <main className="DashboardProject">
      {projectPending && <h2>Loading...</h2>}
      {projectErr && <h2 className="error">{projectErr}</h2>}

      {project && openNewTaskModal && <NewTaskForm tasks={project.tasks} />}
      {openViewTaskModal && <TaskView />}

      {project && (
        <>
          <header className="DashboardProject__header">
            <div className="DashboardProject__header__title">
              <h1>{project.name}</h1>
              <a
                className="link"
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                project repository
              </a>
            </div>
            <div className="DashboardProject__header__tags">
              {project.tags.map((tag) => (
                <div key={tag} className="tag">
                  {tag}
                </div>
              ))}
            </div>
            <p className="DashboardProject__header__description">
              {project.description}
            </p>
          </header>

          <div className="DashboardProject__tasks">
            <div className="DashboardProject__tasks__header">
              <h2 className="heading--secondary">Tasks</h2>
              <PriorityLegend />
              {project.adminUid === user?.uid && (
                <button
                  className="btn"
                  onClick={() => {
                    setOpenNewTaskModal(true);
                  }}
                >
                  Create task
                </button>
              )}
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
              {tasksPending && <p>Loading...</p>}
              {tasksErr && <p className="error">{tasksErr}</p>}
              {filteredStageTasks &&
                filteredStageTasks.map((task) => (
                  <Task key={task.id} taskData={task} />
                ))}
            </div>
          </div>

          <div className="DashboardProject__messages">
            <h3 className="heading--tertiary">Messages</h3>
            <div className="DashboardProject__messages__body"></div>
            <div className="DashboardProject__messages__controls"></div>
          </div>

          <TeamMembers />

          <Link
            to={`/kanban/${project.id}`}
            className="btn DashboardProject__btn-kanban"
          >
            View Kanban Board
          </Link>
        </>
      )}
    </main>
  );
};

export default DashboardProject;

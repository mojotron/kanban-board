import './DashboardProject.css';
import { useKanbanStore } from '../../../../store';
import { useOnSnapshotDocument } from '../../../../hooks/useOnSnapshotDocument';
import { ProjectType } from '../../../../types/projectType';
import { COLUMNS } from '../../../../constants/columns';
import { useMemo } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

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

  // const getColumnTasks = useMemo(() => {}, [document, currentTaskColumn]);

  return (
    <main className="DashboardProject">
      {openNewTaskModal && <NewTaskForm />}
      {isPending && <h2>Loading...</h2>}
      {error && <h2 className="error">{error}</h2>}

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
              <button
                className="btn"
                onClick={(e) => {
                  setOpenNewTaskModal(true);
                }}
              >
                Create task
              </button>
            </div>

            <div className="DashboardProject__tasks__display">
              <div className="DashboardProject__tasks__display__tabs">
                {Object.keys(COLUMNS).map((col) => (
                  <button
                    onClick={() => setCurrentTaskColumn(COLUMNS[col])}
                    className={`${
                      COLUMNS[col] === currentTaskColumn ? 'active' : ''
                    }`}
                    key={col}
                  >
                    {col.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default DashboardProject;

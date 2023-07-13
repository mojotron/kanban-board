import './DashboardProject.css';
import { useKanbanStore } from '../../../../store';
import { useOnSnapshotDocument } from '../../../../hooks/useOnSnapshotDocument';
import { ProjectType } from '../../../../types/projectType';
import { COLUMNS } from '../../../../constants/columns';

const DashboardProject = () => {
  const currentProject = useKanbanStore((state) => state.currentProject);
  const { document, isPending, error } = useOnSnapshotDocument<
    ProjectType & { id: string }
  >('projects', currentProject);

  return (
    <main className="DashboardProject">
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
            <h2 className="heading--tertiary">Current Tasks</h2>

            <div className="DashboardProject__tasks__display">
              <div className="DashboardProject__tasks__display__tabs">
                {Object.keys(COLUMNS).map((col) => (
                  <button key={col}>{col.toLowerCase()}</button>
                ))}
                <button className="active">finished</button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default DashboardProject;

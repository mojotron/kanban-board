import './DashboardProject.css';
import { useKanbanStore } from '../../../../store';
import { useOnSnapshotDocument } from '../../../../hooks/useOnSnapshotDocument';
import { ProjectType } from '../../../../types/projectType';

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
          <header>
            <h1 className="heading--primary">{document.name}</h1>
            <div>
              {document.tags.map((tag) => (
                <div key={tag} className="tag">
                  {tag}
                </div>
              ))}
            </div>
            <p>{document.description}</p>
            <a
              className="link"
              href={document.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              project repository
            </a>
          </header>
        </>
      )}
    </main>
  );
};

export default DashboardProject;

import Avatar from '../../../../components/Avatar/Avatar';
import { useUserData } from '../../../../context/UserDataContext';
import './DashboardAside.css';
import { useCollectDocs } from '../../../../hooks/useCollectDocs';
import { ProjectType } from '../../../../types/projectType';
import { useKanbanStore } from '../../../../store';

type Project = ProjectType & { id: string };

const DashboardAsideList = ({
  projectList,
}: {
  projectList: Project[] | null;
}) => {
  const setCurrentProject = useKanbanStore((state) => state.setCurrentProject);
  return (
    <ul>
      {projectList &&
        projectList.map((project) => (
          <li>
            <button
              id={project.id}
              onClick={() => setCurrentProject(project.id)}
            >
              {project.name}
            </button>
          </li>
        ))}
    </ul>
  );
};

const DashboardAside = () => {
  const { document } = useUserData();
  const { documents: managingProjects } = useCollectDocs<Project>(
    document?.managingProjects,
    'projects'
  );
  console.log(document);

  return (
    <aside className="DashboardAside">
      <Avatar
        userName={document?.userName as string}
        imageUrl={document?.photoUrl as string}
        size="100"
      />
      <h2>{document?.userName}</h2>
      <p>Projects completed: {document?.projectsCompleted}</p>
      <p>Tasks completed: {document?.tasksCompleted}</p>

      <div>
        <h3>Managing Projects</h3>
        <DashboardAsideList projectList={managingProjects} />
      </div>

      <div>
        <h3>Collaborating Projects</h3>
      </div>
    </aside>
  );
};

export default DashboardAside;

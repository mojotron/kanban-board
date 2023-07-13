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
          <li key={project.id}>
            <button onClick={() => setCurrentProject(project.id)}>
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
      <div className="DashboardAside__user">
        <Avatar
          userName={document?.userName as string}
          imageUrl={document?.photoUrl as string}
          size="75"
        />
        <div className="DashboardAside__user__info">
          <h2 className="heading--secondary">{document?.userName}</h2>
          <p>Projects completed: {document?.projectsCompleted}</p>
          <p>Tasks completed: {document?.tasksCompleted}</p>
        </div>
      </div>

      <div className="DashboardAside__projects">
        <h3 className="heading--tertiary">Managing Projects</h3>
        <DashboardAsideList projectList={managingProjects} />
      </div>

      <div className="DashboardAside__projects">
        <h3 className="heading--tertiary">Collaborating Projects</h3>
      </div>
    </aside>
  );
};

export default DashboardAside;

import { useKanbanStore } from '../../../../store';
import { ProjectType } from '../../../../types/projectType';

type Project = ProjectType & { id: string };

const ProjectList = ({ projectList }: { projectList: Project[] | null }) => {
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

export default ProjectList;

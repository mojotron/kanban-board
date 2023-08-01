import { useNavigate } from 'react-router-dom';
import { useKanbanStore } from '../../../../store';
import { ProjectType } from '../../../../types/projectType';

type Project = ProjectType & { id: string };

const ProjectList = ({ projectList }: { projectList: Project[] | null }) => {
  const setCurrentProject = useKanbanStore((state) => state.setCurrentProject);
  const navigate = useNavigate();

  return (
    <ul>
      {projectList &&
        projectList.map((project) => (
          <li key={project.id}>
            <button
              onClick={() => {
                setCurrentProject(project.id);
                navigate('/');
              }}
            >
              {project.name}
            </button>
          </li>
        ))}
    </ul>
  );
};

export default ProjectList;

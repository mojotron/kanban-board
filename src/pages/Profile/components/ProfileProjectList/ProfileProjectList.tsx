import { useCollectDocs } from '../../../../hooks/useCollectDocs';
import { ProjectWithId } from '../../../../types/projectType';
// components
import ProjectCard from '../../../../components/ProjectCard/ProjectCard';

type PropsType = {
  header: string;
  projectList: string[];
};

const ProfileProjectList = ({ header, projectList }: PropsType) => {
  const { documents: projects } = useCollectDocs<ProjectWithId>(
    projectList,
    'projects'
  );

  return (
    <div>
      <h2>{header}</h2>
      {projects?.map((project) => (
        <ProjectCard key={project.id} data={project} />
      ))}
    </div>
  );
};

export default ProfileProjectList;

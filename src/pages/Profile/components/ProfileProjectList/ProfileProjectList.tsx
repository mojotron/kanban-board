import { useCollectDocs } from '../../../../hooks/useCollectDocs';
import { ProjectWithId } from '../../../../types/projectType';

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
        <p key={project.id}>{project.name}</p>
      ))}
    </div>
  );
};

export default ProfileProjectList;

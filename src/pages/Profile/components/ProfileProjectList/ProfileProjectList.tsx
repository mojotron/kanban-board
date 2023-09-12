import { useCollectDocs } from '../../../../hooks/useCollectDocs';
import { ProjectWithId } from '../../../../types/projectType';
// components
import ProjectCard from '../../../../components/ProjectCard/ProjectCard';
// style
import styles from './ProfileProjectList.module.css';

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
    <div className={styles.projects}>
      <h2>{header}</h2>
      <div className={styles.projectList}>
        {projects?.map((project) => (
          <ProjectCard key={project.id} data={project} />
        ))}
      </div>
    </div>
  );
};

export default ProfileProjectList;

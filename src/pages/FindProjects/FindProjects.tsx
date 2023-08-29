import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCollectDataByQuery } from '../../hooks/useCollectDataByQuery';
import { ProjectWithId } from '../../types/projectType';
import ProjectCard from './components/ProjectCard';

const FindProjects = () => {
  const { getFirst } = useCollectDataByQuery(3, 'projects', undefined);
  const [projects, setProjects] = useState<ProjectWithId[]>([]);
  // TODO project card component
  // TODO list cards
  // TODO project hook - last 10, by name, creator, tag
  // TODO search form
  return (
    <div>
      FindProjects
      <Link className="btn" to="/">
        Go back
      </Link>
      <button
        onClick={async () => {
          const data = await getFirst();
          setProjects(data);
        }}
      >
        Projects
      </button>
      {projects.length > 0 &&
        projects.map((p) => <ProjectCard data={p} key={p.id} />)}
    </div>
  );
};

export default FindProjects;

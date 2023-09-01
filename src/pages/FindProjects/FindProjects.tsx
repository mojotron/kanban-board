import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCollectDataByQuery } from '../../hooks/useCollectDataByQuery';
import { ProjectWithId } from '../../types/projectType';
import ProjectCard from './components/ProjectCard';

const FindProjects = () => {
  const { getFirst, getNext, isFetching } = useCollectDataByQuery(
    3,
    'projects',
    undefined
  );
  const [projects, setProjects] = useState<ProjectWithId[]>([]);
  // TODO project hook - last 10, by name, creator, tag
  // TODO search form

  useEffect(() => {
    getFirst().then((data) => data !== -1 && setProjects(data));
  }, []);

  const handleLoadMore = async () => {
    const data = await getNext();
    if (data === -1) return; // there is no more docks
    setProjects((oldProjects) => [...oldProjects, ...data]);
  };

  return (
    <div>
      FindProjects
      <Link className="btn" to="/">
        Go back
      </Link>
      <button onClick={handleLoadMore}>
        {isFetching ? 'Loading...' : 'Find more projects'}
      </button>
      {projects.length > 0 &&
        projects.map((p) => <ProjectCard data={p} key={p.id} />)}
    </div>
  );
};

export default FindProjects;

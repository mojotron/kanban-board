import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCollectDataByQuery } from '../../hooks/useCollectDataByQuery';
import { ProjectWithId } from '../../types/projectType';
import ProjectCard from './components/ProjectCard';
import { FIND_BY_SELECT } from '../../constants/findProject';
import { FindBy } from '../../types/findByType';
import './FindProject.css';

const FindProjects = () => {
  const { getFirst, getNext, isFetching } = useCollectDataByQuery(
    3,
    'projects',
    undefined
  );
  const [projects, setProjects] = useState<ProjectWithId[]>([]);
  const [findByQuery, setFindByQuery] = useState<FindBy>('latest');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getFirst().then((data) => data !== -1 && setProjects(data));
  }, []);

  const handleLoadMore = async () => {
    const data = await getNext();
    if (data === -1) return; // there is no more docks
    setProjects((oldProjects) => [...oldProjects, ...data]);
  };

  return (
    <div className="FindProject">
      FindProjects
      <div>
        <label htmlFor="search-by">Search by</label>
        <select
          value={findByQuery}
          onChange={(e) => setFindByQuery(e.target.value)}
        >
          {FIND_BY_SELECT.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Link className="btn" to="/">
        Go back
      </Link>
      <button onClick={handleLoadMore}>
        {isFetching ? 'Loading...' : 'Find more projects'}
      </button>
      <div className="FindProject__projects">
        {projects.length > 0 &&
          projects.map((p) => <ProjectCard data={p} key={p.id} />)}
      </div>
    </div>
  );
};

export default FindProjects;

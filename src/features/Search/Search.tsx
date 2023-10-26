import { useEffect } from 'react';
import SearchFilters from './components/SearchFilters/SearchFilters';
import SearchResults from './components/SearchResults/SearchResults';
import { useSearchSource } from './hooks/useGetSearchedDocs';
import styles from './Search.module.css';
import { ProjectWithId } from '../../types/projectType';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import Button from '../../components/Button/Button';
import { useParams } from 'react-router-dom';
import { UserWithId } from '../../types/userType';

const Search = () => {
  const { collectionName } = useParams();
  const { documents, getFirst, getNext, isFetching, endOfDocuments } =
    useSearchSource();

  useEffect(() => {
    getFirst();
  }, [getFirst]);

  return (
    <main className={styles.searchProjects}>
      <SearchFilters />

      <SearchResults>
        {collectionName === 'projects' &&
          documents?.map((doc) => (
            <ProjectCard key={doc.id} data={doc as ProjectWithId} />
          ))}
      </SearchResults>

      {!endOfDocuments && (
        <Button handleClick={getNext} className={styles.btnLoadMore}>
          {isFetching ? 'Loading...' : 'Load more'}
        </Button>
      )}
    </main>
  );
};

export default Search;

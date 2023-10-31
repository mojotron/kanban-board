import { ProjectWithId } from '../../types/projectType';
import SearchFilters from './components/SearchFilters/SearchFilters';
import SearchResults from './components/SearchResults/SearchResults';
import { PROJECT_FILTERS } from './constants/filters';
import { useSearchProject } from './hooks/useSearchProjects';
import styles from './Search.module.css';
import { ProjectFilterTypes } from './types/filterTypes';
import Button from '../../components/Button/Button';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

const Search = () => {
  const {
    filter,
    updateFilter,
    searchTerm,
    updateSearchTerm,
    endOfDocuments,
    getNext,
    isFetching,
    documents,
  } = useSearchProject<ProjectWithId, ProjectFilterTypes>('projects', 'latest');

  return (
    <main className={styles.searchProjects}>
      <SearchFilters
        filters={PROJECT_FILTERS}
        currentFilter={filter}
        onFiltersChange={updateFilter}
        searchTerm={searchTerm}
        onSearchTermChange={updateSearchTerm}
        disabled={filter === 'latest'}
      />
      <SearchResults>
        {documents.map((doc, i) => (
          <ProjectCard key={i} data={doc as ProjectWithId} />
        ))}
        {!endOfDocuments && (
          <Button handleClick={getNext} className={styles.btnLoadMore}>
            {isFetching ? 'Loading...' : 'Load More'}
          </Button>
        )}
      </SearchResults>
    </main>
  );
};

export default Search;

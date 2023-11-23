import { ProjectWithId } from '../../types/projectType';
import SearchFilters from './components/SearchFilters/SearchFilters';
import SearchResults from './components/SearchResults/SearchResults';
import { PROJECT_FILTERS } from './constants/filters';
import { useSearchDocuments } from './hooks/useSearchDocuments';
import styles from './Search.module.css';
import { ProjectFilterTypes } from './types/filterTypes';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { useParams } from 'react-router-dom';

const Search = () => {
  const { collectionName } = useParams<{ collectionName?: string }>();

  const {
    documents,
    getNext,
    isFetching,
    endOfDocuments,
    filter,
    updateFilter,
    searchTerm,
    updateSearchTerm,
  } = useSearchDocuments<ProjectWithId, ProjectFilterTypes>(
    collectionName,
    'latest'
  );

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
      {collectionName === 'projects' && (
        <SearchResults>
          {documents.map((doc, i) => (
            <ProjectCard key={i} data={doc as ProjectWithId} />
          ))}

          {!endOfDocuments && (
            <LoadMoreButton onLoadMore={getNext} isFetching={isFetching} />
          )}
        </SearchResults>
      )}
      {collectionName === 'users' && (
        <p>User search functionality coming soon!</p>
      )}
    </main>
  );
};

export default Search;

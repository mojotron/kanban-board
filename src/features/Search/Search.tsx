import { ProjectWithId } from '../../types/projectType';
import SearchResults from './components/SearchResults/SearchResults';
import { useSearchDocuments } from './hooks/useSearchDocuments';
import styles from './Search.module.css';
import { ProjectFilterTypes } from './types/filterTypes';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { useParams } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import SearchFilters from './components/SearchFilters/SearchFilters';
// constants
import { SEARCH_FILTERS } from './constants/filters';
// types
import type { SearchCollections } from './types/filterTypes';
import { useSearch } from './hooks/useSearch';

const Search = () => {
  const { collectionName } = useParams<{
    collectionName?: SearchCollections;
  }>();

  const { filter, updateFilter, query, updateQuery } =
    useSearch(collectionName);

  if (!collectionName) return null;

  return (
    <main className={styles.searchProjects}>
      <search className={styles.searchWrapper}>
        <SearchBar query={query} onChange={updateQuery} ref={null} />
        <SearchFilters
          filterOptions={SEARCH_FILTERS[collectionName]}
          currentFilter={filter}
          onFilterChange={updateFilter}
        />
      </search>

      {/* {collectionName === 'projects' && (
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
      )} */}
    </main>
  );
};

export default Search;

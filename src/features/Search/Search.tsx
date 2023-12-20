import { ProjectWithId } from '../../types/projectType';
import SearchResults from './components/SearchResults/SearchResults';
import styles from './Search.module.css';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

import SearchBar from './components/SearchBar/SearchBar';
import SearchFilters from './components/SearchFilters/SearchFilters';
// constants
import { SEARCH_COLLECTION, SEARCH_FILTERS } from './constants/filters';
// types
import type { SearchCollections } from './types/filterTypes';
import { useSearch } from './hooks/useSearch';

import UserCard from '../../components/UserCard/UserCard';
import { UserWithId } from '../../types/userType';

const Search = () => {
  const {
    collectionName: collection,
    updateCollection,
    filter,
    updateFilter,
    searchTerm,
    updateSearchTerm,
    documents,
    isFetching,
    endOfDocuments,
    getNext,
  } = useSearch();

  return (
    <main className={styles.search}>
      <search className={styles.searchWrapper}>
        <SearchBar query={searchTerm} onChange={updateSearchTerm} ref={null} />
        <div className={styles.filterWrapper}>
          <SearchFilters
            filterOptions={SEARCH_COLLECTION}
            currentFilter={collection}
            onFilterChange={(value) =>
              updateCollection(value as SearchCollections)
            }
            label="search for"
          />
          <SearchFilters
            filterOptions={SEARCH_FILTERS[collection]}
            currentFilter={filter}
            onFilterChange={updateFilter}
          />
        </div>
      </search>

      <SearchResults>
        {collection === 'projects' &&
          documents.map((doc, i) => (
            <ProjectCard key={i} data={doc as ProjectWithId} />
          ))}

        {collection === 'users' &&
          documents.map((doc, i) => (
            <UserCard key={i} user={doc as UserWithId} />
          ))}

        {!endOfDocuments && (
          <LoadMoreButton onLoadMore={getNext} isFetching={isFetching} />
        )}
      </SearchResults>
    </main>
  );
};

export default Search;

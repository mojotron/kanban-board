import { ProjectWithId } from '../../types/projectType';
import SearchResults from './components/SearchResults/SearchResults';
import styles from './Search.module.css';
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

import UserCard from '../../components/UserCard/UserCard';
import { UserWithId } from '../../types/userType';
import { useEffect } from 'react';

const Search = () => {
  const { collectionName } = useParams<{
    collectionName?: SearchCollections;
  }>();

  const {
    filter,
    updateFilter,
    searchTerm,
    updateSearchTerm,
    documents,
    isFetching,
    endOfDocuments,
    getNext,
  } = useSearch(collectionName);

  if (!collectionName) return null;

  return (
    <main className={styles.searchProjects}>
      <search className={styles.searchWrapper}>
        <SearchBar query={searchTerm} onChange={updateSearchTerm} ref={null} />
        <SearchFilters
          filterOptions={SEARCH_FILTERS[collectionName]}
          currentFilter={filter}
          onFilterChange={updateFilter}
        />
      </search>

      <SearchResults>
        {collectionName === 'projects' &&
          documents.map((doc, i) => (
            <ProjectCard key={i} data={doc as ProjectWithId} />
          ))}

        {collectionName === 'users' &&
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

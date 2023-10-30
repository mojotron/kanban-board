import SearchFilters from './components/SearchFilters/SearchFilters';
import SearchResults from './components/SearchResults/SearchResults';
import { SearchContextProvider } from './context/SearchProjectContext';
import styles from './Search.module.css';

const Search = () => {
  return (
    <SearchContextProvider>
      <main className={styles.searchProjects}>
        <SearchFilters />
        <SearchResults />
      </main>
    </SearchContextProvider>
  );
};

export default Search;

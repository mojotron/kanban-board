import SearchFilters from './components/SearchFilters/SearchFilters';
import SearchResults from './components/SearchResults/SearchResults';
import styles from './Search.module.css';

const Search = () => {
  return (
    <main className={styles.searchProjects}>
      <SearchFilters />
      <SearchResults />
    </main>
  );
};

export default Search;

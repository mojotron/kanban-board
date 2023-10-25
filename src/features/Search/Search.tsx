import { useEffect } from 'react';
import SearchFilters from './components/SearchFilters/SearchFilters';
import SearchResults from './components/SearchResults/SearchResults';
import { useGetSearchedDocs } from './hooks/useGetSearchedDocs';
import styles from './Search.module.css';

const Search = () => {
  const { documents, getFirst } = useGetSearchedDocs(
    'projects',
    'mojo',
    'latest'
  );

  useEffect(() => {
    getFirst();
  }, [getFirst]);

  console.log(documents);

  return (
    <main className={styles.searchProjects}>
      <SearchFilters />
      <SearchResults />
    </main>
  );
};

export default Search;

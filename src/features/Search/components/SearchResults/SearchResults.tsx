import { ReactNode } from 'react';
import styles from './SearchResults.module.css';

const SearchResults = ({ children }: { children: ReactNode }) => {
  return <ul className={styles.searchResults}>{children}</ul>;
};

export default SearchResults;

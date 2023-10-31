import { ReactNode } from 'react';
import Button from '../../../../components/Button/Button';
import ProjectCard from '../../../../components/ProjectCard/ProjectCard';
import { ProjectWithId } from '../../../../types/projectType';
import styles from './SearchResults.module.css';

const SearchResults = ({ children }: { children: ReactNode }) => {
  const collectionName = true ? 'projects' : 'users';

  return <ul className={styles.searchResults}>{children}</ul>;
};

export default SearchResults;

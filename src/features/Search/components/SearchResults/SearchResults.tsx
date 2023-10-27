import Button from '../../../../components/Button/Button';
import ProjectCard from '../../../../components/ProjectCard/ProjectCard';
import { ProjectWithId } from '../../../../types/projectType';
import { useSearch } from '../../context/SearchContext';
import styles from './SearchResults.module.css';

const SearchResults = () => {
  const { collectionName, documents, isFetching, endOfDocuments, getNext } =
    useSearch();

  return (
    <>
      <ul className={styles.searchResults}>
        {collectionName === 'projects' &&
          documents.map((doc, i) => (
            <ProjectCard key={i} data={doc as ProjectWithId} />
          ))}
        {/* TODO Developer Card */}
        {collectionName === 'users' &&
          documents.map((doc) => <div key={doc.id}>{doc.id}</div>)}
      </ul>

      {!endOfDocuments && (
        <Button handleClick={getNext} className={styles.btnLoadMore}>
          {isFetching ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </>
  );
};

export default SearchResults;

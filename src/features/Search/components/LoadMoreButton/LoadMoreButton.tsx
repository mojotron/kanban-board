import Button from '../../../../components/Button/Button';
import styles from './LoadMoreButton.module.css';

const LoadMoreButton = ({
  isFetching,
  onLoadMore,
}: {
  isFetching: boolean;
  onLoadMore: () => void;
}) => {
  return (
    <Button handleClick={onLoadMore} className={styles.btnLoadMore}>
      {isFetching ? 'Loading...' : 'Load More'}
    </Button>
  );
};

export default LoadMoreButton;

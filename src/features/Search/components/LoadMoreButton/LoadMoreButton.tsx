import Button from '../../../../components/Button/Button';

const LoadMoreButton = ({
  isFetching,
  onLoadMore,
}: {
  isFetching: boolean;
  onLoadMore: () => void;
}) => {
  return (
    <Button handleClick={onLoadMore} className="btn">
      {isFetching ? 'Loading...' : 'Load More'}
    </Button>
  );
};

export default LoadMoreButton;

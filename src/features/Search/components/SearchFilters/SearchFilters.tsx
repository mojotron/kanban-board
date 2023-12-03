import styles from '../../Search.module.css';

type PropsType = {
  filterOptions: string[];
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  label?: string;
};

const SearchFilters = ({
  filterOptions,
  currentFilter,
  onFilterChange,
  label = 'filter by',
}: PropsType) => {
  return (
    <div className={styles.searchFilters}>
      <label className={styles.searchFiltersLabel} htmlFor="filters">
        {label}
      </label>
      <select
        id="filters"
        className={'input'}
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {filterOptions.map((ele) => (
          <option key={ele}>{ele}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilters;

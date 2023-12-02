import styles from '../../Search.module.css';

type PropsType = {
  filterOptions: string[];
  label?: string;
};

const SearchFilters = ({ filterOptions, label = 'filter by' }: PropsType) => {
  return (
    <div className={styles.searchFilters}>
      <label className={styles.searchFiltersLabel} htmlFor="filters">
        {label}
      </label>
      <select id="filters" className={'input'}>
        {filterOptions.map((ele) => (
          <option key={ele}>{ele}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilters;

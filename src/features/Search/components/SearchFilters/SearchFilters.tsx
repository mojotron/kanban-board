import { FormEvent, useRef } from 'react';
import styles from './SearchFilters.module.css';
import { AiOutlineSearch as IconSearch } from 'react-icons/ai';

const SearchFilters = <FilterType,>({
  filters,
  currentFilter,
  onFiltersChange,
  searchTerm,
  onSearchTermChange,
  disabled,
}: {
  filters: string[];
  currentFilter: string;
  onFiltersChange: (value: FilterType) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  disabled: boolean;
}) => {
  // const { searchTerm, updateSearchTerm, filter, updateFilter } = useSearch();
  const searchBarRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('hello');
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div
        className={`${styles.searchContainer} ${
          disabled ? styles.disabled : ''
        }`}
        onClick={() => searchBarRef.current?.focus()}
      >
        <IconSearch size={20} className={styles.searchIcon} />
        <input
          type="search"
          ref={searchBarRef}
          className={styles.searchBar}
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>

      <label className={styles.searchFilters}>
        Search for
        <select
          className={styles.searchFiltersSelect}
          onChange={(e) => onFiltersChange(e.target.value as FilterType)}
        >
          {filters.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

export default SearchFilters;

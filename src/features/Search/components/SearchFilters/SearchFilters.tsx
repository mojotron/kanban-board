import { FormEvent, useRef } from 'react';
import styles from './SearchFilters.module.css';
import { AiOutlineSearch as IconSearch } from 'react-icons/ai';
import type { ProjectFilterTypes } from '../../types/filterTypes';
import { useSearch } from '../../context/SearchContext';
import { PROJECT_FILTERS } from '../../constants/filters';

const SearchFilters = () => {
  const { searchTerm, updateSearchTerm, filter, updateFilter } = useSearch();
  const searchBarRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('hello');
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div
        className={`${styles.searchContainer} ${
          filter === 'latest' ? styles.disabled : ''
        }`}
        onClick={() => searchBarRef.current?.focus()}
      >
        <IconSearch size={20} className={styles.searchIcon} />
        <input
          type="search"
          ref={searchBarRef}
          className={styles.searchBar}
          value={searchTerm}
          onChange={(e) => updateSearchTerm(e.target.value)}
        />
      </div>

      <label className={styles.searchFilters}>
        Search for
        <select
          className={styles.searchFiltersSelect}
          onChange={(e) => updateFilter(e.target.value as ProjectFilterTypes)}
        >
          {PROJECT_FILTERS.map((ele) => (
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

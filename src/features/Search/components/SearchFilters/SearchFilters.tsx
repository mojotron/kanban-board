import { FormEvent, useRef, useState } from 'react';
import styles from './SearchFilters.module.css';
import { AiOutlineSearch as IconSearch } from 'react-icons/ai';

const filtersConfig = [
  {
    display: 'latest projects',
    value: 'latest',
    default: true,
  },
  {
    display: 'project by name',
    value: 'project',
    default: false,
  },
  {
    display: 'project by tag',
    value: 'tag',
    default: false,
  },
  {
    display: 'user by name',
    value: 'username',
    default: false,
  },
];

type Filters = 'latest' | 'project' | 'tag' | 'username';

const SearchFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState<Filters>('latest');
  const searchBarRef = useRef<HTMLInputElement>(null);

  console.log(currentFilter);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchQuery);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div
        className={`${styles.searchContainer} ${
          currentFilter === 'latest' ? styles.disabled : ''
        }`}
        onClick={() => searchBarRef.current?.focus()}
      >
        <IconSearch size={20} className={styles.searchIcon} />
        <input
          type="search"
          ref={searchBarRef}
          className={styles.searchBar}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <label className={styles.searchFilters}>
        Search for
        <select
          className={styles.searchFiltersSelect}
          onChange={(e) => setCurrentFilter(e.target.value as Filters)}
        >
          {filtersConfig.map((ele) => (
            <option key={ele.value} value={ele.value}>
              {ele.display}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

export default SearchFilters;

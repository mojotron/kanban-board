import { FaSearch as IconSearch } from 'react-icons/fa';
import styles from '../../Search.module.css';
import { Dispatch, SetStateAction, RefObject } from 'react';

type PropsType = {
  query: string;
  onChange: (value: string) => void;
  ref?: RefObject<HTMLInputElement> | null;
  placeholder?: string;
};

const SearchBar = ({
  query,
  onChange,
  placeholder = 'Search',
  ref = null,
}: PropsType) => {
  return (
    <div className={styles.searchBar}>
      <IconSearch />
      <input
        ref={ref}
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

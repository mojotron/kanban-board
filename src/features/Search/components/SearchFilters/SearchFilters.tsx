type PropsType = {
  filterOptions: string[];
  label?: string;
};

const SearchFilters = ({ filterOptions, label = 'Search by' }: PropsType) => {
  return (
    <div>
      <label htmlFor="filters">{label}</label>
      <select id="filters">
        {filterOptions.map((ele) => (
          <option key={ele}>{ele}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilters;

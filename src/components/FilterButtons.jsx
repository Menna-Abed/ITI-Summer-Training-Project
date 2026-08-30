const FILTERS = ['All', 'Indoor', 'Outdoor', 'Needs Water', 'Healthy']

 
 
function FilterButtons({ activeFilter, onFilterChange }) {
  return (
    <div className="filter-buttons">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={`filter-btn ${activeFilter === filter ? 'filter-btn-active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default FilterButtons

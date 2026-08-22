const FILTERS = ['All', 'Indoor', 'Outdoor', 'Needs Water', 'Healthy']

// activeFilter and onFilterChange are passed down from the Plants page,
// so this component doesn't need any state of its own.
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

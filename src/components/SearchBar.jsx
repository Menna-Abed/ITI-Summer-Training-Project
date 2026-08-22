// A controlled input: its value always comes from the parent's state
// (searchTerm), and every keystroke reports back up via onSearch.
function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search plants..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      {searchTerm && (
        <button
          className="search-clear"
          onClick={() => onSearch('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar

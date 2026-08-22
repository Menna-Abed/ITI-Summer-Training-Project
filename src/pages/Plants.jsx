import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import FilterButtons from '../components/FilterButtons'
import PlantCard from '../components/PlantCard'
import { getStatus } from '../utils/plantUtils'

function Plants({ plants, onWaterNow, onViewDetails, onToggleFavorite, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  // .filter() #1: narrow the list down by the search box text.
  const searched = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // .filter() #2: further narrow by the selected category/status chip.
  const filtered = searched.filter((plant) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Indoor') return plant.category === 'Indoor'
    if (activeFilter === 'Outdoor') return plant.category === 'Outdoor'
    if (activeFilter === 'Needs Water') return getStatus(plant) === 'needs-water'
    if (activeFilter === 'Healthy') return getStatus(plant) === 'healthy'
    return true
  })

  // useEffect example: keep the browser tab title in sync with how many
  // plants are currently visible, purely as a side effect of state changing.
  useEffect(() => {
    document.title = `My Plants (${filtered.length}) – GreenCare`
    return () => {
      document.title = 'GreenCare – Plant Care Tracker'
    }
  }, [filtered.length])

  return (
    <div className="page">
      <div className="section-header">
        <h2>My Plants</h2>
        <button className="btn btn-primary" onClick={() => onNavigate('add')}>
          + Add Plant
        </button>
      </div>

      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>🔍 No plants match your search or filter.</p>
        </div>
      ) : (
        <div className="plant-grid">
          {filtered.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onWaterNow={onWaterNow}
              onViewDetails={onViewDetails}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Plants

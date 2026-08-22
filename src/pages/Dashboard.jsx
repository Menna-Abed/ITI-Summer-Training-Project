import Stats from '../components/Stats'
import PlantCard from '../components/PlantCard'
import { getStatus } from '../utils/plantUtils'

// Dashboard is a "page" component: it receives the full plants array and
// the handler functions as props from App.jsx, and composes smaller
// components (Stats, PlantCard) to build the page.
function Dashboard({ plants, onWaterNow, onViewDetails, onToggleFavorite, onNavigate }) {
  const total = plants.length
  const needWater = plants.filter((p) => getStatus(p) === 'needs-water').length
  const healthy = total - needWater

  return (
    <div className="page">
      <section className="hero">
        <h1>🌿 GreenCare</h1>
        <p>Take care of your plants, one day at a time.</p>
      </section>

      <Stats total={total} needWater={needWater} healthy={healthy} />

      <div className="section-header">
        <h2>My Plants</h2>
        <button className="btn btn-primary" onClick={() => onNavigate('add')}>
          + Add Plant
        </button>
      </div>

      {plants.length === 0 ? (
        <div className="empty-state">
          <p>🌱 No plants yet. Add your first plant to get started!</p>
          <button className="btn btn-primary" onClick={() => onNavigate('add')}>
            Add Plant
          </button>
        </div>
      ) : (
        <div className="plant-grid">
          {plants.map((plant) => (
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

export default Dashboard

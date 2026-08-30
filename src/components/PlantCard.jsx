import {
  getNextWateringDate,
  getStatus,
  formatDate,
  wateringProgress,
} from '../utils/plantUtils'

 
function PlantCard({ plant, onWaterNow, onViewDetails, onToggleFavorite }) {
  const status = getStatus(plant)
  const isThirsty = status === 'needs-water'
  const progress = wateringProgress(plant)

  return (
    <article className={`plant-card ${isThirsty ? 'plant-card-thirsty' : ''}`}>
      <div className="plant-card-top">
        <span className="plant-card-icon">{plant.icon || '🌿'}</span>
        <button
          className={`favorite-btn ${plant.favorite ? 'favorite-btn-active' : ''}`}
          onClick={() => onToggleFavorite(plant.id)}
          aria-label="Toggle favorite"
        >
          {plant.favorite ? '⭐' : '☆'}
        </button>
      </div>

      <h3 className="plant-card-name">{plant.name}</h3>
      <p className="plant-card-category">{plant.category} Plant</p>

      <div className="plant-card-meta">
        <span>☀️ {plant.lightRequirement} Light</span>
        <span>💧 Every {plant.wateringFrequency} days</span>
      </div>

      
      <div className="growth-bar-wrap">
        <div className="growth-bar-track">
          <div
            className="growth-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="growth-bar-label">
          Next Watering: {formatDate(getNextWateringDate(plant))}
        </span>
      </div>

      <span className={`status-badge ${isThirsty ? 'status-thirsty' : 'status-healthy'}`}>
        {isThirsty ? '🔴 Needs Water' : '🟢 Healthy'}
      </span>

      <div className="plant-card-actions">
        <button className="btn btn-primary" onClick={() => onWaterNow(plant.id)}>
          Water Now
        </button>
        <button className="btn btn-secondary" onClick={() => onViewDetails(plant.id)}>
          View Details
        </button>
      </div>
    </article>
  )
}

export default PlantCard

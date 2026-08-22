import { getNextWateringDate, getStatus, formatDate } from '../utils/plantUtils'

function PlantDetails({ plant, onWaterNow, onDelete, onNavigate }) {
  // Conditional rendering: if the plant was deleted or the id is bad,
  // show a friendly message instead of crashing on `plant.name`.
  if (!plant) {
    return (
      <div className="page page-narrow">
        <div className="empty-state">
          <p>🌱 That plant could not be found.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('plants')}>
            Back to My Plants
          </button>
        </div>
      </div>
    )
  }

  const isThirsty = getStatus(plant) === 'needs-water'

  function handleDelete() {
    const confirmed = window.confirm(`Delete ${plant.name}? This cannot be undone.`)
    if (confirmed) {
      onDelete(plant.id)
      onNavigate('plants')
    }
  }

  return (
    <div className="page page-narrow">
      <button className="link-back" onClick={() => onNavigate('plants')}>
        ← Back to My Plants
      </button>

      <div className="details-card">
        <div className="details-header">
          <span className="details-icon">{plant.icon || '🌿'}</span>
          <div>
            <h1>{plant.name}</h1>
            <p className="plant-card-category">{plant.category} Plant</p>
          </div>
        </div>

        <span className={`status-badge ${isThirsty ? 'status-thirsty' : 'status-healthy'}`}>
          {isThirsty ? '🔴 Needs Water' : '🟢 Healthy'}
        </span>

        <dl className="details-grid">
          <div>
            <dt>☀️ Light</dt>
            <dd>{plant.lightRequirement} Light</dd>
          </div>
          <div>
            <dt>💧 Watering</dt>
            <dd>Every {plant.wateringFrequency} days</dd>
          </div>
          <div>
            <dt>📅 Last Watered</dt>
            <dd>{formatDate(plant.lastWatered)}</dd>
          </div>
          <div>
            <dt>📅 Next Watering</dt>
            <dd>{formatDate(getNextWateringDate(plant))}</dd>
          </div>
        </dl>

        {plant.notes && (
          <div className="details-notes">
            <h3>📝 Notes</h3>
            <p>{plant.notes}</p>
          </div>
        )}

        <div className="details-actions">
          <button className="btn btn-primary" onClick={() => onWaterNow(plant.id)}>
            Water Now
          </button>
          <button className="btn btn-secondary" onClick={() => onNavigate('edit', plant.id)}>
            Edit Plant
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Plant
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlantDetails

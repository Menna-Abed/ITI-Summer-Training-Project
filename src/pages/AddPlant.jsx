import PlantForm from '../components/PlantForm'

const ICONS_BY_LIGHT = { Low: '🌿', Medium: '🍃', High: '🌵' }

function AddPlant({ onAddPlant }) {
  function handleSubmit(formValues) {
    const newPlant = {
      ...formValues,
      id: undefined,  
      icon: ICONS_BY_LIGHT[formValues.lightRequirement] || '🌱',
      favorite: false,
    }
    onAddPlant(newPlant)
  }

  return (
    <div className="page page-narrow">
      <div className="section-header">
        <h2>Add a New Plant</h2>
      </div>
      <p className="page-subtitle">
        Fill in the details below and GreenCare will start tracking its watering schedule.
      </p>
      <PlantForm onSubmit={handleSubmit} submitLabel="Add Plant" />
    </div>
  )
}

export default AddPlant

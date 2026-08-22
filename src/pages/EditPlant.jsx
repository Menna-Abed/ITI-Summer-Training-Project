import PlantForm from '../components/PlantForm'

function EditPlant({ plant, onUpdatePlant, onNavigate }) {
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

  function handleSubmit(formValues) {
    onUpdatePlant(plant.id, formValues)
    onNavigate('details', plant.id)
  }

  return (
    <div className="page page-narrow">
      <button className="link-back" onClick={() => onNavigate('details', plant.id)}>
        ← Back to {plant.name}
      </button>
      <div className="section-header">
        <h2>Edit {plant.name}</h2>
      </div>
      <PlantForm initialData={plant} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  )
}

export default EditPlant

import { useState } from 'react'

const EMPTY_FORM = {
  name: '',
  category: 'Indoor',
  wateringFrequency: '',
  lastWatered: '',
  lightRequirement: 'Medium',
  notes: '',
}

// One shared form for both "Add Plant" and "Edit Plant". `initialData`
// pre-fills the fields when editing; `submitLabel` changes the button text.
// All the field state lives here (controlled inputs), and the finished
// plant object is only handed to the parent when the form is submitted.
function PlantForm({ initialData, onSubmit, submitLabel = 'Add Plant' }) {
  const [formData, setFormData] = useState(initialData || EMPTY_FORM)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function validate() {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Plant name is required.'
    if (!formData.wateringFrequency || Number(formData.wateringFrequency) <= 0) {
      newErrors.wateringFrequency = 'Enter a watering frequency greater than 0.'
    }
    if (!formData.lastWatered) newErrors.lastWatered = 'Last watered date is required.'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    onSubmit({
      ...formData,
      wateringFrequency: Number(formData.wateringFrequency),
    })
  }

  return (
    <form className="plant-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Plant Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="e.g. Snake Plant"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={formData.category} onChange={handleChange}>
          <option value="Indoor">Indoor</option>
          <option value="Outdoor">Outdoor</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="wateringFrequency">Watering Frequency (days)</label>
        <input
          id="wateringFrequency"
          name="wateringFrequency"
          type="number"
          min="1"
          placeholder="e.g. 7"
          value={formData.wateringFrequency}
          onChange={handleChange}
        />
        {errors.wateringFrequency && (
          <p className="form-error">{errors.wateringFrequency}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="lastWatered">Last Watered</label>
        <input
          id="lastWatered"
          name="lastWatered"
          type="date"
          value={formData.lastWatered}
          onChange={handleChange}
        />
        {errors.lastWatered && <p className="form-error">{errors.lastWatered}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="lightRequirement">Light Requirement</label>
        <select
          id="lightRequirement"
          name="lightRequirement"
          value={formData.lightRequirement}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          placeholder="e.g. Keep away from direct sunlight"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-full">
        {submitLabel}
      </button>
    </form>
  )
}

export default PlantForm

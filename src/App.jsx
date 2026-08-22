import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Plants from './pages/Plants'
import AddPlant from './pages/AddPlant'
import PlantDetails from './pages/PlantDetails'
import EditPlant from './pages/EditPlant'
import CareTips from './pages/CareTips'
import defaultPlants from './data/defaultPlants'
import { generateId } from './utils/plantUtils'

const STORAGE_KEY = 'plants'

function App() {
  // ----- Plants state, loaded from localStorage (or the sample data
  // the very first time the app is opened) -----
  const [plants, setPlants] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (err) {
        console.error('Could not read saved plants, starting fresh.', err)
        return defaultPlants
      }
    }
    return defaultPlants
  })

  // Simple "router": which page is showing, and which plant id (if any)
  // that page needs (details/edit pages need to know which plant).
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedPlantId, setSelectedPlantId] = useState(null)

  // Whenever `plants` changes, write the whole array back to localStorage.
  // This one effect covers add / edit / delete / water-now, since they
  // all go through setPlants.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants))
  }, [plants])

  function handleNavigate(page, plantId = null) {
    setCurrentPage(page)
    setSelectedPlantId(plantId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleAddPlant(newPlantData) {
    const plant = { ...newPlantData, id: generateId() }
    setPlants((prev) => [...prev, plant])
    handleNavigate('dashboard')
  }

  function handleUpdatePlant(id, updatedFields) {
    setPlants((prev) =>
      prev.map((plant) => (plant.id === id ? { ...plant, ...updatedFields } : plant))
    )
  }

  function handleDeletePlant(id) {
    setPlants((prev) => prev.filter((plant) => plant.id !== id))
  }

  function handleWaterNow(id) {
    setPlants((prev) =>
      prev.map((plant) => {
        if (plant.id !== id) return plant
        return { ...plant, lastWatered: new Date().toISOString().split('T')[0] }
      })
    )
  }

  function handleToggleFavorite(id) {
    setPlants((prev) =>
      prev.map((plant) =>
        plant.id === id ? { ...plant, favorite: !plant.favorite } : plant
      )
    )
  }

  const selectedPlant = plants.find((p) => p.id === selectedPlantId) || null

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="main-content">
        {currentPage === 'dashboard' && (
          <Dashboard
            plants={plants}
            onWaterNow={handleWaterNow}
            onViewDetails={(id) => handleNavigate('details', id)}
            onToggleFavorite={handleToggleFavorite}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'plants' && (
          <Plants
            plants={plants}
            onWaterNow={handleWaterNow}
            onViewDetails={(id) => handleNavigate('details', id)}
            onToggleFavorite={handleToggleFavorite}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'add' && <AddPlant onAddPlant={handleAddPlant} />}

        {currentPage === 'details' && (
          <PlantDetails
            plant={selectedPlant}
            onWaterNow={handleWaterNow}
            onDelete={handleDeletePlant}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'edit' && (
          <EditPlant
            plant={selectedPlant}
            onUpdatePlant={handleUpdatePlant}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'tips' && <CareTips />}
      </main>

      <footer className="footer">
        <p>🌿 GreenCare — made for people (and plants) who forget things sometimes.</p>
      </footer>
    </div>
  )
}

export default App

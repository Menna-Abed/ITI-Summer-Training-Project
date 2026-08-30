 export function addDays(dateString, days) {
  const date = new Date(dateString)
  date.setDate(date.getDate() + Number(days))
  return date.toISOString().split('T')[0]
} 
export function todayString() {
  return new Date().toISOString().split('T')[0]
}
 
export function getNextWateringDate(plant) {
  return addDays(plant.lastWatered, plant.wateringFrequency)
}
export function getStatus(plant) {
  const next = new Date(getNextWateringDate(plant))
  const today = new Date(todayString())
  return next <= today ? 'needs-water' : 'healthy'
}
export function daysUntilWatering(plant) {
  const next = new Date(getNextWateringDate(plant))
  const today = new Date(todayString())
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((next - today) / msPerDay)
}

export function wateringProgress(plant) {
  const last = new Date(plant.lastWatered)
  const today = new Date(todayString())
  const msPerDay = 1000 * 60 * 60 * 24
  const daysSince = Math.round((today - last) / msPerDay)
  const percent = (daysSince / Number(plant.wateringFrequency)) * 100
  return Math.min(100, Math.max(0, percent))
}


export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
export function generateId() {
  return `plant-${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

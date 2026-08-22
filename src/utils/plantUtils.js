// Small set of pure helper functions shared by every page/component.
// Keeping date math in one place means the "next watering date" and
// "needs water?" logic can never drift apart between components.

// Adds `days` to a "YYYY-MM-DD" date string and returns a new "YYYY-MM-DD" string.
export function addDays(dateString, days) {
  const date = new Date(dateString)
  date.setDate(date.getDate() + Number(days))
  return date.toISOString().split('T')[0]
}

// Returns today's date as a "YYYY-MM-DD" string (no time component).
export function todayString() {
  return new Date().toISOString().split('T')[0]
}

// Calculates the next watering date from lastWatered + wateringFrequency.
export function getNextWateringDate(plant) {
  return addDays(plant.lastWatered, plant.wateringFrequency)
}

// Returns 'needs-water' or 'healthy' based on whether today has reached
// (or passed) the next watering date.
export function getStatus(plant) {
  const next = new Date(getNextWateringDate(plant))
  const today = new Date(todayString())
  return next <= today ? 'needs-water' : 'healthy'
}

// How many days remain until the plant needs water (can be negative if overdue).
export function daysUntilWatering(plant) {
  const next = new Date(getNextWateringDate(plant))
  const today = new Date(todayString())
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((next - today) / msPerDay)
}

// 0-100 progress through the current watering cycle, for the growth bar.
export function wateringProgress(plant) {
  const last = new Date(plant.lastWatered)
  const today = new Date(todayString())
  const msPerDay = 1000 * 60 * 60 * 24
  const daysSince = Math.round((today - last) / msPerDay)
  const percent = (daysSince / Number(plant.wateringFrequency)) * 100
  return Math.min(100, Math.max(0, percent))
}

// Formats "YYYY-MM-DD" as "August 27, 2026" for display.
export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Generates a simple unique id without needing an extra package.
export function generateId() {
  return `plant-${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

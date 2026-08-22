import PlantTip from '../components/PlantTip'

const TIPS = [
  {
    icon: '🌱',
    title: 'Watering Tip',
    text: 'Do not water your plant if the soil is still wet. Stick a finger an inch into the soil to check first.',
  },
  {
    icon: '☀️',
    title: 'Light Tip',
    text: 'Make sure each plant gets the amount of light it needs — too little and it stretches, too much and it can scorch.',
  },
  {
    icon: '🌿',
    title: 'General Tip',
    text: 'Remove dry or damaged leaves regularly so the plant can focus its energy on healthy growth.',
  },
  {
    icon: '💧',
    title: 'Water Tip',
    text: 'Different plants need different watering schedules — a cactus and a peace lily should never be treated the same.',
  },
]

function CareTips() {
  return (
    <div className="page">
      <div className="section-header">
        <h2>🌱 Plant Care Tips</h2>
      </div>
      <p className="page-subtitle">A few simple reminders to keep every plant in your care thriving.</p>

      <div className="tips-grid">
        {TIPS.map((tip) => (
          <PlantTip key={tip.title} icon={tip.icon} title={tip.title} text={tip.text} />
        ))}
      </div>
    </div>
  )
}

export default CareTips

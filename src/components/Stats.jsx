// Stats is a "dumb" presentational component: it just receives numbers
// as props and displays them. All the counting happens in the parent page.
function Stats({ total, needWater, healthy }) {
  const cards = [
    { icon: '🌱', label: 'Total Plants', value: total, className: 'stat-total' },
    { icon: '💧', label: 'Need Water', value: needWater, className: 'stat-thirsty' },
    { icon: '🌿', label: 'Healthy', value: healthy, className: 'stat-healthy' },
  ]

  return (
    <section className="stats-grid">
      {cards.map((card) => (
        <div className={`stat-card ${card.className}`} key={card.label}>
          <span className="stat-icon">{card.icon}</span>
          <div>
            <p className="stat-value">{card.value}</p>
            <p className="stat-label">{card.label}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Stats

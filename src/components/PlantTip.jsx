 
function PlantTip({ icon, title, text }) {
  return (
    <div className="tip-card">
      <span className="tip-icon">{icon}</span>
      <h3 className="tip-title">{title}</h3>
      <p className="tip-text">{text}</p>
    </div>
  )
}

export default PlantTip

import './card.css';

const Card = ({ title, year, imageUrl, onView }) => {

  return (
    <div className="card" style={{ position: "relative" }}>  
        <img src={imageUrl} alt={title} className="cardimage" />
        <div className="card-content">
            <h3 className="card-title">{title}</h3>
            {year && <p className="card-year">{year}</p>}
        </div>
        <button
          type="button"
          onClick={onView}
          style={{
            position: "absolute",
            bottom: "14px",
            left: "14px",
            width: "calc(100% - 28px)",
            marginTop: 0,
          }}
        >
          View
        </button>
    </div>
  )
}

export default Card
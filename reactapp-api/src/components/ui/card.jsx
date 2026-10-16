import React  from "react";
import './card.css';

const Card = ({ title, description, imageUrl }) => {

  return (
    <div className="card">  
        <img src={imageUrl} alt={title} className="cardimage" />
        <div className="card-content">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            
        </div>
    </div>
  )
}

export default Card
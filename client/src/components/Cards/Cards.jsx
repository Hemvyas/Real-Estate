import React from 'react'
import "./Cards.css"
import { useNavigate } from 'react-router-dom';
import Like from '../Like/Like';
const Cards = ({card}) => {
  const navigate=useNavigate();
  return (
    <>
      <div
        className="card flexColStart"
        onClick={() => navigate(`/residency/${card._id}`)}
      >
        <img src={card.image} alt="property" />
        <Like id={card?.id} />
        <span className="secondarytext price">
          <span style={{ color: "orange" }}>$</span>
          <span>{card.price}</span>
        </span>
        <span className="primaryText">{card.name}</span>
        {card.desc.length > 100
          ? `${card.desc.substring(0, 30)}...`
          : card.desc}
      </div>
    </>
  );
}

export default Cards
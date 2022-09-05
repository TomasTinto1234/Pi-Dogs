import React from "react";
import "./Card.css";


export default function Card({name,image,weightMin,weightMax,temperament, breeds}) {

  return (
    <div className="card-container">
        <div className="card.boton">
             </div>
          <div className="card">
        <div className="card-image">
          <img
            src={
              image
                ? image
                : "https://static.wixstatic.com/media/16fbb1_66e6f7d8ae444a88a34f96b90b9d2d8c~mv2.png/v1/fill/w_700,h_700,al_c/icon.png"
            }
            alt={`${image}`}
            width="200px"
              height="250px"
          />
        </div>
        <div className="card-text">
        <h2 className="stats">{name.toUpperCase()}</h2>
          <h3>
            Peso: {weightMin} - {weightMax} kg
          </h3>
          <h3> raza: {breeds? breeds : "Mixed"}</h3>
          <h3> Temperamentos: {temperament}</h3>
          <div></div>

        </div>
      </div>
    </div>
  );
}

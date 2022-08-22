import React from 'react';
import "./Card.css"

export default function Card ({name,image, weightMin, weightMax, temperament}){
    return (
        <div className="container">
        <div className="a-box">
                <div className="img-container">
                <div className="img-inner">
                    <div className="inner-skew" >
            <img src={image? image : "https://i.pinimg.com/originals/79/a4/b9/79a4b912377bcf73101684d62ea9590f.gif"} alt={`${name}`}  />
            </div>
            </div>
            </div>
<div className="text-container">

            <h2>{name.toUpperCase()}</h2>
            <h3>Peso: {weightMin} - {weightMax} kg</h3> 
            <div> Temperamentos: {temperament }</div>
</div>
        </div>
        </div>
    )
}
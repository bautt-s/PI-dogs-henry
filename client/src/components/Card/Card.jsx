import './Card.css'
import React from "react";
import { Link } from "react-router-dom";


const Card = ({id, name, image, weight, temperaments}) => {
    // cuando creo razas en la DB, vienen como array de obj. 
    // asi las paso a string :p 
    let aux = "";
    if (Array.isArray(temperaments)) {
        temperaments.forEach(t => aux += t.nombre + ", ");
        temperaments = aux.slice(0, -2);
    }

    return (
        <div className="container">
            <div className="gradientBorder"></div>

            <Link className="card" to={"/dogs/" + id} style={{ textDecoration: 'none' }}>

                <div className="wrapperImg">
                    <img className="imgDog" src={image} alt={name}/>
                </div>

                <div className="cardText">
                    <h2 className="cardTitle">{name}</h2>
                    <h4 className="cardSub">{weight} kg</h4>

                    <div className="temp-wrapper">
                        <p className="cardTemp">{temperaments}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}


export default Card;
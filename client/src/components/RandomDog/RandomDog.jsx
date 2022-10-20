import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './RandomDog.css';

const RandomDog = () => {   
    const dogs = useSelector(state => state.dogs);
    const ids = Array.isArray(dogs) && dogs.map(d => d.id);
    let randomID = ids[Math.floor(Math.random() * ids.length)];

    return (
        <div>
            <Link to={`/dogs/${randomID}`}>
                <button className="rndBut">Random Dog</button>
            </Link>
        </div>
    )
}

export default RandomDog;
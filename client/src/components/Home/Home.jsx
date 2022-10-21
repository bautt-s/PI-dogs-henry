import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../../redux/actions/actions.js"
import { Link } from 'react-router-dom';
import Filtros from "../Filtros/Filtros.jsx";
import Ordenamientos from "../Ordenamientos/Ordenamientos.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import RandomDog from "../RandomDog/RandomDog.jsx";
import Card from "../Card/Card.jsx";
import Paginado from "../Paginado/Paginado.jsx";
import Logo from '../../img/logo.png';
import LinkedIn from '../../img/linkedin.png';
import GitHub from '../../img/github.png';
import Loader from '../Loader/Loader.jsx';
import './Home.css';


const Home = () => {

    // paginado
    const [numMinPag, setMinNP] = useState(0); 
    const [numMaxPag, setMaxNP] = useState(5); 
    const [pagActual, setPagActual] = useState(1);
    const [perrosPorPag, setPerrosPorPag] = useState(8); 
    
    const indexUltDog = pagActual * perrosPorPag;  
    const indexPrimerDog = indexUltDog - perrosPorPag; 

    // selectores diversos
    const dispatch = useDispatch();
    const [order, setOrder] = useState(""); 
    const dogs = useSelector(state => state.dogs);  
    
    let dogsMostrados = undefined;
    if (Array.isArray(dogs)) dogsMostrados = dogs.slice(indexPrimerDog, indexUltDog); 

    // refs de los select box
    const temperBox = useRef();
    const createdBox = useRef();
    const sortingBox = useRef();


    const paginado = (numPag) => {
        setPagActual(numPag);

        let modifier = 0;
        if (numPag >= numMaxPag) modifier = 4;
        else if (numPag <= numMinPag + 1 && numPag !== 1) modifier = -4;

        if (modifier) {
            setMinNP(numMinPag + modifier);
            setMaxNP(numMaxPag + modifier);
        }
    };


    const handleClear = () => {
        dispatch(getDogs());
        setOrder("");  
        
        createdBox.current.selectedIndex = 0;
        temperBox.current.selectedIndex = 0;
        sortingBox.current.selectedIndex = 0;
    }


    useEffect(() => {
        ! dogs.length && dispatch(getDogs());
        dispatch(getTemperaments());
      }, [dispatch]);
    

    return (
        <div className="home">
            {console.log(dogsMostrados)}

            <div className="navBg">
                <span className="isotipo">Fetch Pups</span>


                <div className="ordFilter">
                    <div className="wrap1">
                        <Filtros setMinNP={setMinNP} setMaxNP={setMaxNP} setPagActual={setPagActual} temperBox={temperBox} createdBox={createdBox} />
                    </div>

                    <div className="wrap4">
                        <div className="wrap2">
                            <Ordenamientos setMinNP={setMinNP} setMaxNP={setMaxNP} setPagActual={setPagActual} setOrder={setOrder} sortingBox={sortingBox} />
                        </div>

                        <div className="wrap3">
                            <button className="clearFilter" onClick={handleClear}>Clear Filter</button>
                        </div>
                    </div>

                </div>


                <div className="rightNav">
                    <div className="homeRnd">
                        <RandomDog />
                    </div>

                    <div className="search"> 
                        <SearchBar setMinNP={setMinNP} setMaxNP={setMaxNP} setPagActual={setPagActual} />
                    </div>                 
                </div>
                
                <img className="logo" src={Logo} alt="logoPerro"/>
            </div> 


            <div className="selectorPaginas">
                <Paginado
                    pagActual={pagActual}
                    numMinPag={numMinPag}
                    numMaxPag={numMaxPag}
                    perrosPorPag={perrosPorPag}
                    paginado={paginado}
                    dogs={Array.isArray(dogs) ? dogs.length : 1}
                />
            </div>


            <div className="containerDogs">
                {Array.isArray(dogs) ? (dogsMostrados.length ? dogsMostrados.map(dog => {
                    return (
                        <Card 
                            id = {dog.id}
                            key = {dog.id}
                            name = {dog.nombre}
                            image = {dog.image}
                            weight = {dog.peso}
                            temperaments = {dog.temperaments}
                        />
                    );
                }) : <Loader />) : <div className="home404">{dogs.msg}</div>}
            </div>


            <div className="createDog">
                <Link to="/creator">
                    <button>Create new breed</button>
                </Link>
            </div>


            <div className="footer">
                <div className="credits">
                    <ul>
                        <li>
                            <a className="bau" href="/about">Bautista Sánchez, 2022</a>
                        </li>
                        <li>
                            <ul>
                                <li>•</li>
                            </ul>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/baut-s/"><img width="30" height="30"src={LinkedIn}/></a>
                        </li>
                        <li>
                            <ul>
                                <li>•</li>
                            </ul>
                        </li>
                        <li>
                            <a href="https://github.com/bautt-s"><img width="30" height="30" src={GitHub}/></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home;
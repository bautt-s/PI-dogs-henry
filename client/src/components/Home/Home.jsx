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
    const [numMinPag, setMinNP] = useState(0);           // setea el display min de num pag
    const [numMaxPag, setMaxNP] = useState(5);           // setea el display max de num pag
    const [pagActual, setPagActual] = useState(1);       // setea el display de num pag actual
    const [perrosPorPag, setPerrosPorPag] = useState(8); // setea la cantidad de perros por pag
    
    const indexUltDog = pagActual * perrosPorPag;        // obtiene el index del último dog mostrado en el array de dogs totales
    const indexPrimerDog = indexUltDog - perrosPorPag;   // obtiene el index del primer dog mostrado en el array de dogs totales

    // selectores diversos
    const dispatch = useDispatch();                      // se extrae el dispatch para las actions
    const [order, setOrder] = useState("");              // éste state sólo sirve para re-renderizar el display luego de aplicar un ordenamiento
    const dogs = useSelector(state => state.dogs);       // se extrae el array de dogs desde el store
    
    let dogsMostrados = undefined;
    if (Array.isArray(dogs)) dogsMostrados = dogs.slice(indexPrimerDog, indexUltDog); // se obtienen los dogs a mostrar

    const temperBox = useRef();  // select box - filtro temperamentos
    const createdBox = useRef(); // select box - filtro creados
    const sortingBox = useRef(); // select box - ordenamientos

    // función que setea y cambia los displays de las páginas
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

    // onClick del botón "clearFilter"
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
                        <SearchBar setMinNP={setMinNP} setMaxNP={setMaxNP} setPagActual={setPagActual} dogsMostrados={dogsMostrados} />
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
                            <a href="https://www.linkedin.com/in/baut-s/"><img width="30" height="30" src={LinkedIn} alt="linkedin"/></a>
                        </li>
                        <li>
                            <ul>
                                <li>•</li>
                            </ul>
                        </li>
                        <li>
                            <a href="https://github.com/bautt-s"><img width="30" height="30" src={GitHub} alt="github"/></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home;
import React, { useState, useEffect } from 'react';
import { createDogs, getTemperaments, getDogs } from "../../redux/actions/actions.js";
import { useDispatch, useSelector } from "react-redux";
import IconArrow from '../Detail/IconArrow';
import { Link } from "react-router-dom";
import Logo from '../../img/logo.png';
import LinkedIn from '../../img/linkedin.png';
import GitHub from '../../img/github.png';
import './Creator.css'



// validador de errores de los inputs
// a.k.a. IF HELL
const validateText = (input) => {
    const err = {};
  
    if (! input.nombre) err.nombre = "Name is a required field!";
    else if (input.nombre.length > 40) err.nombre = "Name must be under 40 characters.";
  
    if (! input.altMin) err.altMin = 'You must provide a minimum height!'
    else if (input.altMin < 5) err.altMin = "Come on, no dog is less than 5cm...";
    else if (isNaN(input.altMin)) err.altMin = "Minimum height must be a number.";
  
    if (! input.altMax) err.altMax = 'You must provide a maximum height!'
    else if (input.altMax > 70) err.altMax = "Your dog cannot be THAT huge";
    else if (isNaN(input.altMax)) err.altMax = "Maximum height must be a number.";
  
    if (input.altMin && input.altMax && parseInt(input.altMin) >= parseInt(input.altMax)) err.altMax = 'Maximum height must be bigger than minimum.'
  
    if (! input.pesoMin) err.pesoMin = "You must provide a minimum weight!";
    else if (input.pesoMin < 1) err.pesoMin = "The breed must weigh more than 1kg.";
    else if (isNaN(input.pesoMin)) err.pesoMin = "Minimum weight must be a number.";
    
    if (! input.pesoMax) err.pesoMax = "You must provide a maximum weight!";
    else if (input.pesoMax > 120) err.pesoMax = "The breed must be lighter than 120kg.";
    else if (isNaN(input.pesoMax)) err.pesoMax = "Maximum weight must be a number.";
    
    if (input.pesoMin && input.pesoMax && parseInt(input.pesoMin) >= parseInt(input.pesoMax)) err.pesoMax = 'Maximum weight should be bigger than minimum.'
  
    if (input.lifetimeMin && input.lifetimeMin < 3) err.lifetimeMin = "Minimum life span should be bigger than 3 years.";
    else if (input.lifetimeMin && isNaN(input.lifetimeMin)) err.lifetimeMin = "Minimum life span must be a number.";
  
    if (input.lifetimeMax && input.lifetimeMax > 30) err.lifetimeMax = "Maximum life span should be smaller than 30 years.";
    else if (input.lifetimeMax && isNaN(input.lifetimeMax)) err.lifetimeMax = "Maximum life span must be a number.";
  
    if (input.lifetimeMin && ! input.lifetimeMax) err.lifetimeMin = 'Both life spans must be provided!';
    if (! input.lifetimeMin && input.lifetimeMax) err.lifetimeMax = 'Both life spans must be provided!';
    
    if (input.lifetimeMin && input.lifetimeMax && parseInt(input.lifetimeMin) >= parseInt(input.lifetimeMax)) err.life_span_max = 'Maximum life span should be bigger than minimum.'
  
    return err;
};



const Creator = () => {
    // dispatch importado
    const dispatch = useDispatch();

    // obtengo el array de temperamentos y el de perros desde redux
    const temperamentsState = useSelector(state => state.temperaments);
    const dogs = useSelector(state => state.dogs);
    const grupos = Array.from(new Set(dogs.map(d => d.grupo)));
    const funciones = Array.from(new Set(dogs.map(d => d.funcion)));

    // tracker de la temperatura de la DB, errores y el estado de los inputs
    const [temperaturaDB, setTempDB] = useState([]);
    const [errors, setErrors] = useState({});
    const [iniciado, setIniciado] = useState(true);
    const [input, setInput] = useState({
        nombre: '',
        pesoMin: '',
        pesoMax: '',
        altMin: '',
        altMax: '',
        imagen: '',
        lifetimeMin: '',
        lifetimeMax: '',
        temperaments: [],
        breedFor: [],
        breedGroup: []
    });


    // get a los temperaments
    useEffect(() => {
        dispatch(getTemperaments())
        dispatch(getDogs())
    }, [dispatch]);


    // handler del submit
    // si no hay errores en los campos obligatorios, reinicia el estado de
    // los inputs, crea una variable para la nueva raza, y la manda por dispatch.
    const handleSubmit = e => {
        e.preventDefault();
        if (! errors.nombre && ! errors.pesoMin && ! errors.pesoMax && ! errors.altMin 
            && ! errors.altMax && ! errors.imagen && ! errors.lifetimeMin && ! errors.lifetimeMax) {

            const newDog = {
                ...input,
                nombre: input.nombre.trim(),
                image: input.imagen.trim(),
                temperaments: temperaturaDB
            };

            dispatch(createDogs(newDog));
    
            setTempDB([]);
            setInput({
                nombre: "",
                pesoMin: "",
                pesoMax: "",
                altMin: "",
                altMax: "",
                imagen: "",
                lifetimeMin: "",
                lifetimeMax: "",
                temperaments: [],
                funcion: [],
                grupo: [],
            });     
        } 
    }


    // grupo de handlers varios (cambios, selección y remoción de breed en db)
    const handleChange = (e) => {
        setIniciado(false);
        setInput({...input, [e.target.name]: e.target.value});
        setErrors(validateText({...input, [e.target.name]: e.target.value}));
    }
      
    const handleSelect = (e) => {
        (! temperaturaDB.includes(e.target.value)) && setTempDB([...temperaturaDB, e.target.value]);
    }
    
    const handleDelete = (e) => {
        e.preventDefault();
        setTempDB(temperaturaDB.filter(t => t !== e.target.value));
    }


    return (
        <div className="containerCreator">
            <div className="creatorNav">
                <div className="returnWrapper">
                    <Link to="/home" className="returnCreator">
                        <IconArrow />
                        <p>Return</p>
                    </Link>
                </div>
                
                <div className="logoCreator">
                    <img src={Logo} alt="logoPerro"/>
                </div>
            </div>


            <div className="creatorMenu">
                <h1 className="creatorTitle">Submit a Breed</h1>
                <p className="requiredSub">Underlined fields are required.</p>

                <div className="allFields">
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="areaInicio">
                            <div className="firstLabels">
                                <label className="createLabel must">Name:</label>
                                <label className="createLabel must">Height:</label>
                                <label className="createLabel must">Weight:</label>
                                <label className="createLabel must">Life span:</label>
                            </div>

                            <div className="firstFields">
                                <input className="createField nameInput" name="nombre" type="text" value={input.nombre} onChange={handleChange} placeholder="Breed name" />
                                <div className="wrapperDual">
                                    <input className="createField" name="altMin" type="text" value={input.altMin} onChange={handleChange} placeholder="Min. height" />
                                    <input className="createField classMax" name="altMax" type="text" value={input.altMax} onChange={handleChange} placeholder="Max. height" />
                                </div>
                                <div className="wrapperDual">
                                    <input className="createField" name="pesoMin" type="text" value={input.pesoMin} onChange={handleChange} placeholder="Min. weight" />
                                    <input className="createField classMax" name="pesoMax" type="text" value={input.pesoMax} onChange={handleChange} placeholder="Max. weight" />
                                </div>
                                <div className="wrapperDual">
                                    <input className="createField" name="lifetimeMin" type="text" value={input.lifetimeMin} onChange={handleChange} placeholder="Min. lifetime" />  
                                    <input className="createField classMax" name="lifetimeMax" type="text" value={input.lifetimeMax} onChange={handleChange} placeholder="Max. lifetime" />
                                </div> 
                            </div>
                        </div>

                        <div className="areaOpcional">
                            <div className="opLabels">
                                <label className="createLabel">Image:</label>
                                <label className="createLabel pseudoLbl">Group:</label>
                                <label className="createLabel pseudoLbl">Breed for:</label>
                                <label className="createLabel pseudoLbl tempLbl">Temperaments:</label>
                                <label className="createLabel pseudoLbl hiddenLbl">Temps:</label>
                            </div>

                            <div className="opFields">
                                <input className="createField imageField" name="imagen" type="text" value={input.imagen} onChange={handleChange} placeholder="Insert URL" />

                                <select className="createBox" defaultValue='default' name="grupo" onChange={handleChange}>
                                    <option value="default" disabled>Breed group:</option>
                                    { grupos.length ? grupos.map(el => ( 
                                        el ? <option key={el} value={el}>
                                            {el}
                                        </option> : null
                                    )) : null }
                                </select>

                                <select className="createBox" defaultValue='default' name="funcion" onChange={handleChange}>
                                    <option value="default" disabled>Breed for:</option>
                                    { funciones.length ? funciones.map(el => ( 
                                        el ? <option key={el} value={el}>
                                            {el}
                                        </option> : null
                                    )) : null }
                                </select>

                                <select className="createBox" defaultValue='default' onChange={handleSelect}>
                                    <option value="default" disabled>Temperament:</option>
                                    { temperamentsState.length ? temperamentsState.map(t => (
                                        <option key={t.id} value={t.nombre}>
                                            {t.nombre}
                                        </option>
                                    )) : null }
                                </select>
                            </div>
                        </div>

                        <ul className="selectedTemps">
                            {temperaturaDB.map((temp, id)=> (
                                <li className="selTempItem" key={id}>
                                    <button className="deleteSelectedTemp" value={temp} onClick={e => handleDelete(e)}>x</button>
                                    {temp}       
                                </li>
                            ))}
                        </ul>

                        <div className="breedButton">
                            <button className={Object.keys(errors).length || iniciado ? "breedSubmit submitDisabled" : "breedSubmit"} type="submit">Create Breed</button>
                        </div>
                    </form>
                </div>

                {Object.keys(errors).length 
                ? <ul className="inputErrors">
                    {Object.keys(errors).map(e => {
                        return <li className="errorItem">{errors[e]}</li>
                    })}
                </ul> : null}
                
            </div>


            <div className="footerCreator">
                <div className="creditsCreator">
                    <ul>
                        <li>
                            <a className="bau" href="#">Bautista Sánchez, 2022</a>
                        </li>
                        <li>•</li>
                        <li>
                            <a className="creatorFootWrap" href="https://www.linkedin.com/in/baut-s/"><img width="30" height="30"src={LinkedIn}/></a>
                        </li>
                        <li>•</li>
                        <li>
                            <a className="creatorFootWrap" href="https://github.com/bautt-s"><img width="30" height="30" src={GitHub}/></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Creator;
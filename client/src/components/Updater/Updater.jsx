import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDog, getTemperaments, getDogs } from "../../redux/actions/actions.js";
import './Updater.css'


const validateText = (input) => {
    const err = {};

    if (input.nombre.length > 40) err.nombre = "Name must be under 40 characters.";

    if (input.altMin && input.altMin < 5) err.altMin = "Come on, no dog is less than 5cm...";
    else if (isNaN(input.altMin)) err.altMin = "Minimum height must be a number.";

    if (input.altMax > 70) err.altMax = "Your dog cannot be THAT huge";
    else if (isNaN(input.altMax)) err.altMax = "Maximum height must be a number.";

    if (input.altMin && ! input.altMax) err.altMax = 'Both heights must be provided!';
    else if (! input.altMin && input.altMax) err.altMin = 'Both heights must be provided!';
    else if (input.altMin && input.altMax && parseInt(input.altMin) >= parseInt(input.altMax)) err.altMax = 'Maximum height must be bigger than minimum.'

    if (input.pesoMin && input.pesoMin < 1) err.pesoMin = "The breed must weigh more than 1kg.";
    else if (isNaN(input.pesoMin)) err.pesoMin = "Minimum weight must be a number.";

    if (input.pesoMax > 120) err.pesoMax = "The breed must be lighter than 120kg.";
    else if (isNaN(input.pesoMax)) err.pesoMax = "Maximum weight must be a number.";

    if (input.pesoMin && ! input.pesoMax) err.pesoMax = 'Both weights must be provided!';
    else if (! input.pesoMin && input.pesoMax) err.pesoMin = 'Both weights must be provided!';
    else if (input.pesoMin && input.pesoMax && parseInt(input.pesoMin) >= parseInt(input.pesoMax)) err.pesoMax = 'Maximum weight must be bigger than minimum.'

    if (input.lifetimeMin && input.lifetimeMin < 3) err.lifetimeMin = "Minimum life span must be bigger than 3 years.";
    else if (input.lifetimeMin && isNaN(input.lifetimeMin)) err.lifetimeMin = "Minimum life span must be a number.";
  
    if (input.lifetimeMax && input.lifetimeMax > 30) err.lifetimeMax = "Maximum life span must be smaller than 30 years.";
    else if (input.lifetimeMax && isNaN(input.lifetimeMax)) err.lifetimeMax = "Maximum life span must be a number.";
  
    if (input.lifetimeMin && ! input.lifetimeMax) err.lifetimeMin = 'Both life spans must be provided!';
    if (! input.lifetimeMin && input.lifetimeMax) err.lifetimeMax = 'Both life spans must be provided!';

    if (input.lifetimeMin && input.lifetimeMax && parseInt(input.lifetimeMin) >= parseInt(input.lifetimeMax)) err.life_span_max = 'Maximum life span must be bigger than minimum.'

    return err;
}


const Updater = ({ id, setShowUpdater }) => {
    const dispatch = useDispatch();

    // obtengo el array de temperamentos y el de perros desde redux
    const temperamentsState = useSelector(state => state.temperaments);
    const dogs = useSelector(state => state.dogs);

    // elementos de los dropdown menu
    const funciones = Array.from(new Set(dogs.map(d => d.funcion)));
    const grupos = Array.from(new Set(dogs.map(d => d.grupo)));

    // tracker de temperamentos de la DB, errores y el estado de los inputs
    const [temperamentosDB, setTempDB] = useState([]);
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

    useEffect(() => {
        dispatch(getTemperaments())
        dispatch(getDogs())
    }, [dispatch]);


    const handleClose = () => setShowUpdater(false);

    const handleSubmit = e => {
        e.preventDefault();
        if (! errors.nombre && ! errors.pesoMin && ! errors.pesoMax && ! errors.altMin 
            && ! errors.altMax && ! errors.lifetimeMin && ! errors.lifetimeMax) {

            const modifiedDog = {
                ...input,
                nombre: input.nombre.trim(),
                imagen: input.imagen.length ? input.imagen.trim() : undefined,
                temperaments: temperamentosDB
            };

            dispatch(updateDog(id, modifiedDog))
            .then(res => alert(res.payload))
    
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
        (! temperamentosDB.includes(e.target.value)) && setTempDB([...temperamentosDB, e.target.value]);
    }
    
    const handleDelete = (e) => {
        e.preventDefault();
        setTempDB(temperamentosDB.filter(t => t !== e.target.value));
    }

    return (
        <div className="updaterBackground">
            <div className="updaterAlign">
                <div className="updaterBody">
                    <button className="closeUpdater" onClick={handleClose}>X</button>
                    <h1 className="updaterTitle">Update this Breed</h1>

                    <form className="updaterFields" onSubmit={e => handleSubmit(e)}>

                        <div className="areaInicio">
                            <div className="firstLabels">
                                <label style={{color: 'white'}} className="createLabel">Name:</label>
                                <label style={{color: 'white'}} className="createLabel">Height:</label>
                                <label style={{color: 'white'}} className="createLabel">Weight:</label>
                                <label style={{color: 'white'}} className="createLabel">Life span:</label>
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
                                <label style={{color: 'white'}} className="createLabel">Image:</label>
                                <label style={{color: 'white'}} className="createLabel pseudoLbl">Group:</label>
                                <label style={{color: 'white'}} className="createLabel pseudoLbl">Breed for:</label>
                                <label style={{color: 'white'}} className="createLabel pseudoLbl tempLbl">Temperaments:</label>
                                <label style={{color: 'white'}} className="createLabel pseudoLbl hiddenLbl">Temps:</label>
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
                            {temperamentosDB.map((temp, id)=> (
                                <li className="updTempItem" key={id}>
                                    <button className="deleteSelectedTemp" value={temp} onClick={e => handleDelete(e)}>x</button>
                                    {temp}       
                                </li>
                            ))}
                        </ul>

                        <div>
                            <button className={Object.keys(errors).length || iniciado ? "breedUpdate updateDisabled" : "breedUpdate"} type="submit">Update</button>
                        </div>                    
                    </form>

                    {Object.keys(errors).length 
                    ? <ul className="inputErrors">
                        {Object.keys(errors).map(e => {
                            return <li className="errorItem">{errors[e]}</li>
                        })}
                    </ul> : null}

                </div> 
            </div>
        </div>
    )
}

export default Updater;
import React, { useEffect, useState } from "react";
import { getById, clearDetail, getDogs, deleteDog } from '../../redux/actions/actions.js'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory  } from "react-router-dom";
import RandomDog from "../RandomDog/RandomDog.jsx";
import Updater from "../Updater/Updater.jsx";
import Loader from "../Loader/Loader.jsx";
import Logo from '../../img/logo.png';
import LinkedIn from '../../img/linkedin.png';
import GitHub from '../../img/github.png';
import IconArrow from './IconArrow'
import './Detail.css'

const Detail = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const details = useSelector(state => state.details);
    const dogs = useSelector(state => state.dogs);
    const [showUpdater, setShowUpdater] = useState(false); 

    const handleDelete = async () => {
        const res = await dispatch(deleteDog(id))
        alert(res.payload);
        history.push('/home');
        setTimeout(() => window.location.reload(), 1000);
    }

    const handleUpdate = () => {
        setShowUpdater(true);
    }

    useEffect(() => {
        dispatch(getById(id));
        dispatch(clearDetail());
    }, [dispatch, id]);


    useEffect(() => {
        ! dogs.length && dispatch(getDogs())
    }, [dispatch, dogs]);


    return (
        <div className="detail">
            <div className="detNav">
                <div className="detWrapperReturn">
                    <Link to="/home" className="return">
                        <IconArrow />
                        <p>Return</p>
                    </Link>
                </div>

                <div className="logoDet">
                    <img src={Logo} alt="logoPerro"/>
                </div>
                
                <div className="randomDet">
                    <RandomDog />
                </div>
            </div>
           
            { Object.keys(details).length && typeof details !== 'string' ? (
                <div className="detailBody">
                    <div className="detVisual">
                        <h1 className="detTitulo pseudoTitle1">{details.nombre}</h1>
                        <img src={details.image} alt={details.nombre + ' img'} /> 
                        {details.funcion || details.grupo ? (
                            <div className="adicional">
                                {details.funcion ? <p className="subtitleImg">This dog is specifically bred for {details.funcion}.</p> : null}
                                {details.grupo ? <p className="subtitleImg">Its breed belongs to the group of {details.grupo}.</p> : null}
                                {(! details.funcion || ! details.grupo) ? <p className="fake">invisible line so css doesnt mess up :D</p> : null}
                            </div>
                        ) : null}
                    </div>

                    <div className="detDescripcion">
                        <div className="detText">
                            <h1 className={(details.nombre.length > 20) ? "detTituloGrande pseudoTitle2" : "detTitulo pseudoTitle2"}>{details.nombre}</h1>
                            <div className="itemDet"><span className="detCat">Height: </span><p className="holder">{details.altura} cm</p></div>
                            <div className="itemDet"><span className="detCat">Weight: </span><p className="holder">{details.peso} kg</p></div>
                            {details.lifetime && details.lifetime[0] !== ' ' ? <div className="itemDet"><span className="detCat">Life span: </span><p className="holder">{details.lifetime}</p></div> : null}
                        </div>

                        <div className="detTemps">
                            {/* dogs api */}
                            {
                                typeof details.temperaments === 'string' && details.temperaments.length
                                ? (details.temperaments.length ? <div><p className="temp">{details.temperaments}</p></div> : null)
                                : null
                            }
                            {/* dogs creados en la db */}
                            {
                                Array.isArray(details.temperaments) && details.temperaments.length
                                ? <div><p className="temp">{details.temperaments.map(t => Object.values(t)).join(', ')}.</p></div>
                                : null
                            }
                        </div>
                    </div>

                    {(typeof details.id === 'string') ? details.id.includes("-") &&
                    <div className="buttonsWrapper">
                        <button className="updateButton" onClick={handleUpdate}>Update</button>
                        <button className="deleteButton" onClick={handleDelete}>Delete</button>
                    </div> : null}
                </div>

                
            ) : (
                Array.isArray(details) 
                ? <div className="loaderDetail"><Loader /></div>
                : <div className="detail404">
                    <div className="404msj">
                        <h1>{details}</h1>
                    </div>
                </div>
            )}


            {showUpdater && <div className="updaterWindow">
                <Updater id={id} setShowUpdater={setShowUpdater} />
            </div>}


            <div className="footerDet">
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

export default Detail;
import React, { useEffect } from "react";
import { getById, clearDetail, getDogs, deleteDog } from '../../redux/actions/actions.js'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory  } from "react-router-dom";
import RandomDog from "../RandomDog/RandomDog.jsx";
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

    const handleDelete = () => {
        dispatch(deleteDog(id));
        history.push('/home');
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
                                {(! details.funcion || ! details.grupo) ? <p className="fake">this is a filler line lol</p> : null}
                            </div>
                        ) : null}
                    </div>

                    <div className="detDescripcion">
                        <div className="detText">
                            <h1 className="detTitulo pseudoTitle2">{details.nombre}</h1>
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

                    <div className="deleteWrapper">
                        {(typeof details.id === 'string') ? details.id.includes("-") && <button className="deleteButton" onClick={handleDelete}>Delete</button> : null}
                    </div>
                </div>

                
            ) : (
                Array.isArray(details) 
                ? <Loader className="loader"/>
                : <div className="detail404">
                    <div className="404msj">
                        <h1>{details}</h1>
                    </div>
                </div>
            )}


            <div className="footerDet">
                <div className="credits">
                    <ul>
                        <li>
                            <a className="bau" href="#">Bautista Sánchez, 2022</a>
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

export default Detail;
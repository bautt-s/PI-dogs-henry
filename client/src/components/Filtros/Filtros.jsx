import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTemperament, filterCreated } from "../../redux/actions/actions.js"
import './Filtros.css'

function Filtros({ setMinNP, setMaxNP, setPagActual, temperBox, createdBox }) {
    const temperamentsState = useSelector(state => state.temperaments)

    const dispatch = useDispatch();
    
    const handleFiltroCreados = (e) => {
      setPagActual(1);
      setMinNP(0);
      setMaxNP(5);
      dispatch(filterCreated(e.target.value));
    }
    
    const handleFiltroTemp = (e) => {
      setPagActual(1);
      setMinNP(0);
      setMaxNP(5);
      dispatch(filterByTemperament(e.target.value));
    }

    return (
      <div className="container-filtros">
        <div className="fields">
          <select className="fieldTemp" defaultValue='default' onChange={e => handleFiltroTemp(e)} ref={temperBox}>
            <option value="default" disabled>Temperament:</option>
            <option key={0} value="all">All</option>

            { temperamentsState.length ? temperamentsState.map(t => (
                <option key={t.id} value={t.nombre}>
                  {t.nombre}
                </option>
              ))
            : null }

          </select>

        
          <select className="fieldCr" defaultValue='default' onChange={e => handleFiltroCreados(e)} ref={createdBox}>
            <option value="default" disabled>Creation:</option>
            <option value="all">All dogs</option>
            <option value="created">Created</option>
            <option value="api">API</option>
          </select>
        </div>
      </div>
  );
}

export default Filtros;
import React from "react";
import { useDispatch } from "react-redux";
import { sortByName, sortByWeight } from "../../redux/actions/actions.js"
import './Ordenamientos.css'

function Ordenamientos( {  setMinNP, setMaxNP, setPagActual, setOrder, sortingBox } ) {
    const dispatch = useDispatch();

    const handleSort = (e) => {
        if (e.target.value === 'asc' || e.target.value === 'desc') dispatch(sortByName(e.target.value));
        else if (e.target.value === 'menor' || e.target.value === 'mayor') dispatch(sortByWeight(e.target.value));

        setPagActual(1);
        setMinNP(0)
        setMaxNP(5)  
        setOrder(`sort by ${e.target.value}`);  
    }

    return (
        <div className="container-ordenamientos">
            <select className="fieldSort" defaultValue='default' onChange={handleSort} ref={sortingBox}>
                <option value="default" disabled>Sort by:</option>
                <option key={0} value="asc">Name (A-Z)</option>
                <option key={1} value="desc">Name (Z-A)</option>
                <option key={2} value="menor">Weight (asc)</option>
                <option key={3} value="mayor">Weight (desc)</option>
            </select>
        </div>
    );
}

export default Ordenamientos;
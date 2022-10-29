import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName, getDogs } from "../../redux/actions/actions.js"
import "./SearchBar.css";
import Lupa from '../../img/lupa.png';

const SearchBar = ({ setMinNP, setMaxNP, setPagActual }) => {
    const [searchInput, setSearchInput] = useState("");
    const dispatch = useDispatch();

    const handleChange = e => setSearchInput(e.target.value);

    const handleSearch = e => {
        e.preventDefault();
        if (! searchInput) dispatch(getDogs());
        else {
            dispatch(getByName(searchInput.trim().toLowerCase()));

            setPagActual(1);
            setMinNP(0);
            setMaxNP(5);
            setSearchInput("");
        }
    }

    return (
        <div className="wrapperSearch">
            <form name="search">
                <input className="searchInput" type="text" placeholder="Search by breed..." name="search" onChange={e => handleChange(e)}/>
                <button className="searchSubmit" type="submit" onClick={e => handleSearch(e)}>
                    <img src={Lupa} alt="lupa"/>
                </button>
            </form>
        </div>
    )
}

export default SearchBar;
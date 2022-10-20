import axios from 'axios';


export function getDogs() {
    return async function(dispatch) {
        return await axios.get('https://dogs-backend-bautts.herokuapp.com/dogs')
        .then(res => {
            dispatch({
                type: 'GET_DOGS',
                payload: res.data
            })
        });
    };
}


export function getTemperaments() {
    return async function(dispatch) {
        return await axios.get('https://dogs-backend-bautts.herokuapp.com/temperaments')
        .then(res => {
            dispatch({
                type: 'GET_TEMPERAMENTS',
                payload: res.data
            })
        });
    };
}


export function getByName(name) {
    return async function(dispatch) {
        try {
            return await axios.get(`https://dogs-backend-bautts.herokuapp.com/dogs?name=${name}`)
            .then(res => {
                dispatch({
                    type: 'GET_BY_NAME',
                    payload: res.data
                })
            });
        } catch (err) {
            dispatch({
                type: 'GET_BY_NAME',
                payload: err.response.data
            })
        }
    };
}


export function getById(id) {
    return async function(dispatch) {
        try {
            return await axios.get(`https://dogs-backend-bautts.herokuapp.com/dogs/${id}`)
            .then(res => {
                dispatch({
                    type: 'GET_BY_ID',
                    payload: res.data
                })
            });
        } catch (err) {
            dispatch({
                type: 'GET_BY_ID',
                payload: err.response.data
            })
        }
    };
}


export function clearDetail() {
    return {
        type: 'CLEAR_DETAIL'
    };
}


export function sortByName(payload) {
    return {
        type: 'SORT_BY_NAME',
        payload
    };
}


export function sortByWeight(payload) {
    return {
        type: 'SORT_BY_WEIGHT',
        payload
    };
}


export function filterByTemperament(payload) {
    return {
        type: 'SORT_BY_TEMPERAMENT',
        payload
    };
}


export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    };
}


export function createDogs(payload) {
    return async function(dispatch) {
        let res = await axios.post('https://dogs-backend-bautts.herokuapp.com/dogs/', payload);
        return (dispatch({
            type: 'CREATE_DOG',
            payload: res.data
        }));
    };
}


export function deleteDog(id) {
    return async function(dispatch) {
        let res = await axios.delete('https://dogs-backend-bautts.herokuapp.com/dogs/' + id);
        return (dispatch({
            type: 'DELETE_DOG',
            payload: res.data
        }));
    };
}
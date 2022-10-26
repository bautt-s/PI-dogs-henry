// estado inicial de nuestro reducer.
// acá traigo la lista de las razas, los temperamentos, y los detalles (si se pidieron)
// dogsCopy es una copia de dogs. sobre esta se hacen los filtros (para evitar problemas con array ya filtrado)

const initialState = {
    dogs: [],
    details: [],
    dogsCopy: [],
    temperaments: [],
};


function rootReducer(state = initialState, action) {
    switch (action.type) {

        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                dogsCopy: action.payload
            }


        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }


        case 'GET_BY_NAME':
            return {
                ...state,
                dogs: action.payload
            }


        case 'GET_BY_ID':
            return {
                ...state,
                details: action.payload
            }


        case 'CLEAR_DETAIL':
            return {
                ...state,
                details: []
            }


        case 'SORT_BY_NAME':
            if (state.dogs === 'Breed not found :(') return {...state}

            const nameSorted =
            action.payload === 'asc'
                ? state.dogs.sort((a, b) => {
                    if (a.nombre > b.nombre) return 1;
                    if (a.nombre < b.nombre) return -1;
                    return 0;
                })

                : state.dogs.sort((a, b) => {
                    if (a.nombre > b.nombre) return -1;
                    if (a.nombre < b.nombre) return 1;
                    return 0;
                })
            ;

            return {
                ...state,
                dogs: nameSorted
            };


        case 'SORT_BY_WEIGHT':
            if (state.dogs === 'Breed not found :(') return {...state}

            const pesoOrdenado =
            (action.payload === "menor")
                ? state.dogs.sort((a, b) => {
                    if (a.peso.includes('NaN')) {
                    return 1000;
                    } else {
                        if (parseInt(a.peso.split(' - ')[0]) > parseInt(b.peso.split(' - ')[0])) return 1;
                        if (parseInt(a.peso.split(' - ')[0]) < parseInt(b.peso.split(' - ')[0])) return -1;
                        return 0;
                    }
                })

                : state.dogs.sort((a, b) => {
                    if (a.peso.includes('NaN')) {
                    return 1000;
                    } else {
                        if (parseInt(a.peso.split(' - ')[0]) > parseInt(b.peso.split(' - ')[0])) return -1;
                        if (parseInt(a.peso.split(' - ')[0]) < parseInt(b.peso.split(' - ')[0])) return 1;
                        return 0;
                    }
                })
            ;

            return {
                ...state,
                dogs: pesoOrdenado
            };


        case 'SORT_BY_TEMPERAMENT':
            const allDogs = state.dogsCopy;
            const filterDog = (action.payload === 'all') ? allDogs : allDogs.filter(e => e.temperaments?.includes(action.payload));

            const filterDB = [];
            allDogs.forEach(e => {
                if (typeof e.id === 'string') {
                    e.temperaments.forEach(t => {
                        if (t.nombre === action.payload) filterDB.push(e);
                    })
                }
            });

            return {
                ...state,
                dogs: filterDog.concat(filterDB)
            };
        
        
        case 'FILTER_CREATED':
            const auxDogs = state.dogsCopy;

            let filterCreation = null;

            if (action.payload === 'api') filterCreation = auxDogs.filter(dog => ! isNaN(dog.id));
            else if (action.payload === 'created') filterCreation = auxDogs.filter(dog => isNaN(dog.id));
            else filterCreation = auxDogs;
            
            return {
                ...state,
                dogs: filterCreation
            }


        case "CREATE_DOG":
            return { ...state };


        case 'DELETE_DOG':
            return { ...state };

            
        case 'UPDATE_DOG':
            return { ...state }


        default:
            return { ...state };
    }

}


export default rootReducer;
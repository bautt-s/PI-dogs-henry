import { get } from "axios";
import { Dog, Temperaments } from "../db.js";
const { API_KEY, API_URL } = process.env;


// le pego a la API y transformo los datos
const dataApi = async () => {
    const apiDogs = await get(`${API_URL}?api_key=${API_KEY}`)
    const infoDogs = await apiDogs.data.map(dog => {
        return {
          id: dog.id,
          nombre: dog.name,
          altura: dog.height.metric,
          peso: dog.weight.metric,
          lifetime: dog.life_span,
          image: dog.image.url,
          temperaments: dog.temperament,
          funcion: dog.bred_for,
          grupo: dog.breed_group
        }
      });
    return infoDogs;
}


// traigo info de la DB
const dataDB = async () => {
    return await Dog.findAll({
      // se incluyen los datos del perro y sus temperamentos
      include: {
        model: Temperaments,
        attributes: ['nombre'],
        through: {
          attributes: []
        }
      }
    });
  }
  

// junto toda la data de la API y de la DB
const getAll = async () => {
    const infoDataApi = await dataApi();
    const infoDataDB = await dataDB();
    const allData = infoDataApi.concat(infoDataDB);
    return allData;
}
  
export default {
    dataApi,
    dataDB,
    getAll
}
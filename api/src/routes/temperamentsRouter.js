const express = require('express');
const router = express.Router();
const { Temperaments } = require("../db.js");
const { dataApi } = require('../controllers/controllers.js');

/* GET /temperaments:
    obtener todos los temperamentos posibles
    en una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí */

router.get('/', async (req, res) => {
    const infoApi = await dataApi();
    const temperaments = infoApi.map(dog => dog.temperaments).join().split(',');
    const temperamentsDB = temperaments.map(e => e.trim());

    // itero a través de los temperamentos de la API. 
    // busco cada uno, si no está en la DB, le crea una entrada.
    temperamentsDB.forEach(e => {
        if (e) {
            Temperaments.findOrCreate({
                where: {
                    nombre: e
                }
            });
        }
    });

    const allTemperaments = await Temperaments.findAll()
    res.status(200).send(allTemperaments)
});

module.exports = router;
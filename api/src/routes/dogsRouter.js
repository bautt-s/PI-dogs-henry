const express = require('express')
const router = express.Router()
const { Dog, Temperaments } = require("../db.js");
const { getAll } = require('../controllers/controllers.js');


/* GET /dogs: 
    obtiene listado de las razas de perro. 
    devuelve sólo los datos necesarios para la ruta principal. */

/* GET /dogs?name="...":
    obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
    si no existe ninguna raza de perro mostrar un mensaje adecuado */

router.get('/', async (req, res) => {
    const dogName = req.query.name;
    const allDogs = await getAll();

    if (dogName) {
        const queryDog = await allDogs.filter(raza => raza.nombre.toLowerCase().includes(dogName));
        queryDog.length ? res.status(200).send(queryDog) : res.status(404).json({msg: "Breed not found :("});
    } else {
        res.status(200).send(allDogs);
    }
});


/* GET /dogs/:idRaza: 
    obtener el detalle de una raza de perro en particular
    debe traer solo los datos pedidos en la ruta de detalle de raza de perro 
    incluir los temperamentos asociados */

router.get('/:idRaza', async (req, res) => {
    try {
        const id = req.params.idRaza;
        const allDogs = await getAll();
        if (id) {
            const idDog = await allDogs.find(dog => dog.id == id);
            idDog ? res.status(200).send(idDog) : res.status(404).json("Breed not found :(");
        }
    } catch (error) {
        res.status(400).json("Unexpected error in search for ID.");
    }
});


/* POST /dogs: 
    recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body 
    crea una raza de perro en la base de datos relacionada con sus temperamentos */

router.post('/', async (req, res) => {
    const { nombre, pesoMin, pesoMax, altMin, altMax, imagen, lifetimeMin, lifetimeMax, temperaments, funcion, grupo } = req.body;
    
    const repeatedName = await Dog.findAll({
        where: { nombre }
    });

    console.log(repeatedName)
    if (repeatedName) res.status(400).send("ERROR: Breed already exists.");
    else {
        try {
            if (nombre && pesoMin && pesoMax && altMin && altMax) {
        
                const newDog = await Dog.create({
                    nombre: nombre[0].toUpperCase() + nombre.slice(1), 
                    altura: `${altMin} - ${altMax}`, 
                    peso: `${pesoMin} - ${pesoMax}`, 
                    lifetime: lifetimeMin && lifetimeMax ? `${lifetimeMin} - ${lifetimeMax} years` : null,
                    image: imagen ? imagen : null, 
                    funcion: funcion ? funcion : null,
                    grupo: grupo ? grupo : null,
                    createdDB: true
                });
    
                temperaments.forEach(async e => {
                    const auxTemperamentos = await Temperaments.findAll({
                        where: { nombre: e }
                    });
                
                    await newDog.addTemperaments(auxTemperamentos[0]);
                });
    
                res.status(201).send("Dog created successfully.");
            } else {
                res.status(400).send("ERROR: Missing data.");
            }
        } catch (error) {
            res.status(400).send("ERROR: Unexpected error at database.");
        }   
    } 
});


/* DELETE /dogs: 
    recibe un id y borra de la db al perro que la contenga. está auto-controlado, dado que
    las únicas razas que tienen ese botón en su detalle, serán las creadas en la DB */

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      if (id) {
        const deleteDog = await Dog.findByPk(id);

        if (deleteDog) {
          await deleteDog.destroy()
          res.status(200).send('Dog was deleted successfully.')
        } else res.status(404).status("ERROR: ID could not be found.");

      } else res.status(400).send('ERROR: Unexpected error.');
    } catch (e) {
      res.status(400).send('ERROR: ID not properly typed.')
    }
});


module.exports = router;
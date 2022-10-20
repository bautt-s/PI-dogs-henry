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
        queryDog.length ? res.status(200).send(queryDog) : res.status(404).json({msg: "No se encontró el perro."});
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
            idDog ? res.status(200).send(idDog) : res.status(404).json("No se encontró el perro.");
        }
    } catch (error) {
        res.status(400).json("Hubo un error a la hora de buscar el ID.");
    }
});


/* POST /dogs: 
    recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body 
    crea una raza de perro en la base de datos relacionada con sus temperamentos */

router.post('/', async (req, res) => {
    try {
        const { nombre, pesoMin, pesoMax, altMin, altMax, imagen, lifetimeMin, lifetimeMax, temperaments, funcion, grupo } = req.body;

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
                    where: { nombre: e },
                    defaults: { nombre: e } 
                });

                await newDog.addTemperaments(auxTemperamentos[0]);
            });

            res.status(201).send("El perro se creó con éxito.");
        } else {
            res.status(400).send("Faltan datos.");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Hubo un error en el /post.");
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
          res.status(200).send('Se eliminó el perro.')
        } else res.status(404).status('No se encontró el ID del perro.');

      } else res.status(400).send('Hubo un error.');
    } catch (e) {
      res.status(400).send('La ID del perro no está bien tipada.')
    }
});


module.exports = router;
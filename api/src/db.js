require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

let sequelize = undefined;

// Heroku usa DATABASE_URL. Así que si el back lo inicia Heroku, Sequelize se inicia
// con la copia de la db que proveé Heroku, y su propia config.
// si el back no lo corre Heroku, sino que se corre localmente, usa la db y config local.
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:  false
  });
} else {
  sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`, {
  logging: false, // setear a console.log para ver las queries SQL
  native: false, // usa pg-native para ahorrar un ~30% de velocidad
})}

const basename = path.basename(__filename);

const modelDefiners = [];

// leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// en sequelize.models están todos los modelos importados como propiedades
// para relacionarlos hacemos un destructuring
const { Dog, Temperaments } = sequelize.models;

// relaciones entre los dos modelos
Dog.belongsToMany(Temperaments, { through: 'dog_temperaments', timestamps: false });
Temperaments.belongsToMany(Dog, { through: 'dog_temperaments', timestamps: false });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};

//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();

// syncea todos los modelos al mismo tiempo.
// Heroku usa una variable env PORT. si se corre el back en Heroku,
// se usa el puerto proveido por el servicio, y sino, el local (3001)
conn.sync({ alter: true }).then(() => {
  if (process.env.PORT) {
    server.listen(process.env.PORT, () => {
      console.log('%s listening at HEROKU PORT'); 
    });
  } else {
    server.listen(3001, () => {
      console.log('%s listening at 3001');
    });
  }
});

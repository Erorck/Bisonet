require('dotenv').config();
const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const {
  logErrors,
  boomErrorHandler,
  errorHandler,
} = require('./middlewares/error.handler');

const db = require('./db');
const { DBCONNECTION } = require('./const.json');
const app = express();
const port = process.env.PORT || 3000;

db(DBCONNECTION);

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

app.use(cors(options));
app.use(
  express.json(
    { extended: false } // permite codificar matrices y objetos enriquecidos en formato codificado en url
  )
);

app.use(express.static('./storage')); //Sacarlos Recursos estaticos de esta carpeta

routerApi(app); //Rutas de nuestras entidades
//Middlewares - Manejo de errores y validaciones
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Este es mi puerto ' + port);
});

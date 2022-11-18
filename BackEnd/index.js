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
const port = process.env.PORT;

db(DBCONNECTION);
app.use(cors());
app.use(express.json()); //Definir json como formato de datos
routerApi(app); //Rutas de nuestras entidades
//Middlewares - Manejo de errores y validaciones
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Este es mi puerto ' + port);
});

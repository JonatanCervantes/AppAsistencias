require('./config/config');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    exposedHeaders: 'Authorization',
};
app.use(cors(corsOptions));
app.use(express.json());

const uri = process.env.ATLAS_URI;
//LINEA DE CONEXION PARA BD LOCAL
//mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true})
//LINEA DE CONEXION PARA BD EN LA NUBE
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Conexion con la BD exitosa");
});

const usuariosRouter = require('./rutas/usuarios');
app.use('/usuarios', usuariosRouter);

const loginRouter = require('./rutas/login');
app.use('/login', loginRouter);

const registerRouter = require('./rutas/register');
app.use('/register', registerRouter);

const cursosRouter = require('./rutas/cursos');
app.use('/cursos', cursosRouter);

const gruposRouter = require('./rutas/grupos');
app.use('/grupos', gruposRouter);

const alumnosRouter = require('./rutas/alumnos');
app.use('/alumnos', alumnosRouter);

const asistenciasRouter = require('./rutas/asistencias');
app.use('/asistencias', asistenciasRouter);

app.listen(port, ()=>{
    console.log('Servidor corriendo en el puerto:' + port);
});
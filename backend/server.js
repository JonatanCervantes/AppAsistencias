const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Conexion con la BD exitosa");
});

const usuariosRouter = require('./rutas/usuarios');
app.use('/usuarios', usuariosRouter);

app.listen(port, ()=>{
    console.log('Servidor corriendo en el puerto:' + port);
});
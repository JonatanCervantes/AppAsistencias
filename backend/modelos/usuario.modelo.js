

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema  = new Schema({
    nombre: { type:String, required:true, unique:true, trim:true, minlength:4},
    contrasenia: { type:String, required:true, minlength:4},
}, {
    timestamps:true
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports =  Usuario;
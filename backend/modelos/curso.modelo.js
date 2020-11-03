const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    nombre: { type:String, required:true, unique:true, trim:true, minlength:4},
    clave: { type:String, required:true, trim:true, minlength:4},
    unidades: { type:Number, required:true, max:9},
}, {
    timestamps:true
});

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso;
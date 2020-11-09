const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grupoSchema = new Schema({

    nombre: { 
        type:String, 
        unique:true, 
        trim:true, 
        minlength:4,
        required: [true, 'El nombre del grupo es necesario'],
    },
    alumnos: { 
        type:String, 
        required:true, 
        trim:true, 
        minlength:4,
        
    },
}, {
    timestamps:true
});

const Grupo = mongoose.model('Grupo', grupoSchema);
module.exports = Grupo
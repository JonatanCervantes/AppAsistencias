const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursoSchema = new Schema({

    Psemestre:{ 
        type:String, 
        required:true, 
        unique:true, 
        trim:true, 
        minlength:6,
        required: [true, 'El periodo del semestre es necesario'],

},
    nombre:{ 
        type:String, 
        required:true, 
        unique:true, 
        trim:true, 
        minlength:4,
        required: [true, 'El nombre del curso es necesario'],
    },

    clave:{ 
        type:String, 
        required:true, 
        trim:true, 
        minlength:4,
        required: [true, 'La clave del curso es necesaria'],

    },

    unidades:{ 
        type:Number, 
        required:true, 
        max:9,
        required:[true, 'El Numero de unidades es necesario'],
    },
    
    grupo: {
       type: mongoose.Schema.ObjectId, ref:'grupo'
    },
},{
    timestamps:true
});

const Curso = mongoose.model('Curso', cursoSchema);
module.exports = Curso;
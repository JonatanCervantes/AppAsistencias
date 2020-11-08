const mongoose = require('mongoose');
const { schema } = require('./curso.modelo');
const Schema = mongoose.Schema;
const cursoSchema = mongoose.model("Curso");

const grupoSchema = new Schema({

    grupos: { 
        type:String, 
        required:true, 
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
    //Curso: {
      //  type: Schema.Types.ObjectId, ref: "Curso", required: true
    //},
}, {
    timestamps:true
});

const Grupo = mongoose.model('Grupo', cursoSchema);
module.exports = Grupo
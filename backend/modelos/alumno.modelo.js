const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const alumnoSchema = new Schema({
    nombre: {
        type: String,
        minlength: 4,
        required: [true, 'El nombre es necesario'],

    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"],
    },

    //De momento este atributo/columna no seria utilizada.
    //Se utilizaria si fueramos a continuar el proyecto 
    //(para ver las asistencias especificas de un alumno) pero de momento no es necesaria
    asistencias: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Asistencia'

    }],


}, {
    timestamps: true
});

const Alumno = mongoose.model('Alumno', alumnoSchema);
module.exports = Alumno;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asistenciaSchema = new Schema({
    fecha: {
        type: Date

    },
    idCurso: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Curso'
    },

    //En este atributo es donde se guardan las relaciones de los alumnos que 
    //asistieron a la clase, los que faltaron y los que llegaron tarde
    //se le pasa un arreglo bidimensional, en donde la primera columna 
    //representa el alumno y la segunda columna representa su presencia en la clase
    //(ASISTENCIA, AUSENCIA, TARDE). Y cada fila representa un alumno.
    registro: [],

}, {
    timestamps: true
});

const Asistencia = mongoose.model('Asistencia', asistenciaSchema);
module.exports = Asistencia;
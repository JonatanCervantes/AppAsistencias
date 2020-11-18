const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let estadosValidos = {
    values: ["PRESENTE", "AUSENTE", "RETARDO"],
    message: '{VALUE} no es un role válido'
}
const asistenciaSchema = new Schema({
    fecha: {
        type: Date

    },
    idCurso: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Curso'
    },

    //idAlumnos: [{
    //type: mongoose.Schema.Types.ObjectId, ref: 'Alumno'

    //  }],

    // registro: [{
    // type: String,
    // default: "AUSENTE",
    // enum: estadosValidos
    // }],

    loque: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Alumno'
    }][{
            type: String,
            default: "AUSENTE",
            enum: estadosValidos
        }],

}, {
    timestamps: true
});

const Asistencia = mongoose.model('Asistencia', asistenciaSchema);
module.exports = Asistencia;
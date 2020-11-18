const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asistenciaSchema = new Schema({
    fecha: {
        type: Date

    },
    idCurso: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Curso'
    },

    registro: [],

}, {
    timestamps: true
});

const Asistencia = mongoose.model('Asistencia', asistenciaSchema);
module.exports = Asistencia;
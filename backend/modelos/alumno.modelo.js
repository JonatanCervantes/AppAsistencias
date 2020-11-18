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

    asistencias: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Asistencia'

    }],


}, {
    timestamps: true
});

const Alumno = mongoose.model('Alumno', alumnoSchema);
module.exports = Alumno;
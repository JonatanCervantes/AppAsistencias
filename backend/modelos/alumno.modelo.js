const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const alumnoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],

    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"],
    },

}, {
    timestamps: true
});

const Alumno = mongoose.model('Alumno', alumnoSchema);
module.exports = Alumno;
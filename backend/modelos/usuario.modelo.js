const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ["ADMIN", "MAESTRO"],
    message: '{VALUE} no es un role válido'
}
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    id: {
        type: String,
        default: "",
    },
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
    nomInstitucion: {
        type: String,
        default: "",
    },

    nomDepartamento: {
        type: String,
        default: "",
    },

    numCubiculo: {
        type: Number,
        default: 0,
    },

    telefono: {
        type: String,
        default: "",
    },
    
    password: {
        type: String,
        minlength: 6,
        required: [true, "Le contraseña es obligatoria"],
    },
    role: {
        type: String,
        default: 'MAESTRO',
        enum: rolesValidos,
    },

    cursos: [{
        type: mongoose.Schema.Types.ObjectId, ref:'Curso'
    }],

    // QUIZA SEA NECESARIO AGREGAR UN ARREGLO PARA LOS ALUMNOS COMO EL SIGUIENTE:
    // alumnos:[{
    //     type:mongoose.Schema.Types.ObjectId, ref:'Alumno'
    // }],

}, {
    timestamps: true
});

// elimina la key password del objeto que retorna al momento de crear un usuario
usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})
module.exports = mongoose.model('Usuario', usuarioSchema)
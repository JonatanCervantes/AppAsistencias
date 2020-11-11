const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ["ADMIN", "MAESTRO"],
    message: '{VALUE} no es un role válido'
}
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({

    id: {
        type: Number,
        minlength: 11,
        unique: true,
        required: ['El id es necesario']
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
        required: ['Es necesario el nombre de la institución']
    },

    nomDepartamento: {
        type: String,
        requiered: ['Es necesario el nombre del departamento']
    },

    numCubiculo: {
        type: Number,
        unique: true,
        requiered: ['Es necesario el numero del cubiculo']
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, "Le contraseña es obligatoria"],
    },
    role: {
        type: String,
        default: 'MAESTRO',
        required: [true],
        enum: rolesValidos,
    },

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
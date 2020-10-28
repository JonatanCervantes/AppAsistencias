const router = require('express').Router();
let Usuario = require('../modelos/usuario.modelo');

router.route('/').get((req, res)=>{
    Usuario.find()
        .then(usuarios => res.json(usuarios))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res)=>{
    const nombre = req.body.nombre;
    const contrasenia = req.body.contrasenia;
    const nuevoUsuario = new Usuario({nombre, contrasenia});

    nuevoUsuario.save()
        .then(()=> res.json('Usuario aniadido exitosamente'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;


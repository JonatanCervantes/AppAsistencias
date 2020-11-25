const router = require('express').Router();
let Grupo = require('../modelos/grupo.modelo');

router.route('/').get((req, res)=>{
    Grupo.find()
        .then(cursos => res.json(cursos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res)=>{
    const nombre = req.body.nombre;
    const alumnos = req.body.alumnos;
    const nuevoGrupo = new Grupo({nombre, alumnos});

    nuevoGrupo.save()
        .then(()=> res.json('Grupo aniadido exitosamente'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
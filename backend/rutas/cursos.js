const router = require('express').Router();
let Curso = require('../modelos/curso.modelo');

router.route('/').get((req, res)=>{
    Curso.find()
        .then(cursos => res.json(cursos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res)=>{
    const nombre = req.body.nombre;
    const clave = req.body.clave;
    const unidades = req.body.unidades;
    const nuevoCurso = new Curso({nombre, clave, unidades});

    nuevoCurso.save()
        .then(()=> res.json('Curso aniadido exitosamente'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
const router = require('express').Router();
const { models } = require('mongoose');
const { func } = require('prop-types');
let Curso = require('../modelos/curso.modelo');

router.route('/').get((req, res)=>{
    Curso.find()
        .then(cursos => res.json(cursos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res)=>{
    const semestre = req.body.semestre;
    const nombre = req.body.nombre;
    const clave = req.body.clave;
    const unidades = req.body.unidades;
    const nuevoCurso = new Curso({semestre, nombre, clave, unidades});

    nuevoCurso.save()
        .then(()=> res.json('Curso aniadido exitosamente'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/relGrupo').post((req, res)=>{
    const curso = req.body.curso;
    const grupo = req.body.grupo;

    try {
        Curso.findById(curso).populate('grupos').exec((error, doc)=>{
            if(doc != undefined) {
                doc.grupo.push(grupo);
                console.log(doc);
                doc.save()
                    .then(()=> res.json('Grupo aniadido al curso exitosamente'))
                    .catch(error => res.status(400).json('Error: ' + error));
            }            
        });
    } catch (err) {
        console.log('Error'+err);
    }

});

module.exports = router;
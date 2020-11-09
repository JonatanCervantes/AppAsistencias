const router = require('express').Router();
let Usuario = require('../modelos/usuario.modelo');
const jwt = require ('jsonwebtoken');
const {obtenerId} = require('./verifyToken');
const { json } = require('body-parser');

router.route('/').get((req, res)=>{
    const idUsuario = obtenerId(req);

    Usuario.findById(idUsuario)
        .then(usuario => res.json(usuario))
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

router.route('/relCurso').post((req, res)=>{
    console.log(JSON.stringify(req.body));

    const usuario = req.body.usuario;
    const curso = req.body.curso.data;
    
    console.log('ID DEL CURSO QUE LLEGA' + curso)

    try {
        Usuario.findById(usuario).populate('cursos').exec((error, doc)=>{
            if(doc != undefined) {
                doc.cursos.push(curso);
                doc.save()
                    .then(()=> res.json('Curso aniadido al usuario exitosamente'))
                    .catch(error => res.status(400).json('Error: ' + error));
            }            
        });
    } catch (err) {
        console.log('Error'+err);
    }
});

module.exports = router;


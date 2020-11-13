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
    const nuevoUsuario = new Usuario({nombre,contrasenia});

    nuevoUsuario.save()
        .then(()=> res.json('Usuario aniadido exitosamente'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/relCurso').post((req, res)=>{
    //console.log(JSON.stringify(req.body));

    const usuario = req.body.usuario;
    const curso = req.body.curso.data;    

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

router.route('/modificar').put((req, res)=>{
    const usuario = req.body.data.usuario;
    const id = req.body.data.id;   
    const nombre = req.body.data.nombre;
    const nomInstitucion = req.body.data.nomInstitucion;
    const nomDepartamento = req.body.data.nomDepartamento;
    const numCubiculo = req.body.data.numCubiculo;
    const telefono = req.body.data.telefono;

    try {
        Usuario.findByIdAndUpdate(usuario, {id:id, nombre:nombre, nomInstitucion:nomInstitucion, nomDepartamento:nomDepartamento, numCubiculo:numCubiculo, telefono:telefono}, 
            {useFindAndModify:false, new:true}, (err, result)=>{
            if(err) {
                console.log(err);
                res.json(err);
            } else {
                res.json(result);
            }
        })
    } catch (err) {
        console.log('Error'+err);
    }
});

module.exports = router;


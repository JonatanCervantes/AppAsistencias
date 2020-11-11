const router = require('express').Router();
let Curso = require('../modelos/curso.modelo');
let Usuario = require('../modelos/usuario.modelo');
const jwt = require ('jsonwebtoken');
const {obtenerId} = require('./verifyToken');
const { DH_UNABLE_TO_CHECK_GENERATOR } = require('constants');

router.route('/').get((req, res)=>{
    Curso.find()
        .then(cursos => res.json(cursos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res)=>{
    // const curso = req.body.curso;
    // const idUsuario = req.body.usuario;
    // const semestre = curso.semestre;
    // const nombre = curso.nombre;
    // const clave = curso.clave;
    // const unidades = curso.unidades;   
    const semestre = req.body.semestre;
    const nombre = req.body.nombre;
    const clave = req.body.clave;
    const unidades = req.body.unidades;   
    
    const nuevoCurso = new Curso({semestre, nombre, clave, unidades});
    console.log(nuevoCurso);
    nuevoCurso.save()
        .then(doc => {
            console.log('id del curso'+doc._id);
            res.json(doc._id);
            
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/obtenerCursos').get((req, res)=>{
    console.log('Si entra');
    const usuario = req.headers.authorization;
    console.log(usuario);

    try {
        Usuario.findById(usuario).populate('cursos').then( usuario =>{
            console.log(usuario);
            console.log(usuario.cursos);
            res.json(usuario.cursos);
        });

        //     if(doc != undefined) {
        //         console.log(doc);
        //         console.log(doc.cursos);
        //         res.json(doc);
        //         // doc.cursos.push(curso);
        //         // doc.save()
        //         //     .then(()=> res.json('Curso aniadido al usuario exitosamente'))
        //         //     .catch(error => res.status(400).json('Error: ' + error));
        //     }            
        // });
    } catch (err) {
        console.log('Error'+err);
    }
});

// router.route('/relUsuario').post((req, res)=>{
//         const usuario = req.body.usuario;
//         const curso = req.body.curso;
    
//         try {
//             Usuario.findById(usuario).populate('cursos').exec((error, doc)=>{
//                 if(doc != undefined) {
//                     doc.cursos.push(curso);
//                     doc.save()
//                         .then(()=> res.json('Curso aniadido al usuario exitosamente'))
//                         .catch(error => res.status(400).json('Error: ' + error));
//                 }            
//             });
//         } catch (err) {
//             console.log('Error'+err);
//         }
    
//     });

// router.route('/relGrupo').post((req, res)=>{
//     const curso = req.body.curso;
//     const grupo = req.body.grupo;

//     try {
//         Curso.findById(curso).populate('grupos').exec((error, doc)=>{
//             if(doc != undefined) {
//                 doc.grupos.push(grupo);
//                 doc.save()
//                     .then(()=> res.json('Grupo aniadido al curso exitosamente'))
//                     .catch(error => res.status(400).json('Error: ' + error));
//             }            
//         });
//     } catch (err) {
//         console.log('Error'+err);
//     }

// });

module.exports = router;
const router = require('express').Router();
let Curso = require('../modelos/curso.modelo');
let Usuario = require('../modelos/usuario.modelo');

router.route('/').get((req, res) => {
    Curso.find()
        .then(cursos => res.json(cursos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/obtenerCursos').get((req, res) => {
    const usuario = req.headers.authorization;

    try {
        Usuario.findById(usuario).populate('cursos')
            .then(usuario => {
                res.json(usuario.cursos);
            })
            .catch(error => {
                res.status(400).json('Error' + error);
                console.log(error);
            });
    } catch (err) {
        console.log('Error' + err);
    }
});

router.route('/agregaAlumnos').put((req, res) => {
    const curso = req.body.curso;
    const registroAlumnos = req.body.alumnos;
    alumnosArray = JSON.parse(registroAlumnos);

    try {
        Curso.findById(curso).then(doc => {
            alumnosArray.forEach(alumno => {
                doc.alumnos.push(alumno);
            });
            doc.save().then(cursoModificado => res.json(cursoModificado)
            ).catch(error => {
                res.status(400).json('Error' + error);
                console.log(error);
            })
        })
            .catch(error => {
                res.status(400).json('Error' + error);
                console.log(error);
            });
    } catch (err) {
        console.log('Error' + err);
    }
});

router.route('/add').post((req, res) => {
    const semestre = req.body.semestre;
    const nombre = req.body.nombre;
    const clave = req.body.clave;
    const unidades = req.body.unidades;

    const nuevoCurso = new Curso({ semestre, nombre, clave, unidades });
    nuevoCurso.save()
        .then(doc => {
            res.json(doc._id);

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/eliminar').delete((req, res) => {
    const usuario = req.body.usuario;
    const curso = req.body.curso;
    try {
        Usuario.findById(usuario).populate('cursos').exec((error, user) => {
            if (user != undefined) {
                for (var i = 0; i < user.cursos.length; i++) {
                    if (user.cursos[i]._id == curso) {
                        user.cursos.splice(i, 1);
                        user.save();
                    }
                }
                Curso.findByIdAndDelete(curso)
                    .then(() => res.json('Curso eliminado correctamente'))
                    .catch(() => res.json('No se pudo eliminar el curso'));
            }
        });
    } catch (err) {
        console.log('Error' + err);
    }
});

router.route('/modificar').put((req, res) => {
    const curso = req.body.data.curso;
    const semestre = req.body.data.semestre;
    const nombre = req.body.data.nombre;
    const clave = req.body.data.clave;
    const unidades = req.body.data.unidades;
    try {
        Curso.findByIdAndUpdate(curso, {
            semestre: semestre, nombre: nombre,
            clave: clave, unidades: unidades
        }, { useFindAndModify: false, new: true }, (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    } catch (err) {
        console.log('Error' + err);
    }
});

module.exports = router;